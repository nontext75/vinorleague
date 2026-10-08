import { defineQuery } from 'next-sanity';
import { projects as localProjects, type Project } from '@/lib/content';
import { contentDetails, workDetails, type ContentBlock, type WorkDetail } from '@/lib/content-details';
import { isSanityConfigured, sanityClient } from '@/sanity/lib/client';

const WORK_PROJECTS_QUERY = defineQuery(`
  *[_type == "portfolioProject" && defined(slug.current)] | order(sortOrder asc, _updatedAt desc) {
    "slug": slug.current,
    title,
    subtitle,
    category,
    year,
    client,
    period,
    overview,
    seoTitle,
    seoDescription,
    sortOrder,
    visible,
    "image": {
      "src": cardImage.asset->url,
      "width": coalesce(cardImage.asset->metadata.dimensions.width, 640),
      "height": coalesce(cardImage.asset->metadata.dimensions.height, 480),
      "animated": false,
      "alt": coalesce(cardImage.alt, subtitle, title)
    },
    "hero": {
      "src": heroImage.asset->url,
      "alt": heroImage.alt,
      "position": coalesce(heroPosition, "center"),
      "width": coalesce(heroImage.asset->metadata.dimensions.width, 1600),
      "height": coalesce(heroImage.asset->metadata.dimensions.height, 1000)
    }
  }
`);

const WORK_DETAIL_QUERY = defineQuery(`
  *[_type == "portfolioProject" && slug.current == $slug][0] {
    "slug": slug.current,
    overview,
    sections[]{ heading, paragraphs },
    "media": media[]{
      "src": image.asset->url,
      "width": coalesce(image.asset->metadata.dimensions.width, 1440),
      "height": coalesce(image.asset->metadata.dimensions.height, 900),
      "alt": coalesce(alt, image.alt),
      "animated": false
    }
  }
`);

type WorkDocument = Partial<Project> & { slug?: string; visible?: boolean };
type DetailDocument = { sections?: WorkDetail['sections']; media?: Omit<Extract<ContentBlock, { type: 'image' }>, 'type'>[]; overview?: string };

export async function getWorkProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return localProjects;

  try {
    const documents = await sanityClient.fetch<WorkDocument[]>(WORK_PROJECTS_QUERY);
    const bySlug = new Map(localProjects.map((project, index) => [project.slug, { project, order: index * 10 }]));

    for (const document of documents) {
      if (!document.slug) continue;
      if (document.visible === false) {
        bySlug.delete(document.slug);
        continue;
      }

      const fallback = bySlug.get(document.slug);
      const image = document.image?.src ? document.image : fallback?.project.image;
      const hero = document.hero?.src ? document.hero : fallback?.project.hero;
      if (!image || !hero || !document.title) continue;

      const project: Project = {
        slug: document.slug,
        title: document.title,
        subtitle: document.subtitle || fallback?.project.subtitle || '',
        category: document.category || fallback?.project.category || 'Web',
        year: document.year || fallback?.project.year || '',
        client: document.client || fallback?.project.client || '',
        period: document.period || '',
        overview: document.overview || fallback?.project.overview || '',
        seoTitle: document.seoTitle || undefined,
        seoDescription: document.seoDescription || undefined,
        sortOrder: document.sortOrder ?? fallback?.order ?? 1000 + bySlug.size * 10,
        image,
        hero,
      };
      bySlug.set(project.slug, { project, order: project.sortOrder ?? 1000 });
    }

    return [...bySlug.values()]
      .sort((left, right) => left.order - right.order)
      .map(({ project }) => project);
  } catch {
    return localProjects;
  }
}

function legacyMedia(slug: string): ContentBlock[] {
  return (contentDetails[slug]?.blocks ?? []).filter(block => block.type === 'image' || block.type === 'gallery').slice(0, 4);
}

export async function getWorkDetail(slug: string): Promise<WorkDetail | undefined> {
  const fallback = workDetails[slug];
  if (!isSanityConfigured) return fallback;

  try {
    const document = await sanityClient.fetch<DetailDocument | null>(WORK_DETAIL_QUERY, { slug });
    if (!document) return fallback;

    return {
      sections: document.sections?.length ? document.sections : fallback?.sections ?? [
        { heading: '프로젝트 소개', paragraphs: [document.overview || ''] },
      ],
      media: (document.media ?? []).filter(item => item.src).map(item => ({ type: 'image' as const, ...item })),
    };
  } catch {
    return fallback;
  }
}

export { legacyMedia };
