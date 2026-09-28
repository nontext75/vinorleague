import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Reveal } from '@/components/reveal';
import { WorkGallery } from '@/components/work-gallery';
import { Hero, Manifesto, ServiceList } from '@/components/home-motion';
import { stories, clients } from '@/lib/content';
import logoMetrics from '@/lib/client-logo-metrics.json';
import styles from './home-editorial.module.css';

export default function Home() {
  return <div className={`editorial-home ${styles.home}`}>
    <Hero />
    <section className={`${styles.philosophy} container`} aria-labelledby="philosophy-title">
      <div className={styles.philosophyGrid}>
      <div><Manifesto />
      <div className={styles.philosophyBody}><div><p className={styles.philosophyLead}>우리는 본질적인 가치에 집중하고, 그 위에 아름다움을 더합니다.</p><p>빠르게 변하는 시대에도 오래 남을 가치를 찾습니다.<br />구조와 경계를 넘어, 아이디어가 가진 가능성을 디자인으로 펼칩니다.</p></div><Link className={styles.studioLink} href="/studio">스튜디오 소개</Link></div>
      </div></div>
    </section>
    <section className={styles.experience} id="work" aria-labelledby="experience-title">
      <div className={`container ${styles.workHeading}`}><h2 id="experience-title">Experience<span>(06)</span></h2><div><p>제품의 방향부터 인터페이스와 브랜드까지. 생각을 실제 경험으로 옮긴 작업들입니다.</p><Link className={styles.studioLink} href="/work">전체 작업 보기</Link></div></div>
      <WorkGallery />
    </section>
    <section className={`${styles.method} ${styles.methodRevised}`} aria-labelledby="method-title"><div className={`container ${styles.methodLayout}`}>
      <div className={styles.methodHeading}><Reveal><h2 id="method-title">Always there.<span>From first idea<br />to final detail.</span></h2></Reveal></div><div className={styles.methodEditorial}>
      <div className={styles.methodBody}><p><span>시작할 때의 방향 설정부터 출시 이후의 개선까지 함께합니다.</span><span>UI/UX, 브랜딩, 제품 디자인의 경험을 바탕으로 AI를 기획과 탐색에 활용하며, 브랜드에 맞는 경험을 구체화합니다.</span></p><div className={styles.methodLinks}><Link className={styles.studioLink} href="/studio">서비스 알아보기</Link></div></div>
      <ServiceList /></div>
    </div></section>
    <section className={`${styles.clients} container`} aria-labelledby="clients-title"><div className={styles.sectionIntro}><h2 id="clients-title">Clients we’ve<br />partnered with.</h2><p>다양한 산업의 팀들과 함께 전략, 디자인, 꾸준한 개선으로 오래가는 가치를 만듭니다.</p></div>
      <div className={styles.logoGrid}>{clients.map(client => { const size = logoMetrics[client.file as keyof typeof logoMetrics]; return <div className={styles.logoCell} key={client.file}>{client.file === 'lg-cns' ? <div className={styles.combinedLogo}><span className={styles.logoMark}><Image src="/clients/normalized/lg-cns-mark.svg" alt="" fill sizes="70px" /></span><span className={styles.logoWord}><Image src="/clients/normalized/lg-cns-wordmark.svg" alt={client.name} fill sizes="53px" /></span></div> : <span className={styles.logoArtwork} style={{ width: size.width, height: size.height }}><Image src={`/clients/normalized/${client.file}.svg`} alt={client.name} fill sizes="142px" /></span>}</div>; })}</div>
    </section>
    <section className={`${styles.insights} container`} aria-labelledby="insights-title"><div className={styles.sectionIntro}><h2 id="insights-title">Ideas &<br />Insights</h2><p>브랜드와 제품, 디자인을 바라보는 관점.<br />일하며 발견한 생각을 나눕니다.</p><Link className="text-link" href="/news">View all stories <ArrowUpRight size={19} /></Link></div>
      <div className={styles.storyList}>{stories.slice(0, 3).map(story => <Link href={`/news/${story.slug}`} className={styles.storyRow} key={story.slug}><div className={styles.storyThumb}>{story.image ? <Image src={`/images/${story.image}.webp`} alt="" fill sizes="(max-width: 767px) 88px, 150px" /> : <span className={styles.typeArtwork} aria-hidden="true">Aa</span>}</div><div><div className={styles.storyMeta}>Insight <span>{story.date}</span></div><h3>{story.title}</h3><p className={styles.storySummary}>{story.summary}</p></div><ArrowUpRight size={25} weight="light" /></Link>)}</div>
    </section>
  </div>;
}
