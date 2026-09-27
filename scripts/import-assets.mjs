import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const base = 'https://vinuspread.vercel.app';
const assets = [
  ['mongdang', '/vinus/home/figma-mongdang.png'],
  ['crowd', '/vinus/home/figma-crowd.png'],
  ['macadamia', '/vinus/home/figma-macadamia.png'],
  ['budongsan', '/vinus/home/figma-budongsan.png'],
  ['donga', '/vinus/home/figma-donga.png'],
  ['shinhan', '/vinus/dummy-photo/work-02.jpg'],
  ['aliot', '/vinus/dummy-photo/work-07.jpg'],
  ['frame', '/vinus/dummy-photo/work-08.jpg'],
  ['studio', '/vinus/dummy-photo/studio-wide.jpg'],
  ['story-colors', '/vinus/stories/home-story-01.png'],
  ['story-principles', '/vinus/stories/home-story-02.png'],
  ['story-writing', '/vinus/stories/home-story-03.jpg'],
];
// The newer draft uses unrelated stock photos for these projects. Match the
// same project names to the real portfolio images on the original site.
const originalBase = 'https://vinus.co.kr';
const originalHtml = await (await fetch(`${originalBase}/index.php`)).text();
const originalItems = [...originalHtml.matchAll(/<li\b[\s\S]*?<\/li>/g)].map(match => ({
  title: match[0].match(/portfolio__info__title[^>]*>([\s\S]*?)<\/strong>/)?.[1]?.trim(),
  src: match[0].match(/<img[^>]+src="([^"]+)"/)?.[1],
}));
const matches = {
  mongdang: /Woongjin AI Edu/i,
  crowd: /Crowdsourcing Platform/i,
  macadamia: /Daekyo macadamia/i,
  budongsan: /Budongsan114/i,
  donga: /DongA Books/i,
  shinhan: /Shinhan Easy/i,
  aliot: /^Aliot$/i,
  frame: /The Frame Artstore/i,
};
for (const asset of assets) {
  const pattern = matches[asset[0]];
  if (!pattern) continue;
  const item = originalItems.find(item => pattern.test(item.title || ''));
  if (!item?.src) throw new Error(`Original project image not found: ${asset[0]}`);
  asset[1] = new URL(item.src, originalBase).href;
}
await mkdir('public/images', { recursive: true });
await mkdir('public/clients', { recursive: true });
const sharp = (await import('sharp')).default;
const reports = await Promise.all(assets.map(async ([name, url]) => {
  const source = url.startsWith('https:') ? url : base + url;
  const response = await fetch(source);
  if (!response.ok) throw new Error(`${url}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const destination = `public/images/${name}.webp`;
  const metadata = await sharp(buffer).metadata();
  await sharp(buffer).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 88 }).toFile(destination);
  return { name, source, file: destination, width: metadata.width, height: metadata.height };
}));
for (const name of ['samsung', 'daekyo', 'shinhan-financial-group', 'kt-alpha', 'lotte', 'think-big']) {
  const response = await fetch(`${base}/vinus/clients/${name}.svg`);
  if (!response.ok) throw new Error(`Logo ${name}: ${response.status}`);
  await writeFile(path.join('public/clients', `${name}.svg`), Buffer.from(await response.arrayBuffer()));
}
await mkdir('docs', { recursive: true });
await writeFile('docs/asset-sources.json', JSON.stringify(reports, null, 2));
console.log(JSON.stringify(reports, null, 2));
