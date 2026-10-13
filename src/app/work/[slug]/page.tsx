import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { ContentBlocks } from '@/components/content-blocks';
import { PageIntro } from '@/components/editorial';
import { projects as localProjects } from '@/lib/content';
import { workDetails } from '@/lib/content-details';
import { getWorkDetail, getWorkProjects, legacyMedia } from '@/lib/work-content';
import styles from './work-detail.module.css';
import { JsonLd } from '@/components/json-ld';
import { pageMetadata, makeDescription, breadcrumbData } from '@/lib/seo';

export function generateStaticParams() {
  return localProjects.map(({ slug }) => ({ slug }));
}

export const dynamicParams = true;
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getWorkProjects();
  const project = projects.find(item => item.slug === slug);

  if (!project || !await getWorkDetail(slug)) notFound();

  return pageMetadata({
    path: `/work/${project.slug}`,
    title: project.seoTitle || `${project.title}${project.subtitle ? ` | ${project.subtitle}` : ''}`,
    description: makeDescription(project.seoDescription || project.overview),
    image: project.hero,
  });
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = await getWorkProjects();
  const index = projects.findIndex(project => project.slug === slug);
  if (index < 0) notFound();

  const project = projects[index];
  const nextIndex = (index + 1) % projects.length;
  const next = projects[nextIndex];
  const detail = await getWorkDetail(slug);
  if (!detail) notFound();

  const media = detail.media ?? (workDetails[slug]?.media ?? legacyMedia(slug));
  const mediaPerSection = media.length ? Math.ceil(media.length / detail.sections.length) : 0;

  return (
    <article className={styles.detail}>
      <JsonLd data={breadcrumbData([
        { name: '홈', path: '/' },
        { name: 'Experience', path: '/work' },
        { name: project.title, path: `/work/${project.slug}` },
      ])} />
      <div className={`container ${styles.frame}`}>
        <Link className={styles.backLink} href="/work" data-reveal="copy">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>All projects</span>
        </Link>
        <PageIntro className={`page-heading ${styles.intro}`} title={project.title} kicker={project.category} subtitle={project.subtitle} />

        <section className={styles.meta} aria-label="Project information" data-reveal-children>
          {project.client && <dl><dt>Client</dt><dd>{project.client}</dd></dl>}
          <dl><dt>{project.period ? 'Period' : 'Year'}</dt><dd>{project.period || project.year}</dd></dl>
          <dl><dt>Category</dt><dd>{project.category}</dd></dl>
        </section>

        <header className={styles.hero} data-character={project.category === 'Character'} data-reveal="image">
          <Image
            className={styles.heroImage}
            src={project.hero.src}
            alt={project.hero.alt}
            fill
            preload
            sizes="(max-width: 767px) calc(100vw - 48px), calc(100vw - 112px)"
            style={{ objectPosition: project.hero.position }}
          />
        </header>
      </div>

      <section className={styles.overview} aria-labelledby="project-overview-title" data-reveal-children>
        <p id="project-overview-title" className={styles.overviewLabel}>Overview</p>
        <p className={styles.overviewText}>{project.overview}</p>
      </section>

      <div className={styles.story}>
        {detail.sections.map((section, sectionIndex) => {
          const start = sectionIndex * mediaPerSection;
          const sectionMedia = media.slice(start, start + mediaPerSection);

          return (
            <div className={styles.storyGroup} key={section.heading}>
              <section className={styles.section} data-reveal-children>
                <h2 className={styles.sectionTitle} data-reveal="line">{section.heading}</h2>
                <div className={styles.sectionContent} data-reveal-children>
                  <div className={styles.paragraphs} data-reveal-children>
                    {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </div>
              </section>
              {sectionMedia.length > 0 && (
                <div className={styles.media}>
                  <ContentBlocks blocks={sectionMedia} project eagerFirst={sectionIndex === 0} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Link className={`container ${styles.nextProject}`} href={`/work/${next.slug}`} aria-label={`Next project: ${next.title}`} data-reveal-children>
        <div className={styles.nextIndex}>
          <span>Next project</span>
          <span>{String(nextIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
        </div>
        <div className={styles.nextVisual} aria-hidden="true">
          <Image src={next.image.src} alt="" fill sizes="(max-width: 767px) calc(100vw - 48px), 300px" unoptimized={next.image.animated} />
        </div>
        <div className={styles.nextCopy}>
          <p>{next.category}</p>
          <h2>{next.title}</h2>
        </div>
        <ArrowUpRight size={28} aria-hidden="true" />
      </Link>
    </article>
  );
}
