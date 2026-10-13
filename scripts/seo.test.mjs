import test from 'node:test';
import assert from 'node:assert/strict';
import { getSeoConfig, serializeJsonLd } from '../src/lib/seo-config.ts';

const production = {
  NODE_ENV: 'production', SITE_ENV: 'production', SITE_INDEXING_ENABLED: 'true',
  NEXT_PUBLIC_SITE_URL: 'https://seo.example.org/',
};

test('only an explicitly enabled production site with a confirmed domain is indexable', () => {
  assert.deepEqual(getSeoConfig(production), { siteUrl: 'https://seo.example.org', indexable: true });
  for (const override of [
    { NODE_ENV: 'development' }, { SITE_ENV: 'preview' }, { SITE_ENV: undefined },
    { SITE_INDEXING_ENABLED: 'false' }, { SITE_INDEXING_ENABLED: undefined },
    { NEXT_PUBLIC_SITE_URL: '' }, { VERCEL_ENV: 'preview' }, { VERCEL_ENV: 'development' },
  ]) assert.equal(getSeoConfig({ ...production, ...override }).indexable, false, JSON.stringify(override));
  assert.equal(getSeoConfig({ ...production, SITE_ENV: undefined, VERCEL_ENV: 'production' }).indexable, true);
  assert.equal(getSeoConfig({}).indexable, false);
});

test('invalid, local, credential-bearing, and non-root domains cannot become canonicals', () => {
  for (const value of [
    '', 'not a url', 'http://seo.example.org', 'https://localhost', 'https://127.0.0.1',
    'https://studio.local', 'https://studio.test', 'https://studio.invalid', 'https://[::1]',
    'https://user:password@seo.example.org', 'https://seo.example.org:3000',
    'https://seo.example.org/path', 'https://seo.example.org?preview=1', 'https://seo.example.org#top',
  ]) {
    const config = getSeoConfig({ ...production, NEXT_PUBLIC_SITE_URL: value });
    assert.equal(config.siteUrl, undefined, value);
    assert.equal(config.indexable, false, value);
  }
});

test('JSON-LD preserves text but cannot close its script element', () => {
  const data = { name: '</script><script>alert("x")</script>', description: '한글 & "인용" <태그>' };
  const json = serializeJsonLd(data);
  assert.equal(json.includes('<'), false);
  assert.deepEqual(JSON.parse(json), data);
});
