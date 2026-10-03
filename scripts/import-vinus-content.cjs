// Usage: node scripts/import-vinus-content.cjs <path-to-playwright> [--from-snapshot]
// Public Work/Story only. Downloads and administrator routes are excluded.
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('sharp');
const { chromium } = require(process.argv[2] || 'playwright');
const origin = 'https://vinus.co.kr/';
const snapshot = 'output/vinus-source';
const destination = 'public/images/vinus';
const preservedSlugs = {193:'mongdang',119:'shinhan-easy',125:'crowdsourcing-platform-crowd-oh',124:'macadamia-website',114:'budongsan114-mediate-bizsolution',197:'donga-on-book',108:'aliot-brand-identity',117:'the-frame-artstore-catalogue'};
const storySlugs = {164:'brain-cell-database',163:'project-estimate-buffer',132:'working-with-the-right-client',105:'woongjin-character-design'};
const clean = value => value.replace(/\s+/g, ' ').trim();

async function main() {
 await fs.mkdir(snapshot, {recursive:true});
 await fs.mkdir(destination, {recursive:true});
 await fs.mkdir('src/data', {recursive:true});
 const browser = await chromium.launch({channel:'chrome',headless:true});
 try {
 const page = await browser.newPage();
 let entries;
 if(process.argv.includes('--from-snapshot')) entries=JSON.parse(await fs.readFile(`${snapshot}/entries.json`,'utf8'));
 else {
  await page.goto(`${origin}bbs.php?mc=work&md=list_tile`,{waitUntil:'networkidle'});
  const total=Number(await page.locator('nav.tab li').first().locator('span').textContent());
  if(!Number.isInteger(total)||total<1)throw new Error('Invalid source project count');
  while(await page.locator('#bbs_list li').count()<total){
   const count=await page.locator('#bbs_list li').count();
   await page.locator('.btn_more').click();
   await page.waitForFunction(n=>document.querySelectorAll('#bbs_list li').length>n,count);
  }
  entries=await page.locator('#bbs_list li').evaluateAll(items=>items.map(el=>({kind:'work',id:new URL(el.querySelector('a').href).searchParams.get('bbs_seq'),title:el.querySelector('.project__title').textContent.trim(),subtitle:el.querySelector('.project__desc').textContent.trim(),category:el.querySelector('.project__cate').childNodes[0].textContent.trim(),year:el.querySelector('.project__date').textContent.trim(),thumbnail:el.querySelector('img').src})));
  await page.goto(`${origin}bbs.php?mc=story&md=list`,{waitUntil:'networkidle'});
  const storyIds=await page.locator('a[href*="bbs_seq="]').evaluateAll(links=>[...new Set(links.map(a=>new URL(a.href).searchParams.get('bbs_seq')))]);
  entries.push(...storyIds.map(id=>({kind:'story',id})));
  for(const item of entries){
   item.sourceUrl=`${origin}bbs.php?mc=${item.kind}&md=view&bbs_seq=${item.id}&list_type=${item.kind==='work'?'list_tile':'list'}`;
   await page.goto(item.sourceUrl,{waitUntil:'domcontentloaded'});
   await fs.writeFile(`${snapshot}/${item.kind}-${item.id}.html`,await page.content());
   Object.assign(item,await page.evaluate(kind=>{const root=document.querySelector(kind==='work'?'.project__content':'.bbs__view__content');return {title:document.querySelector(kind==='work'?'.project__title':'.bbs__view__title').textContent.trim(),info:document.querySelector('.bbs__view__info')?.textContent.trim(),html:root.innerHTML,galleryHtml:document.querySelector('.project__gallery')?.innerHTML||'',text:root.innerText,media:[...root.querySelectorAll('img')].map(img=>({src:img.src,tag:'IMG'}))};},item.kind));
  }
  await fs.writeFile(`${snapshot}/entries.json`,JSON.stringify(entries,null,2));
 }
 // Parse in an inert document: no source scripts, attributes, or styles enter the app.
 for(const item of entries){
  const html=await fs.readFile(`${snapshot}/${item.kind}-${item.id}.html`,'utf8');
  Object.assign(item,await page.evaluate(({html,kind})=>{
   const doc=new DOMParser().parseFromString(html,'text/html');
   const root=doc.querySelector(kind==='work'?'.project__content':'.bbs__view__content');
   const blocks=[];
   const plain=node=>{if(node.nodeType===3)return node.textContent.replace(/\s+/g,' ');if(node.nodeName==='BR')return '\n';return [...node.childNodes].map(plain).join('');};
   const emit=(type,text)=>{for(const value of text.split(/\n\s*\n/)){const normalized=value.split('\n').map(x=>x.trim()).join('\n').trim();if(normalized)blocks.push({type,text:normalized});}};
   function walk(node){
    if(node.nodeType===3){emit('paragraph',node.textContent.replace(/\s+/g,' '));return;}
    if(node.nodeType!==1||['BR','SCRIPT','STYLE'].includes(node.tagName))return;
    if(node.tagName==='IMG'){blocks.push({type:'image',source:new URL(node.getAttribute('src'),'https://vinus.co.kr/').href,alt:node.getAttribute('alt')||''});return;}
    if(node.matches('.template__type3,.template__type4,.template__type5,.template__type8')&&!node.textContent.trim()){
     const start=blocks.length;[...node.childNodes].forEach(walk);const children=blocks.splice(start);if(children.length)blocks.push({type:'gallery',columns:node.matches('.template__type8')?3:2,children});return;
    }
    if(!node.querySelector('img,div,p,h1,h2,h3,h4,h5,h6,section,ul,ol')){
     emit(/^H[1-6]$/.test(node.tagName)||node.className?.includes('__title')?'heading':'paragraph',plain(node));return;
    }
    if(node.classList.contains('template__txt5')&&!node.querySelector('h2')&&node.children.length===1){emit('heading',plain(node));return;}
    [...node.childNodes].forEach(walk);
   }
   const gallery=doc.querySelector('.project__gallery');if(gallery)[...gallery.childNodes].forEach(walk);
   [...root.childNodes].forEach(walk);
   return {blocks,tags:[...doc.querySelectorAll('.hash li')].map(x=>x.textContent.replace(/^\s*#\s*/,'').trim())};
  },{html,kind:item.kind}));
  item.title=clean(item.title);
  item.slug=item.kind==='story'?storySlugs[item.id]||`story-${item.id}`:preservedSlugs[item.id]||`${item.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}-${item.id}`;
  // Match every source character and image, ignoring only layout whitespace.
  const flatten=blocks=>blocks.flatMap(b=>b.children?flatten(b.children):[b]);
  const text=flatten(item.blocks).map(b=>b.text||'').join('').replace(/\s/g,'');
  if(text!==item.text.replace(/\s/g,''))throw new Error(`Text mismatch: ${item.kind} ${item.id}`);
  const count=flatten(item.blocks).filter(b=>b.type==='image').length;
  if(count!==item.media.length)throw new Error(`Media mismatch: ${item.id}`);
 }
 // Story list thumbnails are separate from the original text-only articles.
 await page.goto(`${origin}bbs.php?mc=story&md=list`,{waitUntil:'networkidle'});
 const storyImages=await page.locator('a[href*="bbs_seq="]').evaluateAll(links=>Object.fromEntries(links.filter(a=>a.querySelector('img')).map(a=>[new URL(a.href).searchParams.get('bbs_seq'),a.querySelector('img').src])));
 for(const item of entries.filter(x=>x.kind==='story'))item.thumbnail=storyImages[item.id];
 const sources=new Set();
 const visit=(blocks,fn)=>{for(const b of blocks){if(b.children)visit(b.children,fn);else fn(b);}};
 for(const item of entries){if(!item.thumbnail)throw new Error(`Missing thumbnail ${item.id}`);sources.add(item.thumbnail);visit(item.blocks,b=>{if(b.source)sources.add(b.source);});}
 let assets={};
 try{assets=JSON.parse(await fs.readFile(`${snapshot}/assets.json`,'utf8'));}catch{}
 const queue=[...sources];let completed=0;
 await Promise.all(Array.from({length:4},async()=>{
  while(queue.length){
   const source=queue.shift();
   if(assets[source]&&await fs.stat(`public${assets[source].src}`).then(()=>true,()=>false)){completed++;continue;}
   const response=await fetch(source,{signal:AbortSignal.timeout(60000)});
   if(!response.ok)throw new Error(`Asset ${response.status}: ${source}`);
   const input=Buffer.from(await response.arrayBuffer());
   const meta=await sharp(input,{animated:true,limitInputPixels:false}).metadata();
   const hash=crypto.createHash('sha256').update(source).digest('hex').slice(0,16);
   const animated=(meta.pages||1)>1;
   const extension=animated?path.extname(new URL(source).pathname).slice(1):'webp';
   const filename=`${hash}.${extension}`;
   if(animated)await fs.writeFile(`${destination}/${filename}`,input);
   else await sharp(input,{limitInputPixels:false}).rotate().resize({width:1800,withoutEnlargement:true}).webp({quality:90}).toFile(`${destination}/${filename}`);
   const result=await sharp(`${destination}/${filename}`).metadata();
   assets[source]={src:`/images/vinus/${filename}`,width:result.width,height:result.height,animated,bytes:(await fs.stat(`${destination}/${filename}`)).size};
   completed++;if(completed%25===0)console.log(`Saved ${completed}/${sources.size} images`);
  }
 }));
 await fs.writeFile(`${snapshot}/assets.json`,JSON.stringify(assets,null,2));
 const catalog={projects:[],stories:[]},details={};
 for(const item of entries){
  visit(item.blocks,b=>{if(b.source){Object.assign(b,assets[b.source]);b.alt=b.alt&&!/\.(png|jpg|jpeg|webp|gif)$/i.test(b.alt)?b.alt:`${item.title} 디자인`;delete b.source;}});
  const base={slug:item.slug,title:item.title,sourceId:item.id,sourceUrl:item.sourceUrl,image:assets[item.thumbnail],category:item.kind==='story'?'Story':item.category.charAt(0).toUpperCase()+item.category.slice(1)};
  if(item.kind==='work')catalog.projects.push({...base,subtitle:item.subtitle,year:item.year});
  else catalog.stories.push({...base,date:item.info.match(/\d{4}\.\d{2}\.\d{2}/)[0],summary:clean(item.blocks.find(b=>b.type==='paragraph')?.text||'').slice(0,150)});
  details[item.slug]={blocks:item.blocks,tags:item.tags};
 }
 await fs.writeFile('src/data/vinus-catalog.json',JSON.stringify(catalog,null,2)+'\n');
 await fs.writeFile('src/data/vinus-details.json',JSON.stringify(details,null,2)+'\n');
 await fs.writeFile('docs/vinus-migration.json',JSON.stringify({source:origin,importedAt:new Date().toISOString(),counts:{projects:catalog.projects.length,stories:catalog.stories.length,images:sources.size},entries:entries.map(x=>({id:x.id,kind:x.kind,slug:x.slug,sourceUrl:x.sourceUrl,mediaCount:x.media.length})),assets:Object.fromEntries([...sources].map(src=>[src,assets[src]]))},null,2)+'\n');
 console.log(`Imported ${catalog.projects.length} projects, ${catalog.stories.length} stories, ${sources.size} images.`);
 }finally{await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
