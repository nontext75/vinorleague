'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Plus } from '@phosphor-icons/react';
import { services } from '@/lib/content';
import styles from '@/app/home-editorial.module.css';
import { HeroVideo } from './hero-video';

const ease = [.22, 1, .36, 1] as const;

function useMotionEnabled() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready && reduce === false;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const enabled = useMotionEnabled();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 70, damping: 22 });
  const y = useSpring(pointerY, { stiffness: 70, damping: 22 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 65]);
  return <section ref={ref} className={styles.intro} aria-labelledby="intro-title" onPointerMove={event => {
    if (!enabled || event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - box.left - box.width / 2) * .025);
    pointerY.set((event.clientY - box.top - box.height / 2) * .035);
  }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
    <motion.div className={styles.heroSculpture} style={{ y: enabled ? scrollY : 0 }} aria-hidden="true"><motion.div style={{ x: enabled ? x : 0, y: enabled ? y : 0 }}><Image src="/images/cinematic-hero.webp" alt="" fill sizes="100vw" priority /></motion.div></motion.div>
    <HeroVideo />
    <div className={`container ${styles.heroInner}`}>
      <p className={styles.heroLabel}>Independent design studio</p>
      <h1 id="intro-title" className={styles.heroTitle}>{['We design', 'sustainable', 'growth.'].map((line, index) => <span className={styles.lineMask} key={line}><span className={styles.titleLine} style={{ animationDelay: `${index * 100}ms` }}>{line}</span></span>)}</h1>
      <div className={styles.heroBottom}><p>첫 아이디어부터 마지막 디테일까지.<br />브랜드의 다음 가능성을 디자인합니다.</p><Link href="/work" className={styles.heroLink}>Explore our work <span><ArrowUpRight size={25} weight="light" /></span></Link></div>
    </div>
  </section>;
}

export function Manifesto() {
  return <h2 id="philosophy-title" className={styles.manifestoTitle}>We focus on essential value and elevate it with beauty.</h2>;
}

export function ServiceList() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  return <div className={styles.serviceList}>{services.map((service, index) => <section className={styles.service} key={service.title} data-open={open === index}>
    <h3><button id={`service-trigger-${index}`} aria-expanded={open === index} aria-controls={`service-${index}`} onClick={() => setOpen(open === index ? null : index)}><span className={styles.serviceNumber}>0{index + 1}</span><span className={styles.serviceName}>{service.title}</span><Plus size={25} weight="light" /></button></h3>
    <div className={styles.servicePanel} id={`service-${index}`} aria-labelledby={`service-trigger-${index}`} hidden={open !== index}><motion.div initial={false} animate={open === index && reduce === false ? { opacity: [.3, 1], y: [8, 0] } : { opacity: 1, y: 0 }} transition={{ duration: .25, ease }}><p>{service.text}</p><div className={styles.serviceTags}>{service.tags.split(' · ').map(tag => <span key={tag}>{tag}</span>)}</div></motion.div></div>
  </section>)}</div>;
}
