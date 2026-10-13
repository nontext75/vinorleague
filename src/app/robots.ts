import type { MetadataRoute } from 'next';
import { indexable, siteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  if (!indexable) return { rules: { userAgent: '*', disallow: '/' } };
  // Internal pages use noindex; allow crawling so crawlers can read that directive.
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteUrl}/sitemap.xml` };
}
