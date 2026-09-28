'use client';

import { useState } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { services } from '@/lib/content';
import styles from '@/app/home-editorial.module.css';
import { Heading, Body } from './typography';
import { TextLink } from './actions';
import { AccordionItem } from './accordion-item';

export function Hero() {
  return <section className={styles.intro} aria-labelledby="intro-title">
    <div className={`container ${styles.heroInner}`}>
      <Heading as="h1" scale="display" id="intro-title" className={styles.heroTitle}>{['Design', 'sustainable', 'growth.'].map(line => <span className={styles.lineMask} key={line}><span className={styles.titleLine}>{line}</span></span>)}</Heading>
      <div className={styles.heroBottom}><Body size="lead" strong>첫 아이디어부터 마지막 디테일까지. 브랜드의 다음 가능성을 디자인합니다.</Body><TextLink href="/work" className={styles.heroLink}>Explore our work <span><ArrowUpRight size={25} weight="light" /></span></TextLink></div>
    </div>
  </section>;
}

export function ServiceList() {
  const [open, setOpen] = useState<number | null>(0);
  return <div className={styles.serviceList}>{services.map((service, index) => <AccordionItem key={service.title} title={service.title} text={service.text} tags={service.tags.split(' · ')} number={index + 1} open={open === index} onToggle={() => setOpen(open === index ? null : index)} />)}</div>;
}
