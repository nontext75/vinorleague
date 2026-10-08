import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { ContentBlock } from '@/lib/content-details';

export function ContentBlocks({ blocks, project = false, eagerFirst = true }: { blocks: ContentBlock[]; project?: boolean; eagerFirst?: boolean }) {
 const firstMedia = blocks.findIndex(block => block.type === 'image' || block.type === 'gallery');
 return blocks.map((block, index) => {
  if (block.type === 'gallery') return <div className="content-gallery" style={{'--gallery-columns':block.columns} as CSSProperties} key={index}><ContentBlocks blocks={block.children} project={project} eagerFirst={eagerFirst && index === firstMedia}/></div>;
  if (block.type === 'image') return <figure key={index} data-reveal="image"><Image src={block.src} width={block.width} height={block.height} alt={block.alt} style={{maxWidth:block.width,marginInline:'auto'}} loading={eagerFirst && index === firstMedia?'eager':'lazy'} unoptimized={block.animated || block.height > 5000} sizes={project?'(max-width:767px) calc(100vw - 48px), (max-width:1500px) 88vw, 1400px':'(max-width:767px) calc(100vw - 40px), 900px'}/></figure>;
  if (block.type === 'heading') return <h2 key={index} data-reveal="line">{block.text}</h2>;
  return <p key={index} data-reveal="copy">{block.text}</p>;
 });
}
