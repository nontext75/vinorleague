type SeoEnvironment = {
  NODE_ENV?: string;
  VERCEL_ENV?: string;
  SITE_ENV?: string;
  SITE_INDEXING_ENABLED?: string;
  NEXT_PUBLIC_SITE_URL?: string;
};

/** Never infer a canonical domain from a request, preview URL, or imported source. */
export function getSeoConfig(env: SeoEnvironment = process.env) {
  let siteUrl: string | undefined;
  try {
    const url = new URL(env.NEXT_PUBLIC_SITE_URL?.trim() || '');
    const hostname = url.hostname.toLowerCase();
    if (
      url.protocol === 'https:' && !url.username && !url.password && !url.port &&
      url.pathname === '/' && !url.search && !url.hash &&
      hostname.includes('.') && !hostname.endsWith('.localhost') &&
      !hostname.endsWith('.local') && !hostname.endsWith('.test') &&
      !hostname.endsWith('.invalid') && !/^\d+(\.\d+){3}$/.test(hostname)
    ) siteUrl = url.origin;
  } catch {
    // An unset/invalid domain keeps previews out of search and omits canonical URLs.
  }

  const environment = env.VERCEL_ENV || env.SITE_ENV;
  const indexable = Boolean(siteUrl && env.NODE_ENV === 'production' &&
    environment === 'production' && env.SITE_INDEXING_ENABLED === 'true');
  return { siteUrl, indexable };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
