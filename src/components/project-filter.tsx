'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react';
import { projects } from '@/lib/content';
import homeStyles from '@/app/home-editorial.module.css';
import styles from './project-filter.module.css';

export function ProjectFilter() {
  const [active, setActive] = useState('All');
  const filtered = projects.filter(p => active === 'All' || p.category === active);
  return <>
    <div className="filter-row" role="group" aria-label="프로젝트 분야">
      {['All', 'Digital', 'Branding', 'Character', 'Editorial'].map(category => <button type="button" key={category} aria-pressed={active === category} className={`${homeStyles.studioLink} filter-button ${active === category ? 'is-active' : ''}`} onClick={() => setActive(category)}>{category}<sup>{category === 'All' ? projects.length : projects.filter(p => p.category === category).length}</sup></button>)}
    </div>
    <p className="sr-only" role="status">{filtered.length}개의 프로젝트</p>
    <div className={styles.grid}>
      {filtered.map((p, index) => <Link className={styles.card} key={p.slug} href={`/work/${p.slug}`}>
        <div className={styles.visual}><Image src={`/images/${p.image}.webp`} fill sizes="(max-width: 619px) 92vw, (max-width: 1099px) 46vw, 24vw" alt={`${p.client} ${p.subtitle}`} /></div>
        <div className={styles.caption}>
          <div><span className={styles.category}>{String(index + 1).padStart(2, '0')} <span>/</span> {p.category}</span><h3>{p.title}</h3><p>{p.subtitle}</p></div>
          <ArrowUpRight size={21} weight="light" />
        </div>
      </Link>)}
    </div>
  </>;
}
