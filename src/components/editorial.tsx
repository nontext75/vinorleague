import type { ReactNode } from 'react';
import { Heading, Body } from './typography';
import { TextLink } from './actions';
export function SectionHeader({title,description,subtitle,kicker,id,href,label,className='',as='h2',layout='stack',language='en'}:{title:ReactNode;description?:ReactNode;subtitle?:ReactNode;kicker?:ReactNode;id?:string;href?:string;label?:string;className?:string;as?:'h1'|'h2';layout?:'stack'|'row';language?:'en'|'ko'}) {
 return <div className={`section-header ${className}`} data-layout={layout} data-reveal-children>{kicker&&<Body size="small" className="section-kicker">{kicker}</Body>}<Heading as={as} id={id} language={language}>{title}</Heading>{(subtitle||description||href)&&<div className="section-header-copy" data-reveal-children>{subtitle&&<Body size="lead" strong className="section-header-subtitle">{subtitle}</Body>}{description&&<Body>{description}</Body>}{href&&<TextLink href={href}>{label}</TextLink>}</div>}</div>;
}
export function SplitTitle({first,second}:{first:ReactNode;second:ReactNode}) {
 return <><span className="intro-line" data-reveal="line">{first}</span><span className="intro-line intro-line-secondary" data-reveal="line">{second}</span></>;
}
export function PageIntro({title,description,subtitle,kicker,className='page-heading',language='en'}:{title:ReactNode;description?:ReactNode;subtitle?:ReactNode;kicker?:ReactNode;className?:string;language?:'en'|'ko'}) {
 return <SectionHeader as="h1" title={title} description={description} subtitle={subtitle} kicker={kicker} className={className} language={language}/>;
}
