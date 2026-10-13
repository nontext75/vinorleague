import { pageMetadata } from '@/lib/seo';
import { pageContent } from '@/lib/site-content';
import { PageIntro,SplitTitle } from '@/components/editorial';
import { ContactForm } from '@/components/contact-form';
import { ContactDetails } from '@/components/contact-details';
export const metadata = pageMetadata(pageContent.contact);
export default function Contact(){return <div className="container page-content"><PageIntro title={<SplitTitle first="Every good thing" second="starts with a conversation."/>} kicker="Let’s talk" description={pageContent.contact.description}/><div className="contact-grid"><ContactDetails/><ContactForm/></div></div>;}
