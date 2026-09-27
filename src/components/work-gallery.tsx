'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SquaresFour, List, ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { projects } from '@/lib/content';
import styles from './work-gallery.module.css';

const selected = projects.slice(0, 6);
const categories = [{ value: 'All', label: '전체' }, { value: 'Digital', label: '디지털' }, { value: 'Character', label: '캐릭터' }];
const images: Record<string, string> = { mongdang: '/images/details/mongdang-0.webp', shinhan: '/images/details/shinhan-0.webp', crowd: '/images/details/crowd-0.webp', macadamia: '/images/details/macadamia-0.webp', donga: '/images/details/donga-0.webp' };
const picture = (project: typeof selected[number]) => images[project.image] || `/images/${project.image}.webp`;

export function WorkGallery() {
  const [category, setCategory] = useState('All');
  const [view, setView] = useState<'explore' | 'grid'>('explore');
  const [activeSlug, setActiveSlug] = useState<string>(selected[0].slug);
  const reduce = useReducedMotion();
  const preview = useRef<HTMLDivElement>(null);
  const filtered = selected.filter(project => category === 'All' || category === project.category);
  const active = filtered.find(project => project.slug === activeSlug) || filtered[0];
  const current = filtered.indexOf(active);
  const move = (direction: number) => setActiveSlug(filtered[(current + direction + filtered.length) % filtered.length].slug);

  return <div className={`container ${styles.gallery}`}>
    <div className={styles.toolbar}>
      <div className={styles.filters} role="group" aria-label="프로젝트 분야">{categories.map(({ value, label }) => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{label}<sup>{value === 'All' ? selected.length : selected.filter(project => project.category === value).length}</sup></button>)}</div>
      <div className={styles.viewControls} role="group" aria-label="포트폴리오 보기 방식"><button aria-label="둘러보기" aria-pressed={view === 'explore'} onClick={() => setView('explore')}><List size={21} weight="light" /><span>Explore</span></button><button aria-label="이미지 모아보기" aria-pressed={view === 'grid'} onClick={() => setView('grid')}><SquaresFour size={21} weight="light" /><span>Overview</span></button></div>
    </div>
    {view === 'explore' ? <div className={styles.explorer}>
      <div className={styles.preview} ref={preview}>
        <Link className={styles.previewLink} href={`/work/${active.slug}`} aria-label={`${active.title} 프로젝트 보기`}>
          <div className={styles.previewWindow}>
            <AnimatePresence initial={false} mode="sync"><motion.div key={active.slug} className={`${styles.previewImage} ${active.image === 'mongdang' ? styles.character : ''}`} initial={reduce ? false : { opacity: 0, x: 40, scale: 1.04 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: reduce ? 0 : -30 }} transition={{ duration: reduce ? 0 : .35, ease: [.22,1,.36,1] }}><Image src={picture(active)} alt={`${active.client} ${active.subtitle} 디자인`} fill sizes="(max-width: 767px) 90vw, 800px" /></motion.div></AnimatePresence>
          </div>
          <div className={styles.previewCaption}><span>{active.subtitle}</span><h3>{active.title}</h3></div>
        </Link>
        <div className={styles.previewFoot}><p>{active.description}</p><div className={styles.arrows}><button onClick={() => move(-1)} disabled={filtered.length < 2} aria-label="이전 프로젝트"><ArrowLeft size={23} /></button><button onClick={() => move(1)} disabled={filtered.length < 2} aria-label="다음 프로젝트"><ArrowRight size={23} /></button></div></div>
      </div>
      <div className={styles.index} role="group" aria-label="프로젝트 미리보기 선택" onKeyDown={event => {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
        event.preventDefault();
        const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button'));
        const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
        buttons[(i + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length]?.focus();
      }}>
        <div className={styles.indexLabel}><span>Selected projects</span><span>{String(current + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}</span></div>
        {filtered.map(project => <button className={styles.indexRow} key={project.slug} aria-pressed={active.slug === project.slug} aria-label={`${project.title} 미리보기`} onPointerEnter={event => { if (event.pointerType === 'mouse') setActiveSlug(project.slug); }} onFocus={() => setActiveSlug(project.slug)} onClick={() => { setActiveSlug(project.slug); if (window.matchMedia('(max-width: 767px)').matches) preview.current?.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth', block: 'start' }); }}>
          <span className={styles.indexNumber}>{String(selected.indexOf(project) + 1).padStart(2,'0')}</span><span className={`${styles.thumb} ${project.image === 'mongdang' ? styles.character : ''}`}><Image src={picture(project)} alt="" fill sizes="88px" /></span><span className={styles.indexText}><strong>{project.title}</strong><span>{project.category}</span></span><span className={styles.activeMark} aria-hidden="true" />
        </button>)}
      </div>
    </div> : <motion.div layout={!reduce} className={styles.items}><AnimatePresence initial={false} mode="popLayout">{filtered.map(project => <motion.article layout={!reduce} key={project.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .25 }} className={styles.item}><Link href={`/work/${project.slug}`} className={styles.project} aria-label={`${project.title} 프로젝트 보기`}><div className={`${styles.visual} ${project.image === 'mongdang' ? styles.character : ''}`}><Image src={picture(project)} alt={`${project.client} ${project.subtitle} 디자인`} fill sizes="(max-width: 600px) 90vw, (max-width: 1100px) 45vw, 440px" /></div><div className={styles.caption}><span>{project.category}</span><h3>{project.title}</h3><p>{project.subtitle}</p></div></Link></motion.article>)}</AnimatePresence></motion.div>}
    <p className="sr-only" role="status">{filtered.length}개의 프로젝트, {view === 'explore' ? `${active.title} 미리보기` : '이미지 모아보기'}</p>
  </div>;
}
