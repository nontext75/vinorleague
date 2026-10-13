import { pageMetadata } from '@/lib/seo';
import { pageContent } from '@/lib/site-content';
import { PageIntro,SplitTitle } from '@/components/editorial';
import { StoryList } from '@/components/story-list';
export const metadata = pageMetadata(pageContent.news);
export default function Stories(){return <div className="container page-content"><PageIntro title={<SplitTitle first="Always curious." second="Ideas worth sharing."/>} kicker="Ideas & stories" description={pageContent.news.description}/><StoryList headingAs="h2"/></div>;}
