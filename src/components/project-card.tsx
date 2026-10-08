import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/content';
import { Heading, Body } from './typography';
import styles from './work-gallery.module.css';

export function ProjectCard({project,home=false,archive=false}:{project:Project;home?:boolean;archive?:boolean}) {
 return <Link className={styles.project} href={`/work/${project.slug}`} aria-label={`${project.title} 프로젝트 보기`}><ProjectVisual project={project} home={home}/><div className={styles.meta}><span>{archive?project.category:`${project.category} · ${project.year}`}</span></div><Heading as="h3" scale="compact">{project.title}</Heading>{(!archive||home)&&<Body size="small" className={styles.subtitle}>{project.subtitle}</Body>}</Link>;
}
export function ProjectVisual({project,hero=false,home=false}:{project:Project;hero?:boolean;home?:boolean}) {
 const picture=project.image;
 const props={src:picture.src,alt:picture.alt || `${project.subtitle || project.title} 디자인`,unoptimized:picture.animated,sizes:hero?'(max-width:767px) 92vw, 1400px':home?'(max-width:767px) 70vw, (max-width:903px) 280px, (max-width:1355px) 31vw, 420px':'(max-width:619px) 92vw, (max-width:1099px) 46vw, 32vw'};
 return <div data-image={project.slug} className={`${styles.visual} ${project.category==='Character'?styles.character:''} ${hero?styles.heroVisual:''}`}><span className={styles.imageFrame}>{hero?<Image {...props} fill preload/>:<Image {...props} width={picture.width} height={picture.height}/>}</span></div>;
}
