import { createReadStream, existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnvConfig } from '@next/env';
import { createClient } from 'next-sanity';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
loadEnvConfig(root);
const readJson = relativePath => JSON.parse(readFileSync(path.join(root, relativePath), 'utf8'));
const projects = readJson('src/data/vinus-work-projects.json');
const workDetails = readJson('src/data/vinus-work-details.json');
const legacyDetails = readJson('src/data/vinus-details.json');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('NEXT_PUBLIC_SANITY_PROJECT_ID와 SANITY_API_TOKEN을 .env.local에 입력한 뒤 다시 실행해 주세요.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2025-01-01', token, useCdn: false });
const slugs = projects.map(project => project.slug);
const ids = slugs.map(slug => `project-${slug}`);
const existing = await client.fetch(
  '*[_type == "portfolioProject" && (_id in $ids || slug.current in $slugs)]{_id, title}',
  { ids, slugs },
);
if (existing.length) {
  console.error('같은 프로젝트가 이미 있어 가져오기를 중단했습니다. 기존 관리자 내용을 덮어쓰지 않았습니다.');
  process.exit(1);
}

const publicRoot = path.resolve(root, 'public');
const uploadedAssets = new Map();

function collectImages(blocks = [], images = []) {
  for (const block of blocks) {
    if (block.type === 'image') images.push(block);
    if (block.type === 'gallery') collectImages(block.children, images);
  }
  return images;
}

async function uploadImage(source, alt) {
  if (!source) throw new Error(`이미지 경로가 비어 있습니다: ${alt}`);
  if (!uploadedAssets.has(source)) {
    const localPath = path.resolve(publicRoot, source.replace(/^[/\\]+/, ''));
    if (!localPath.startsWith(`${publicRoot}${path.sep}`) || !existsSync(localPath)) {
      throw new Error(`공개 폴더에서 이미지를 찾을 수 없습니다: ${source}`);
    }
    uploadedAssets.set(source, client.assets.upload('image', createReadStream(localPath), { filename: path.basename(localPath) }));
  }
  const asset = await uploadedAssets.get(source);
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt };
}

const documents = [];
for (const [index, project] of projects.entries()) {
  const detail = workDetails[project.slug] ?? {};
  const media = detail.media ?? collectImages(legacyDetails[project.slug]?.blocks).slice(0, 4);
  const [cardImage, heroImage, ...images] = await Promise.all([
    uploadImage(project.image.src, project.subtitle || project.title),
    uploadImage(project.hero.src, project.hero.alt),
    ...media.map(item => uploadImage(item.src, item.alt || project.title)),
  ]);

  documents.push({
    _id: `project-${project.slug}`,
    _type: 'portfolioProject',
    title: project.title,
    slug: { _type: 'slug', current: project.slug },
    subtitle: project.subtitle,
    category: project.category,
    year: project.year,
    client: project.client,
    period: project.period,
    overview: project.overview,
    cardImage,
    heroImage,
    heroPosition: project.hero.position,
    sections: (detail.sections ?? []).map((section, sectionIndex) => ({
      _type: 'projectSection',
      _key: `section-${sectionIndex + 1}`,
      heading: section.heading,
      paragraphs: section.paragraphs,
    })),
    media: media.map((item, mediaIndex) => ({
      _type: 'projectMedia',
      _key: `media-${mediaIndex + 1}`,
      image: images[mediaIndex],
      alt: item.alt || project.title,
    })),
    sortOrder: index * 10,
    visible: true,
  });
}

const transaction = client.transaction();
for (const document of documents) transaction.createOrReplace(document);
await transaction.commit();
console.log(`${documents.length}개 프로젝트와 이미지 ${uploadedAssets.size}개를 ${dataset} 데이터셋으로 가져왔습니다.`);
