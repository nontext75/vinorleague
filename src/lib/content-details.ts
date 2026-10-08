import data from '@/data/vinus-details.json';
import workData from '@/data/vinus-work-details.json';

export type ContentBlock =
 | { type: 'paragraph' | 'heading'; text: string }
 | { type: 'image'; src: string; width: number; height: number; alt: string; animated: boolean }
 | { type: 'gallery'; columns: number; children: ContentBlock[] };

export type ContentDetail = { blocks: ContentBlock[]; tags: string[] };
export type WorkDetail = { sections: { heading: string; paragraphs: string[] }[]; media?: ContentBlock[] };
// Detail bodies stay in server components; listing filters only load the catalog.
export const contentDetails = data as Record<string, ContentDetail>;
export const workDetails = workData as Record<string, WorkDetail>;
