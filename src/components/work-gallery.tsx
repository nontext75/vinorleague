import type { Project } from '@/lib/content';
import { ProjectGrid } from './project-grid';
export function WorkGallery({ projects }: { projects: readonly Project[] }) { return <ProjectGrid items={projects} home className="container"/>; }
