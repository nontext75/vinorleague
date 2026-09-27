import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import type { Project } from '@/lib/content';

export function ProjectCard({ project, index = 0, imageSrc, showDescription = false }: { project: Project; index?: number; imageSrc?: string; showDescription?: boolean }) {
  return <Link href={`/work/${project.slug}`} className={`project-card project-${project.image}`}>
    <div className="project-image anthology-card"><Image src={imageSrc || `/images/${project.image}.webp`} alt={`${project.client} ${project.subtitle} 디자인`} fill sizes="(max-width: 767px) 100vw, 50vw" /><span className="project-open" aria-hidden="true"><ArrowUpRight size={28} /></span></div>
    <div className="project-caption"><div><span className="project-category">{project.category} <span> / </span> {String(index + 1).padStart(2, '0')}</span><h3>{project.title}</h3><p>{project.subtitle}</p>{showDescription && <p className="project-description">{project.description}</p>}</div><ArrowUpRight size={24} weight="light" /></div>
  </Link>;
}
