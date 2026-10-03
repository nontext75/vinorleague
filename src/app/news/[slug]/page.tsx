import Link from 'next/link';
import { notFound } from 'next/navigation';
import { stories } from '@/lib/content';
import { contentDetails } from '@/lib/content-details';
import { Heading, Body } from '@/components/typography';
import { ContentBlocks } from '@/components/content-blocks';

export function generateStaticParams() { return stories.map(({slug})=>({slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;
 const story=stories.find(story=>story.slug===slug);
 return {title:story?.title||'Story',description:story?.summary};
}
export default async function StoryDetail({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;
 const story=stories.find(story=>story.slug===slug);
 if(!story)notFound();
 const detail=contentDetails[slug];
 return <article className="container page-content article-page">
  <Link className="article-back" href="/news">모든 이야기</Link>
  <header className="article-heading">
   <Body size="small"><time dateTime={story.date.replaceAll('.','-')}>{story.date}</time></Body>
   <Heading as="h1" language="ko">{story.title}</Heading>
  </header>
  <div className="article-body"><ContentBlocks blocks={detail.blocks}/></div>
  {detail.tags.length>0&&<ul className="content-tags" aria-label="글 태그">{detail.tags.map(tag=><li key={tag}>#{tag}</li>)}</ul>}
  <div className="article-end"><Link className="article-back" href="/news">목록으로 돌아가기</Link></div>
 </article>;
}
