import data from '@/data/vinus-details.json';

export type ContentBlock =
 | { type: 'paragraph' | 'heading'; text: string }
 | { type: 'image'; src: string; width: number; height: number; alt: string; animated: boolean }
 | { type: 'gallery'; columns: number; children: ContentBlock[] };

export type ContentDetail = { blocks: ContentBlock[]; tags: string[] };
// Detail bodies stay in server components; listing filters only load the catalog.
export const contentDetails = data as Record<string, ContentDetail>;
