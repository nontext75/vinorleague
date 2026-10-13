import type { MetadataRoute } from 'next';
import { stories } from '@/lib/content';
import { contentDetails } from '@/lib/content-details';
import { getWorkDetail, getWorkProjects } from '@/lib/work-content';
import { indexable, absoluteUrl } from '@/lib/seo';
import { pageContent } from '@/lib/site-content';

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!indexable) return [];
  const projects = await getWorkProjects();
  const details = await Promise.all(projects.map(project => getWorkDetail(project.slug)));
  const paths = [
    ...Object.values(pageContent).map(page => page.path),
    ...projects.filter((_, index) => details[index]).map(project => `/work/${project.slug}`),
    ...stories.filter(story => contentDetails[story.slug]?.blocks.length).map(story => `/news/${story.slug}`),
  ];
  // No invented lastModified dates, preview URLs, or internal tools.
  return [...new Set(paths)].map(path => ({ url: absoluteUrl(path)! }));
}
