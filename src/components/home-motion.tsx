'use client';

import { ArrowUpRight } from '@phosphor-icons/react';
import { services } from '@/lib/content';
import styles from '@/app/home-editorial.module.css';
import { Heading, Body } from './typography';
import { TextLink } from './actions';

export function Hero() {
  return <section className={styles.intro} aria-labelledby="intro-title">
    <div className={`container ${styles.heroInner}`}>
      <Heading as="h1" scale="display" id="intro-title" className={styles.heroTitle}>{['Design', 'sustainable', 'growth.'].map(line => <span className={styles.lineMask} key={line}><span className={styles.titleLine}>{line}</span></span>)}</Heading>
      <Body size="lead" strong className={styles.heroSubtitle}>We work with brands from the first idea to the last detail, shaping direction, experience, and improvement together.</Body>
      <div className={styles.heroBottom}><Body size="lead" strong>첫 아이디어부터 마지막 디테일까지. 브랜드의 다음 가능성을 디자인합니다.</Body><TextLink href="/work" className={styles.heroLink}>Explore our work <span><ArrowUpRight size={25} weight="light" /></span></TextLink></div>
    </div>
  </section>;
}

export function ServiceList() {
  return <div className={styles.serviceList}>{services.map((service, index) => <section className={styles.service} key={service.title}>
    <span className={styles.serviceNumber}>{String(index + 1).padStart(2, '0')}</span>
    <Heading as="h3" scale="compact" language="en" className={styles.serviceName}>{service.title}</Heading>
    <div className={styles.serviceDetail}><Body>{service.text}</Body><div className={styles.serviceTags}>{service.tags.split(' · ').map(tag => <span key={tag}>{tag}</span>)}</div></div>
  </section>)}</div>;
}
