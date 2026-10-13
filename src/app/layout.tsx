import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import './globals.css';
import './editorial-theme.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { RevealMotion } from '@/components/reveal-motion';
import { site } from '@/lib/site-content';
import { siteUrl, siteRobots } from '@/lib/seo';

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: { default: `${site.name} — Design sustainable growth.`, template: `%s · ${site.name}` },
  description: site.description,
  robots: siteRobots,
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko" data-theme="vinor"><body id="top"><a className="skip-link" href="#main">본문 바로가기</a><RevealMotion /><Header /><main id="main">{children}</main><Footer /></body></html>;
}
