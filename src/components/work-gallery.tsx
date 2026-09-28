import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { projects } from '@/lib/content';
import styles from './work-gallery.module.css';

const selected = projects.slice(0, 6);
const images: Record<string, string> = {
  mongdang: '/images/details/mongdang-0.webp',
  shinhan: '/images/details/shinhan-0.webp',
  crowd: '/images/details/crowd-0.webp',
  macadamia: '/images/details/macadamia-0.webp',
  donga: '/images/details/donga-0.webp',
};

const picture = (project: (typeof selected)[number]) =>
  images[project.image] || `/images/${project.image}.webp`;

export function WorkGallery() {
  return (
    <ol className={`container ${styles.gallery}`} aria-label="주요 프로젝트">
      {selected.map((project, index) => (
        <li className={styles.item} key={project.slug}>
          <article>
            <Link
              className={styles.project}
              href={`/work/${project.slug}`}
              aria-label={`${project.title} 프로젝트 보기`}
            >
              <div className={`${styles.visual} ${project.image === 'mongdang' ? styles.character : ''}`}>
                <Image
                  src={picture(project)}
                  alt={`${project.client} ${project.subtitle} 디자인`}
                  fill
                  sizes="(max-width: 619px) 92vw, (max-width: 1099px) 46vw, 24vw"
                />
              </div>
              <div className={styles.meta}>
                <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.category}>{project.category}</span>
                <span className={styles.arrow} aria-hidden="true">
                  <ArrowUpRight size={21} weight="light" />
                </span>
              </div>
              <h3>{project.title}</h3>
              <p className={styles.subtitle}>{project.subtitle}</p>
            </Link>
          </article>
        </li>
      ))}
    </ol>
  );
}
