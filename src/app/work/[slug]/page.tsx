import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { projects } from '@/lib/content';
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return { title: projects.find(p => p.slug === slug)?.title || 'Project' }; }
export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const index = projects.findIndex(p => p.slug === slug); if (index < 0) notFound(); const project = projects[index]; const next = projects[(index + 1) % projects.length];
  return <article className="container page-content"><Link href="/work" className="text-link"><ArrowLeft size={18} /> 모든 프로젝트</Link><div className="detail-heading"><span>{project.category}</span><h1>{project.title}</h1><p>{project.subtitle}</p></div><div className="detail-image"><Image src={`/images/${project.image}.webp`} alt={`${project.title} 디자인`} fill sizes="(max-width: 767px) 100vw, 900px" priority /></div><div className="project-overview"><h2>About the project</h2><div><p>{project.description}</p><dl><div><dt>Client</dt><dd>{project.client}</dd></div><div><dt>Discipline</dt><dd>{project.category}</dd></div></dl></div></div><Link href={`/work/${next.slug}`} className="next-project"><span>Next project</span><strong>{next.title}</strong><ArrowUpRight size={36} /></Link></article>;
}
