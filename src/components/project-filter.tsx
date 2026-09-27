'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react';
import { projects } from '@/lib/content';

export function ProjectFilter() {
  const [active, setActive] = useState('All');
  const filtered = projects.filter(p => active === 'All' || p.category === active);
  return <><div className="filter-row" role="group" aria-label="프로젝트 분야">{['All', 'Digital', 'Branding', 'Character', 'Editorial'].map(category => <button type="button" key={category} aria-pressed={active === category} className={`btn filter-button ${active === category ? 'is-active' : ''}`} onClick={() => setActive(category)}>{category}<sup>{category === 'All' ? projects.length : projects.filter(p => p.category === category).length}</sup></button>)}</div><p className="sr-only" role="status">{filtered.length}개의 프로젝트</p><div className="work-grid">{filtered.map(p => <Link className="project-card" key={p.slug} href={`/work/${p.slug}`}><div className="project-image anthology-card"><Image src={`/images/${p.image}.webp`} fill sizes="(max-width: 767px) 100vw, 50vw" alt={`${p.client} ${p.subtitle}`} /></div><div className="project-caption"><div><span className="project-category">{p.category}</span><h3>{p.title}</h3><p>{p.subtitle}</p></div><ArrowUpRight size={24} /></div></Link>)}</div></>;
}
