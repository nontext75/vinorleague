import { notFound } from 'next/navigation';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { projects } from '@/lib/content';
import { contentDetails } from '@/lib/content-details';
import { PageIntro } from '@/components/editorial';
import { Heading, Body } from '@/components/typography';
import { ListBackLink } from '@/components/actions';
import { ContentBlocks } from '@/components/content-blocks';

export function generateStaticParams() { return projects.map(({slug})=>({slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;
 const project=projects.find(project=>project.slug===slug);
 return {title:project?.title||'Project',description:project?.subtitle};
}
export default async function ProjectDetail({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;
 const index=projects.findIndex(project=>project.slug===slug);
 if(index<0)notFound();
 const project=projects[index],next=projects[(index+1)%projects.length];
 const detail=contentDetails[slug];
 return <article className="container page-content project-detail">
  <ListBackLink href="/work">모든 프로젝트</ListBackLink>
  <PageIntro title={project.title} kicker={`${project.category} · ${project.year}`} description={project.subtitle} className="detail-heading"/>
  <div className="project-body"><ContentBlocks blocks={detail.blocks} project/></div>
  {detail.tags.length>0&&<ul className="content-tags" aria-label="프로젝트 태그">{detail.tags.map(tag=><li key={tag}>#{tag}</li>)}</ul>}
  <Link href={`/work/${next.slug}`} className="next-project"><Body size="small">Next project</Body><Heading scale="compact">{next.title}</Heading><ArrowUpRight size={30}/></Link>
 </article>;
}
