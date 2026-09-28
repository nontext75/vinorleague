import { Hero } from '@/components/home-motion';
import { HomeScrollMotion } from '@/components/home-scroll-motion';
import { WorkGallery } from '@/components/work-gallery';
import { StatementSection, ServicesSection } from '@/components/editorial-sections';
import { SectionHeader } from '@/components/editorial';
import { StoryList } from '@/components/story-list';
import { stories } from '@/lib/content';
import styles from './home-editorial.module.css';
export default function Home() {
  return (
    <div className={`editorial-home ${styles.home}`}>
      <HomeScrollMotion />
      <Hero />
      <StatementSection />
      <section className={styles.experience} id="work" aria-labelledby="experience-title">
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
      </section>
      <ServicesSection />
      <section className={`${styles.insights} container`} aria-labelledby="insights-title">
        <SectionHeader
          className={styles.sectionIntro}
          id="insights-title"
          title={<>Ideas &<br />Insights</>}
          description={<>브랜드와 제품, 디자인을 바라보는 관점.<br />일하며 발견한 생각을 나눕니다.</>}
          href="/news"
          label="View all stories"
        />
        <StoryList items={stories.slice(0, 3)} />
      </section>
      {/* The shared footer completes the sixth section: project inquiry and wordmark. */}
    </div>
  );
}
