import Link from 'next/link';
import { ArrowUp } from '@phosphor-icons/react/dist/ssr';
import { Heading,Body } from './typography';
import { TextLink } from './actions';
export function Footer() {
 return <footer className="site-footer home-footer" id="contact"><div className="container"><div className="home-footer-invitation"><Heading>Ready for your<br/>next project?</Heading><TextLink href="/contact" className="footer-project-link">프로젝트 의뢰하기</TextLink></div><div className="footer-bottom"><Link href="/" className="wordmark">vinorleague</Link><Body size="small">© {new Date().getFullYear()} vinorleague</Body><a href="#top" className="back-top">Back to top <ArrowUp/></a></div></div></footer>;
}
