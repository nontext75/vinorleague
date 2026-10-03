// Usage: node scripts/verify-vinus-content.cjs [path-to-playwright]
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const sharp=require('sharp');
const catalog=require('../src/data/vinus-catalog.json');
const details=require('../src/data/vinus-details.json');
const manifest=require('../docs/vinus-migration.json');
const flatten=blocks=>blocks.flatMap(b=>b.children?flatten(b.children):[b]);
async function main(){
 assert.equal(catalog.projects.length,manifest.counts.projects);
 assert.equal(catalog.stories.length,manifest.counts.stories);
 const all=[...catalog.projects,...catalog.stories];
 assert.equal(new Set(all.map(x=>x.slug)).size,all.length);
 for(const item of all){
  const source=manifest.entries.find(x=>x.id===item.sourceId&&x.slug===item.slug);
  assert.ok(source,`Missing source ${item.slug}`);
  const blocks=flatten(details[item.slug].blocks);
  assert.equal(blocks.filter(b=>b.type==='image').length,source.mediaCount,item.slug);
 }
 for(const asset of Object.values(manifest.assets)){
  const meta=await sharp(`public${asset.src}`).metadata();
  assert.equal(meta.width,asset.width);assert.equal(meta.height,asset.height);
 }
 console.log(`Data: ${all.length} entries and ${manifest.counts.images} local images verified.`);
 const origin=process.env.TEST_ORIGIN||'http://127.0.0.1:3000';
 for(const [kind,items] of [['work',catalog.projects],['news',catalog.stories]]){
  for(const item of items){const response=await fetch(`${origin}/${kind}/${item.slug}`);assert.equal(response.status,200,item.slug);const html=await response.text();assert.ok(html.includes(kind==='work'?'project-body':'article-body'),item.slug);}
 }
 if(!process.argv[2])return;
 const {chromium}=require(process.argv[2]);
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const page=await browser.newPage({reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await fs.mkdir('output/playwright/vinus',{recursive:true});
  for(const width of [1585,390,320]){
   await page.setViewportSize({width,height:1000});
   for(const route of ['/','/work','/news','/work/travel-service-character-yomo-199','/work/mongdang','/work/donga-on-book','/work/samsung-display-ohb-pdp-169',...catalog.stories.map(x=>`/news/${x.slug}`)]){
    await page.goto(origin+route,{waitUntil:'networkidle'});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Overflow ${width} ${route}`);
    // Load all lazy images on the smaller stories/list; sample every detail image by decoding explicitly.
    const images=page.locator('main img');
    if(route.includes('/work/'))await images.evaluateAll(imgs=>Promise.all(imgs.map(img=>{img.loading='eager';return img.decode();})));
    const broken=await images.evaluateAll(imgs=>imgs.filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src));
    assert.deepEqual(broken,[],`${width} ${route}`);
    if(route==='/work'){
     assert.equal(await page.locator('ol[aria-label="프로젝트 목록"] > li').count(),catalog.projects.length);
     for(const category of [...new Set(catalog.projects.map(x=>x.category))]){
      await page.getByRole('button',{name:new RegExp(category)}).click();
      assert.equal(await page.locator('ol[aria-label="프로젝트 목록"] > li').count(),catalog.projects.filter(x=>x.category===category).length);
     }
     await page.getByRole('button',{name:/All/}).click();
    }
    if(route.startsWith('/news/')){
     const slug=route.split('/').pop();
     const actual=(await page.locator('.article-body').innerText()).replace(/\s/g,'');
     const expected=flatten(details[slug].blocks).map(b=>b.text||'').join('').replace(/\s/g,'');
     assert.equal(actual,expected,`Body ${slug}`);
    }
    if(width!==320&&['/work','/news','/work/travel-service-character-yomo-199','/news/brain-cell-database'].includes(route))await page.screenshot({path:`output/playwright/vinus/${route.replaceAll('/','-')||'home'}-${width}.png`});
   }
   console.log(`Browser: ${width}px routes, filters, text, images passed.`);
  }
  await page.goto(origin+'/news/brain-cell-database');
  await page.getByRole('link',{name:'목록으로 돌아가기'}).click();await page.waitForURL('**/news');
  const missing=await page.goto(origin+'/work/missing-project');assert.equal(missing.status(),404);
  assert.deepEqual(errors,[]);
 }finally{await browser.close();}
 console.log('Migration verification passed.');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
