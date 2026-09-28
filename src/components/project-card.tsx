import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/content';
import { Heading, Body } from './typography';
import styles from './work-gallery.module.css';
const pictures: Record<string,{src:string;width:number;height:number}> = {
 mongdang:{src:'/images/details/mongdang-0.webp',width:1440,height:900},
 shinhan:{src:'/images/details/shinhan-0.webp',width:1440,height:814},
 crowd:{src:'/images/details/crowd-0.webp',width:1440,height:3146},
 macadamia:{src:'/images/details/macadamia-0.webp',width:1440,height:4247},
 donga:{src:'/images/details/donga-0.webp',width:1440,height:3383},
 budongsan:{src:'/images/budongsan.webp',width:480,height:360},
 aliot:{src:'/images/aliot.webp',width:480,height:360},
 frame:{src:'/images/frame.webp',width:480,height:360},
};
export function ProjectCard({ project }: { project: Project }) {
 return <Link className={styles.project} href={`/work/${project.slug}`} aria-label={`${project.title} 프로젝트 보기`}><ProjectVisual project={project}/><div className={styles.meta}><span>{project.category}</span></div><Heading as="h3" scale="compact">{project.title}</Heading><Body size="small" className={styles.subtitle}>{project.subtitle}</Body></Link>;
}
export function ProjectVisual({project,hero=false}:{project:Project;hero?:boolean}) {
 const picture=pictures[project.image];
 const props={src:picture.src,alt:`${project.client} ${project.subtitle} 디자인`,sizes:hero?'(max-width:767px) 92vw, 1400px':'(max-width:619px) 92vw, (max-width:1099px) 46vw, 24vw'};
 return <div className={`${styles.visual} ${hero?styles.heroVisual:''} ${project.image==='mongdang'?styles.character:''}`}>{hero?<Image {...props} fill preload/>:<Image {...props} width={picture.width} height={picture.height}/>}</div>;
}
