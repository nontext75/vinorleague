import type { Metadata } from 'next';
import '@fontsource-variable/outfit';
import './globals.css';
import './editorial-theme.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = { title: { default: 'vinorleague — We design sustainable growth.', template: '%s · vinorleague' }, description: '첫 생각부터 마지막 디테일까지. 브랜드 전략, UX/UI, 캐릭터와 디지털 경험을 함께 만드는 디자인 스튜디오 vinorleague.', robots: { index: false, follow: false } };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko" data-theme="vinor"><body id="top"><a className="skip-link" href="#main">본문 바로가기</a><Header /><main id="main">{children}</main><Footer /></body></html>;
}
