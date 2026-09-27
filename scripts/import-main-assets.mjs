import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
const base = 'https://vinuspread.vercel.app';
const html = await (await fetch(base)).text();
const paths = [...new Set([...html.matchAll(/src="(\/vinus\/clients\/[^"?]+\.svg)"/g)].map(m => m[1]))];
await mkdir('public/clients', { recursive: true });
await Promise.all(paths.map(async src => {
  const response = await fetch(base + src);
  if (!response.ok) throw new Error(`${src}: ${response.status}`);
  await writeFile(`public/clients/${src.split('/').pop()}`, Buffer.from(await response.arrayBuffer()));
}));
const response = await fetch(`${base}/vinus/dummy-photo/hero-figma.jpg`);
if (!response.ok) throw new Error(`Hero: ${response.status}`);
await sharp(Buffer.from(await response.arrayBuffer())).resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 88 }).toFile('public/images/home-intro.webp');
console.log(JSON.stringify({ logos: paths.length, videoSources: [...html.matchAll(/<(?:video|source|iframe)[^>]*>/g)].map(m => m[0]).slice(0, 8), hero: '/images/home-intro.webp' }, null, 2));
