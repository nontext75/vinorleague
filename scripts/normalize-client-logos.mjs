import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Keep the artwork intact. Restore the SVG aspect ratio and size by visible ink.
const root = path.join(process.cwd(), 'public/clients');
const output = path.join(root, 'normalized');
await fs.mkdir(output, { recursive: true });
const metrics = {};
for (const name of (await fs.readdir(root)).filter(name => name.endsWith('.svg'))) {
  let svg = await fs.readFile(path.join(root, name), 'utf8');
  const [, values] = svg.match(/viewBox="([^"]+)"/);
  const [vx, vy, vw, vh] = values.split(/\s+/).map(Number);
  svg = svg.replace(/preserveAspectRatio="[^"]*"/, 'preserveAspectRatio="xMidYMid meet"')
    .replace('width="100%"', `width="${vw}"`).replace('height="100%"', `height="${vh}"`);
  const { data, info } = await sharp(Buffer.from(svg)).resize({ width: 1200 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let left=info.width, right=0, top=info.height, bottom=0;
  for (let y=0; y<info.height; y++) for (let x=0; x<info.width; x++) {
    const i=(y*info.width+x)*4;
    if(data[i+3]>80 && Math.min(data[i],data[i+1],data[i+2])<235) { left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y); }
  }
  const padding=1;
  left=Math.max(0,left-padding);top=Math.max(0,top-padding);right=Math.min(info.width-1,right+padding);bottom=Math.min(info.height-1,bottom+padding);
  const inkWidth=(right-left+1)/info.width*vw, inkHeight=(bottom-top+1)/info.height*vh;
  const box=[vx+left/info.width*vw,vy+top/info.height*vh,inkWidth,inkHeight].map(n=>+n.toFixed(3));
  svg=svg.replace(/viewBox="[^"]+"/,`viewBox="${box.join(' ')}"`).replace(`width="${vw}"`,`width="${box[2]}"`).replace(`height="${vh}"`,`height="${box[3]}"`);
  const ratio=inkWidth/inkHeight;
  const width=Math.min(142,Math.sqrt(3200*ratio));
  const height=Math.min(38,width/ratio);
  metrics[name.slice(0,-4)]={width:+(height*ratio).toFixed(2),height:+height.toFixed(2)};
  await fs.writeFile(path.join(output,name),svg);
}
await fs.writeFile('src/lib/client-logo-metrics.json',JSON.stringify(metrics,null,2)+'\n');
console.log(`Normalized ${Object.keys(metrics).length} logo assets without stretching.`);
