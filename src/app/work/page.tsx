import type { Metadata } from 'next';
import { ProjectFilter } from '@/components/project-filter';
export const metadata: Metadata = { title: 'Work' };
export default function Work() { return <div className="container page-content"><div className="page-heading"><p>Our work</p><h1>Different projects.<br /><span>Same dedication.</span></h1><p className="page-description">브랜드마다 다른 질문에, 각자의 답을 만듭니다.</p></div><ProjectFilter /></div>; }
