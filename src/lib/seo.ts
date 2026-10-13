import type { Metadata } from 'next';
import { getSeoConfig } from './seo-config';
import { site } from './site-content';

export const { siteUrl, indexable } = getSeoConfig();
export const noIndex: Metadata['robots'] = { index: false, follow: false };
export const siteRobots: Metadata['robots'] = indexable
  ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } }
  : noIndex;

export function absoluteUrl(path: string): string | undefined {
  if (/^https?:\/\//.test(path)) return path;
  if (!siteUrl) return undefined;
  // Next.js normalizes the root canonical to the origin without a trailing slash.
  return path === '/' ? siteUrl : new URL(path, `${siteUrl}/`).toString();
}

export function makeDescription(text: string): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= 160) return clean;
  const clipped = clean.slice(0, 157);
  const lastSpace = clipped.lastIndexOf(' ');
  return `${(lastSpace > 110 ? clipped.slice(0, lastSpace) : clipped).trimEnd()}…`;
}

type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
  image?: { src: string; alt: string; width?: number; height?: number };
};

export function pageMetadata({ path, title, description, image }: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const cover = image ?? { src: '/images/growth-sculpture.webp', alt: 'vinorleague의 디자인을 표현한 조형 이미지' };
  const imageUrl = absoluteUrl(cover.src);
  const images = imageUrl ? [{ url: imageUrl, alt: cover.alt, width: cover.width, height: cover.height }] : [];
  const fullTitle = `${title} · ${site.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: { type: 'website', locale: 'ko_KR', siteName: site.name, title: fullTitle, description, ...(url ? { url } : {}), images },
    twitter: { card: images.length ? 'summary_large_image' : 'summary', title: fullTitle, description, images },
  };
}

export function organizationData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    ...(siteUrl ? { '@id': `${siteUrl}/#organization`, url: siteUrl } : {}),
    name: site.name,
    description: site.description,
  };
}

export function breadcrumbData(items: { name: string; path: string }[]) {
  if (!siteUrl) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(item.path),
    })),
  };
}
