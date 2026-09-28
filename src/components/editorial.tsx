import type { ReactNode } from 'react';
import { Heading, Body } from './typography';
import { TextLink } from './actions';
export function SectionHeader({title,description,kicker,id,href,label,className='',as='h2',layout='stack',language='en'}:{title:ReactNode;description?:ReactNode;kicker?:ReactNode;id?:string;href?:string;label?:string;className?:string;as?:'h1'|'h2';layout?:'stack'|'row';language?:'en'|'ko'}) {
 return <div className={`section-header ${className}`} data-layout={layout}>{kicker&&<Body size="small" className="section-kicker">{kicker}</Body>}<Heading as={as} id={id} language={language}>{title}</Heading>{(description||href)&&<div className="section-header-copy">{description&&<Body>{description}</Body>}{href&&<TextLink href={href}>{label}</TextLink>}</div>}</div>;
}
export function SplitTitle({first,second}:{first:ReactNode;second:ReactNode}) {
 return <><span className="intro-line">{first}</span><span className="intro-line intro-line-secondary">{second}</span></>;
}
export function PageIntro({title,description,kicker,className='page-heading',language='en'}:{title:ReactNode;description?:ReactNode;kicker?:ReactNode;className?:string;language?:'en'|'ko'}) {
 return <SectionHeader as="h1" title={title} description={description} kicker={kicker} className={className} language={language}/>;
}
