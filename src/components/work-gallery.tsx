'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SquaresFour, List } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { projects } from '@/lib/content';
import styles from './work-gallery.module.css';

const selected = projects.slice(0, 6);
const categories = [{ value: 'All', label: '전체' }, { value: 'Digital', label: '디지털' }, { value: 'Character', label: '캐릭터' }];
const images: Record<string, string> = { mongdang: '/images/details/mongdang-0.webp', shinhan: '/images/details/shinhan-0.webp', crowd: '/images/details/crowd-0.webp', macadamia: '/images/details/macadamia-0.webp', donga: '/images/details/donga-0.webp' };

export function WorkGallery() {
  const [category, setCategory] = useState('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const reduce = useReducedMotion();
  const filtered = selected.filter(project => category === 'All' || category === project.category);

  return <div className={`container ${styles.gallery}`}>
    <div className={styles.toolbar}>
      <div className={styles.filters} role="group" aria-label="프로젝트 분야">{categories.map(({ value, label }) => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{label}<sup>{value === 'All' ? selected.length : selected.filter(project => project.category === value).length}</sup></button>)}</div>
      <div className={styles.viewControls} role="group" aria-label="포트폴리오 보기 방식"><button aria-label="이미지 보기" aria-pressed={view === 'grid'} onClick={() => setView('grid')}><SquaresFour size={22} weight="light" /></button><button aria-label="목록 보기" aria-pressed={view === 'list'} onClick={() => setView('list')}><List size={22} weight="light" /></button></div>
    </div>
    <motion.div layout={!reduce} className={styles.items} data-view={view}>
      <AnimatePresence initial={false} mode="popLayout">{filtered.map(project => <motion.article layout={!reduce} key={project.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .3, ease: [.22, 1, .36, 1] }} className={styles.item}>
        <Link href={`/work/${project.slug}`} className={styles.project} aria-label={`${project.title} 프로젝트 보기`}>
          <div className={`${styles.visual} ${project.image === 'mongdang' ? styles.character : ''}`}><Image src={images[project.image] || `/images/${project.image}.webp`} alt={`${project.client} ${project.subtitle} 디자인`} fill sizes={view === 'list' ? '160px' : '(max-width: 600px) 90vw, (max-width: 1100px) 45vw, 440px'} /></div>
          <div className={styles.caption}><div className={styles.category}>{project.category}</div><h3>{project.title}</h3><p>{project.subtitle}</p></div>
          <p className={styles.description}>{project.description}</p>
        </Link>
      </motion.article>)}</AnimatePresence>
    </motion.div>
    <p className="sr-only" role="status">{filtered.length}개의 프로젝트, {view === 'grid' ? '이미지 보기' : '목록 보기'}</p>
  </div>;
}
