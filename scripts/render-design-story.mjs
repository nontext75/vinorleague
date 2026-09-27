import fs from 'node:fs/promises';
import path from 'node:path';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const output=path.resolve('output/design-story-frames');
await fs.mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chrome'});
try {
 const page=await browser.newPage({viewport:{width:1600,height:1000}});
 await page.goto('http://127.0.0.1:4179');
 await page.evaluate(()=>window.ready);
 for(let frame=0;frame<432;frame++){
  const png=await page.evaluate(f=>{window.renderFrame(f);return document.querySelector('canvas').toDataURL('image/png').split(',')[1]},frame);
  await fs.writeFile(path.join(output,`${String(frame).padStart(4,'0')}.png`),Buffer.from(png,'base64'));
  if(frame%72===0) console.log(`Rendered ${frame}/432 frames`);
 }
 console.log('Rendered 432 frames, 18 seconds at 24 fps');
} finally {await browser.close()}
