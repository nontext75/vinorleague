import type {Metadata} from 'next';
import { ProjectFilter } from '@/components/project-filter';
import { PageIntro } from '@/components/editorial';
export const metadata:Metadata={title:'Work'};
export default function Work(){return <div className="container page-content"><PageIntro title={<>Different projects.<br/>Same dedication.</>} kicker="Our work" description="브랜드마다 다른 질문에, 각자의 답을 만듭니다."/><ProjectFilter/></div>;}
