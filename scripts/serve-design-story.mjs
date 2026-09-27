import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd();
http.createServer(async(req,res)=>{try{
 const pathname=new URL(req.url,'http://localhost').pathname;
 let file;
 if(pathname==='/')file=path.join(root,'scripts/design-story-film.html');
 else if(pathname==='/font.woff2')file=path.join(root,'node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2');
 else{file=path.resolve(root,'public',`.${pathname}`);if(!file.startsWith(path.join(root,'public')+path.sep)){res.writeHead(403);res.end();return}}
 const data=await fs.readFile(file);res.setHeader('Content-Type',file.endsWith('.html')?'text/html':file.endsWith('.woff2')?'font/woff2':'image/webp');res.end(data);
}catch{res.writeHead(404);res.end()}}).listen(4179,'127.0.0.1',()=>console.log('Design story renderer: http://127.0.0.1:4179'));
