import { projects } from '@/lib/content';
import { ProjectGrid } from './project-grid';
export function WorkGallery() { return <ProjectGrid items={projects.slice(0,6)} home className="container"/>; }
