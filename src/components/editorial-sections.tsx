import Image from 'next/image';
import type { ReactNode } from 'react';
import { Heading,Body } from './typography';
import { TextLink } from './actions';
import { SectionHeader } from './editorial';
import { ServiceList } from './home-motion';
import { clients } from '@/lib/content';
import logoMetrics from '@/lib/client-logo-metrics.json';
import styles from '@/app/home-editorial.module.css';
export function StatementSection({title=<>We focus on essential value and elevate it with beauty.</>,lead='우리는 본질적인 가치에 집중하고, 그 위에 아름다움을 더합니다.',children,headingAs='h2'}:{title?:ReactNode;lead?:string;children?:ReactNode;headingAs?:'h1'|'h2'}) {
 return <section className={`${styles.philosophy} container`} aria-labelledby="philosophy-title"><Heading as={headingAs} id="philosophy-title" language="en" className={styles.manifestoTitle}>{title}</Heading><div className={styles.philosophyBody}><div><Body size="lead" strong className={styles.philosophyLead}>{lead}</Body><Body>{children||<>빠르게 변하는 시대에도 오래 남을 가치를 찾습니다.<br/>구조와 경계를 넘어, 아이디어가 가진 가능성을 디자인으로 펼칩니다.</>}</Body></div><TextLink href="/studio">스튜디오 소개</TextLink></div></section>;
}
export function ServicesSection({studio=false}:{studio?:boolean}) {
 return <section className={`${styles.method} ${styles.methodRevised}`} aria-labelledby="method-title"><div className={`container ${styles.methodLayout}`}><div className={styles.methodHeading}><Heading id="method-title">Always there.<span>From first idea to final detail.</span></Heading></div><div className={styles.methodEditorial}><div className={styles.methodBody}><Body><span>시작할 때의 방향 설정부터 출시 이후의 개선까지 함께합니다.</span><span>UI/UX, 브랜딩, 제품 디자인의 경험을 바탕으로 AI를 기획과 탐색에 활용하며, 브랜드에 맞는 경험을 구체화합니다.</span></Body><div className={styles.methodLinks}><TextLink href={studio?'/work':'/studio'}>{studio?'프로젝트로 만나보기':'서비스 알아보기'}</TextLink></div></div><ServiceList/></div></div></section>;
}
export function ClientsSection() {
 return <section className={`${styles.clients} container`} aria-labelledby="clients-title"><SectionHeader className={styles.sectionIntro} id="clients-title" title={<>Clients we’ve<br/>partnered with.</>} description="다양한 산업의 팀들과 함께 전략, 디자인, 꾸준한 개선으로 오래가는 가치를 만듭니다."/><div className={styles.logoGrid}>{clients.map(client=>{const size=logoMetrics[client.file as keyof typeof logoMetrics];return <div className={styles.logoCell} key={client.file}>{client.file==='lg-cns'?<div className={styles.combinedLogo}><span className={styles.logoMark}><Image src="/clients/normalized/lg-cns-mark.svg" alt="" fill sizes="70px"/></span><span className={styles.logoWord}><Image src="/clients/normalized/lg-cns-wordmark.svg" alt={client.name} fill sizes="53px"/></span></div>:<span className={styles.logoArtwork} style={{width:size.width,height:size.height}}><Image src={`/clients/normalized/${client.file}.svg`} alt={client.name} fill sizes="142px"/></span>}</div>})}</div></section>;
}
