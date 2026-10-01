import {notFound} from 'next/navigation';
import {ArrowUpRight} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import {projects} from '@/lib/content';
import {PageIntro} from '@/components/editorial';
import {Heading,Body} from '@/components/typography';
import {TextLink} from '@/components/actions';
import {ProjectVisual} from '@/components/project-card';
export function generateStaticParams(){return projects.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return{title:projects.find(project=>project.slug===slug)?.title||'Project'};}
export default async function ProjectDetail({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const index=projects.findIndex(project=>project.slug===slug);if(index<0)notFound();const project=projects[index],next=projects[(index+1)%projects.length];
 return <article className="container page-content" data-reveal-children><TextLink href="/work">모든 프로젝트</TextLink><PageIntro title={project.title} kicker={project.category} description={project.subtitle} className="detail-heading"/><ProjectVisual project={project} hero/><section className="project-overview"><Heading scale="compact">About the project</Heading><div><Body>{project.description}</Body><dl><div><dt>Client</dt><dd>{project.client}</dd></div><div><dt>Discipline</dt><dd>{project.category}</dd></div></dl></div></section><Link href={`/work/${next.slug}`} className="next-project"><Body size="small">Next project</Body><Heading scale="compact">{next.title}</Heading><ArrowUpRight size={30}/></Link></article>;
}
