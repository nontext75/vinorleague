import type {Metadata} from 'next';
import { PageIntro,SplitTitle } from '@/components/editorial';
import { ContactForm } from '@/components/contact-form';
import { ContactDetails } from '@/components/contact-details';
export const metadata:Metadata={title:'Contact'};
export default function Contact(){return <div className="container page-content"><PageIntro title={<SplitTitle first="Every good thing" second="starts with a conversation."/>} kicker="Let’s talk" description="아직 정리되지 않은 아이디어여도 괜찮습니다."/><div className="contact-grid"><ContactDetails/><ContactForm/></div></div>;}
