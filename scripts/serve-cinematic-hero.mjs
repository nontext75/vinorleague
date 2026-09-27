import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd();
http.createServer(async(req,res)=>{
 try{
  const pathname=new URL(req.url,'http://localhost').pathname;
  const base=path.join(root,'output/video-tools/node_modules/three');
  const file=pathname==='/' ? path.join(root,'scripts/cinematic-hero.html') : path.resolve(base,`.${pathname.replace(/^\/three/,'')}`);
  if(pathname!=='/' && !file.startsWith(base+path.sep)){res.writeHead(403);res.end();return;}
  const data=await fs.readFile(file);res.setHeader('Content-Type',file.endsWith('.js')?'application/javascript':'text/html');res.end(data);
 }catch{res.writeHead(404);res.end();}
}).listen(4178,'127.0.0.1',()=>console.log('Video render studio: http://127.0.0.1:4178'));
