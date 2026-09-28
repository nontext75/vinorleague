import type { ReactNode } from 'react';

type HeadingScale = 'display' | 'section' | 'compact';
export function Heading({ as = 'h2', scale = 'section', children, className = '', id, language = 'en' }: { as?: 'h1' | 'h2' | 'h3'; scale?: HeadingScale; children: ReactNode; className?: string; id?: string; language?: 'en' | 'ko' }) {
  const Tag = as;
  return <Tag className={`type-heading type-heading-${scale} ${className}`} id={id} lang={language}>{children}</Tag>;
}

export function Body({ children, size = 'regular', strong = false, className = '' }: { children: ReactNode; size?: 'regular' | 'small' | 'lead'; strong?: boolean; className?: string }) {
  return <p className={`type-body type-body-${size} ${strong ? 'type-strong' : ''} ${className}`}>{children}</p>;
}
