import type {Metadata} from 'next';
import { ProjectFilter } from '@/components/project-filter';
import { PageIntro,SplitTitle } from '@/components/editorial';
import { getWorkProjects } from '@/lib/work-content';

export const metadata:Metadata={title:'Work'};
export const revalidate = 60;

export default async function Work(){
 const projects=await getWorkProjects();
 return <div className="container page-content work-archive"><div className="work-archive-heading"><PageIntro title={<SplitTitle first="SEAMLESS NEW" second="EXPERIENCES"/>} kicker="Experience" description="우리는 치밀한 리서치와 전략을 바탕으로 브랜드와 사용자의 경험을 설계하며, 새롭지만 직관적인 디지털 경험으로 더 가치 있는 브랜드를 만들어갑니다."/><p className="work-project-count"><span>{String(projects.length).padStart(2,'0')}</span> Projects</p></div><ProjectFilter projects={projects}/></div>;
}
