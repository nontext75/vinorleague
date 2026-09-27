import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const origin = 'https://vinus.co.kr';
const html = await (await fetch(`${origin}/index.php`)).text();
const patterns = { mongdang: /Woongjin AI Edu/i, macadamia: /Daekyo macadamia/i, crowd: /Crowdsourcing Platform/i, donga: /DongA Books/i, shinhan: /Shinhan Easy/i, frame: /The Frame Artstore/i };
const items = [...html.matchAll(/<li\b[\s\S]*?<\/li>/g)].map(([value]) => ({
  title: value.match(/portfolio__info__title[^>]*>([\s\S]*?)<\/strong>/)?.[1]?.trim(),
  id: value.match(/bbs_seq=(\d+)/)?.[1],
}));
await mkdir('public/images/details', { recursive: true });
const reports = await Promise.all(Object.entries(patterns).map(async ([key, pattern]) => {
  const item = items.find(item => pattern.test(item.title || ''));
  if (!item?.id) return { key, error: 'No matching source' };
  const source = `${origin}/bbs.php?mc=work&md=view&bbs_seq=${item.id}`;
  const detail = await (await fetch(source)).text();
  const imageUrls = [...new Set([...detail.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(m => m[1]).filter(src => src.includes('upload/')))];
  const images = [];
  for (const [index, src] of imageUrls.slice(0, 5).entries()) {
    const url = new URL(src, origin).href;
    const response = await fetch(url);
    if (!response.ok) continue;
    const buffer = Buffer.from(await response.arrayBuffer());
    const meta = await sharp(buffer).metadata();
    if (meta.width < 700) continue;
    const file = `/images/details/${key}-${index}.webp`;
    await sharp(buffer).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 88 }).toFile(`public${file}`);
    images.push({ url, file, width: meta.width, height: meta.height });
  }
  return { key, source, title: item.title, images };
}));
await writeFile('docs/project-image-sources.json', JSON.stringify(reports, null, 2));
console.log(JSON.stringify(reports, null, 2));
