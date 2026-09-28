import type {Metadata} from 'next';
import { PageIntro,SplitTitle } from '@/components/editorial';
import { StoryList } from '@/components/story-list';
export const metadata:Metadata={title:'Stories'};
export default function Stories(){return <div className="container page-content"><PageIntro title={<SplitTitle first="Always curious." second="Ideas worth sharing."/>} kicker="Ideas & stories" description="브랜드, 제품, 디자인을 바라보는 우리의 생각."/><StoryList/></div>;}
