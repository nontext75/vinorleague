import { notFound } from 'next/navigation';
import { stories } from '@/lib/content';
import { contentDetails } from '@/lib/content-details';
import { Heading, Body } from '@/components/typography';
import { ContentBlocks } from '@/components/content-blocks';
import { ListBackLink } from '@/components/actions';
import { JsonLd } from '@/components/json-ld';
import { pageMetadata, breadcrumbData } from '@/lib/seo';

export function generateStaticParams() { return stories.map(({slug})=>({slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;
 const story=stories.find(story=>story.slug===slug);
 if(!story || !contentDetails[slug]?.blocks.length)notFound();
 return pageMetadata({path:`/news/${story.slug}`,title:story.title,description:story.summary,image:{...story.image,alt:story.title}});
}
export default async function StoryDetail({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;
 const story=stories.find(story=>story.slug===slug);
 if(!story)notFound();
 const detail=contentDetails[slug];
 if(!detail?.blocks.length)notFound();
 return <article className="container page-content article-page">
  <JsonLd data={breadcrumbData([{name:'홈',path:'/'},{name:'Story',path:'/news'},{name:story.title,path:`/news/${story.slug}`}])}/>
  <ListBackLink href="/news">모든 이야기</ListBackLink>
  <header className="article-heading" data-reveal-children>
   <Body size="small"><time dateTime={story.date.replaceAll('.','-')}>{story.date}</time></Body>
   <Heading as="h1" language="ko">{story.title}</Heading>
   <Body size="lead" className="article-summary">{story.summary}</Body>
  </header>
  <div className="article-body"><ContentBlocks blocks={detail.blocks}/></div>
  {detail.tags.length>0&&<ul className="content-tags" aria-label="글 태그" data-reveal-children>{detail.tags.map(tag=><li key={tag}>#{tag}</li>)}</ul>}
  <div className="article-end" data-reveal><ListBackLink href="/news">목록으로 돌아가기</ListBackLink></div>
 </article>;
}
