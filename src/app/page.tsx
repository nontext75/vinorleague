import { Hero } from '@/components/home-motion';
import Image from 'next/image';
import { HomeScrollMotion } from '@/components/home-scroll-motion';
import { WorkGallery } from '@/components/work-gallery';
import { StatementSection, ServicesSection } from '@/components/editorial-sections';
import { SectionHeader } from '@/components/editorial';
import { StoryList } from '@/components/story-list';
import { stories } from '@/lib/content';
import styles from './home-editorial.module.css';

const openingImages = [
  '/images/growth-sculpture.webp',
  '/images/studio-interior-modern.webp',
  '/images/studio.webp',
  '/images/story-colors.webp',
  '/images/cinematic-hero.webp',
];

export default function Home() {
  return (
    <div className={`editorial-home ${styles.home}`}>
      <HomeScrollMotion />
      <div className={styles.opening} data-opening>
        <div className={styles.openingStage} data-opening-stage>
          <Hero />
          <figure className={styles.openingVisual} data-opening-visual aria-hidden="true">
            {openingImages.map((src, index) => <span className={styles.openingFrame} data-opening-frame={index > 0 ? true : undefined} key={src}>
              <Image src={src} alt="" fill sizes="100vw" preload={index === 0} />
            </span>)}
          </figure>
        </div>
      </div>
      <div className={styles.statementPanel} data-statement-panel>
        <StatementSection />
      </div>
      <section className={styles.experience} id="work" aria-labelledby="experience-title">
        <div className={styles.experienceStage} data-experience-stage>
        <div className={styles.experienceContent} data-scene-content>
        <SectionHeader
          className={`container ${styles.workHeading}`}
          id="experience-title"
          title="Experience"
          layout="row"
          description="제품의 방향부터 인터페이스와 브랜드까지. 생각을 실제 경험으로 옮긴 작업들입니다."
          href="/work"
          label="전체 작업 보기"
        />
        <WorkGallery />
        <div className={`container ${styles.experienceProgress}`} aria-hidden="true">
          <span data-experience-current>01</span>
          <span className={styles.experienceProgressTrack}><span data-experience-progress /></span>
          <span data-experience-total />
        </div>
        </div>
        </div>
      </section>
      <div className={styles.methodPanel} data-chapter-panel>
        <ServicesSection />
      </div>
      <div className={styles.insightsPanel} data-chapter-panel>
      <section className={`${styles.insights} container`} aria-labelledby="insights-title">
      <div className={styles.insightsContent} data-scene-content>
        <SectionHeader
          className={styles.sectionIntro}
          id="insights-title"
          title={<>Ideas &<br /> Insights</>}
          description={<>브랜드와 제품, 디자인을 바라보는 관점.<br />일하며 발견한 생각을 나눕니다.</>}
          href="/news"
          label="View all stories"
        />
        <StoryList items={stories.slice(0, 3)} />
      </div>
      </section>
      </div>
      {/* The shared footer completes the sixth section: project inquiry and wordmark. */}
    </div>
  );
}
