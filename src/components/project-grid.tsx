'use client';

import { useLayoutEffect, useRef } from 'react';
import type { Project } from '@/lib/content';
import { ProjectCard } from './project-card';
import styles from './work-gallery.module.css';

export function ProjectGrid({ items, home = false, className = '' }: {
  items: readonly Project[]; home?: boolean; className?: string;
}) {
  const grid = useRef<HTMLOListElement>(null);
  useLayoutEffect(() => {
    if (home) return;
    const list = grid.current;
    if (!list) return;
    const cards = [...list.querySelectorAll('article')];
    let frame = 0;
    const measure = () => {
      list.dataset.masonry = 'true';
      const gap = parseFloat(getComputedStyle(list).getPropertyValue('--card-gap'));
      for (const card of cards) {
        const item = card.parentElement!;
        item.style.gridRowEnd = `span ${Math.ceil((card.getBoundingClientRect().height + gap) / 8)}`;
      }
    };
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    measure();
    for (const card of cards) observer.observe(card);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [items, home]);

  return <ol ref={grid} className={`${styles.gallery} ${className}`} data-home={home} aria-label={home ? '주요 프로젝트' : '프로젝트 목록'} data-reveal-children>{items.map(project => <li key={project.slug}><article><ProjectCard project={project} home={home} /></article></li>)}</ol>;
}
