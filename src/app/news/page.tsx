import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { stories } from '@/lib/content';
export const metadata: Metadata = { title: 'Stories' };
export default function Stories() { return <div className="container page-content"><div className="page-heading"><p>Ideas & stories</p><h1>Always curious.<br /><span>Never finished.</span></h1><p className="page-description">브랜드, 제품, 디자인을 바라보는 우리의 생각.</p></div><div className="story-list">{stories.map(story => <Link href={`/news/${story.slug}`} key={story.slug}><span className="story-list-date">{story.date}<small>Insight</small></span><div><h2>{story.title}</h2><p>{story.summary}</p></div><ArrowUpRight size={30} weight="light" /></Link>)}</div></div>; }
