'use client';
import { useState } from 'react';
import { projects } from '@/lib/content';
import { ProjectGrid } from './project-grid';
import { FilterTabs } from './filter-tabs';
const categories=['All',...new Set(projects.map(project=>project.category))];
export function ProjectFilter() {
 const [active,setActive]=useState('All');
 const filtered=projects.filter(project=>active==='All'||project.category===active);
 return <><FilterTabs label="프로젝트 분야" active={active} onChange={setActive} items={categories.map(category=>({value:category,label:category,count:category==='All'?projects.length:projects.filter(project=>project.category===category).length}))}/><p className="sr-only" role="status">{filtered.length}개의 프로젝트</p><ProjectGrid items={filtered}/></>;
}
