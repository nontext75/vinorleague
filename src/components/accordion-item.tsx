'use client';

import { useId } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Plus } from '@phosphor-icons/react';
import { Heading, Body } from './typography';
import styles from '@/app/home-editorial.module.css';

export function AccordionItem({ title, text, tags, number, open, onToggle }: {
  title: string; text: string; tags: string[]; number: number; open: boolean; onToggle: () => void;
}) {
  const id = useId();
  const reduce = useReducedMotion();
  return <section className={styles.service} data-open={open}>
    <Heading as="h3" scale="compact"><button id={`${id}-trigger`} type="button" aria-expanded={open} aria-controls={`${id}-panel`} onClick={onToggle}><span className={styles.serviceNumber}>{String(number).padStart(2, '0')}</span><span className={styles.serviceName}>{title}</span><Plus size={25} weight="light" /></button></Heading>
    <div className={styles.servicePanel} id={`${id}-panel`} aria-labelledby={`${id}-trigger`} hidden={!open}><motion.div initial={false} animate={open && reduce === false ? { opacity: [.3, 1], y: [8, 0] } : { opacity: 1, y: 0 }} transition={{ duration: .25, ease: [.22, 1, .36, 1] }}><Body>{text}</Body><div className={styles.serviceTags}>{tags.map(tag => <span key={tag}>{tag}</span>)}</div></motion.div></div>
  </section>;
}
