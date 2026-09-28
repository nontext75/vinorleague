import Image from 'next/image';
import Link from 'next/link';
import { stories } from '@/lib/content';
import { Heading,Body } from './typography';
import styles from '@/app/home-editorial.module.css';
export function StoryList({items=stories}:{items?:readonly(typeof stories)[number][]}) {
 return <div className={styles.storyList}>{items.map(story=><Link className={styles.storyRow} href={`/news/${story.slug}`} key={story.slug}><div className={styles.storyThumb}>{story.image?<Image src={`/images/${story.image}.webp`} alt="" fill sizes="(max-width:767px) 88px, 140px"/>:<span className={styles.typeArtwork} aria-hidden="true">Aa</span>}</div><div><div className={styles.storyMeta}><span>Insight</span><span>{story.date}</span></div><Heading as="h3" scale="compact" language="ko">{story.title}</Heading><Body size="small" className={styles.storySummary}>{story.summary}</Body></div></Link>)}</div>;
}
