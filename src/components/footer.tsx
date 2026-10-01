import Link from 'next/link';
import { ArrowUp, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Heading,Body } from './typography';
import { TextLink } from './actions';
import { FooterMotion } from './footer-motion';
export function Footer() {
 return <footer className="site-footer home-footer" id="contact">
  <FooterMotion />
  <div className="container">
   <div className="home-footer-invitation">
    <Heading>{['Ready for your', 'next project?'].map(line => <span className="footer-line-mask" key={line}><span className="footer-title-line">{line}</span></span>)}</Heading>
    <TextLink href="/contact" className="footer-project-link">프로젝트 의뢰하기 <ArrowUpRight size={24} aria-hidden="true" /></TextLink>
   </div>
   <div className="footer-bottom">
    <span className="footer-rule" aria-hidden="true" />
    <Link href="/" className="wordmark" aria-label="vinorleague 홈"><span className="footer-wordmark-text" aria-hidden="true">{[...'vinorleague'].map((letter, index) => <span className="footer-letter" key={index}>{letter}</span>)}</span></Link>
    <Body size="small">© {new Date().getFullYear()} vinorleague</Body>
    <a href="#top" className="back-top">Back to top <ArrowUp aria-hidden="true" /></a>
   </div>
  </div>
 </footer>;
}
