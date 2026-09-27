'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ArrowUp } from '@phosphor-icons/react/dist/ssr';
export function Footer() {
  const pathname = usePathname();
  if (pathname === '/') return <footer className="site-footer home-footer" id="contact"><div className="container"><div className="home-footer-invitation"><h2>Ready for your<br />next project?</h2><Link href="/contact" className="project-enquiry">프로젝트 의뢰하기</Link></div><div className="footer-bottom"><Link href="/" className="wordmark">vinorleague</Link><span>© {new Date().getFullYear()} vinorleague</span><a href="#top" className="back-top">Back to top <ArrowUp /></a></div></div></footer>;
  return <footer className="site-footer" id="contact"><div className="container">
    <div className="footer-top"><div><p>Contact</p><p className="footer-introduction">첫 아이디어부터 마지막 디테일까지.<br />다음 프로젝트를 함께 시작해볼까요?</p></div><Link href="/contact" className="footer-cta">Ready for your<br />next project?</Link></div>
    <div className="footer-contact-grid">
      <div><h2>Business enquiries</h2><a href="mailto:vinus@vinus.co.kr">vinus@vinus.co.kr <ArrowUpRight size={16} /></a><p><a href="tel:0236611907">TEL 02-3661-1907</a><br />FAX 02-3661-1906</p></div>
      <div><h2>Recruit</h2><a href="mailto:vinus@vinus.co.kr?subject=Open%20Position">vinus@vinus.co.kr <ArrowUpRight size={16} /></a><p>함께 일하고 싶은 분들의<br />이야기를 기다립니다.</p></div>
      <div><h2>Business hours</h2><p>Monday to Friday<br />10:00–18:00, GMT +9</p></div>
      <div><h2>Korea</h2><a href="https://maps.google.com/?q=227+Gonghang-daero+Seoul" target="_blank" rel="noreferrer">서울 강서구 공항대로 227<br />마곡센트럴타워 I, 1202호<br />07802</a></div>
    </div>
    <div className="footer-bottom"><Link href="/" className="wordmark">vinorleague<span>*</span></Link><span>© {new Date().getFullYear()} vinorleague</span><a href="#top" className="back-top">Back to top <ArrowUp /></a></div>
  </div></footer>;
}
