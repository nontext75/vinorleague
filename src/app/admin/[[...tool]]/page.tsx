import type { Metadata, Viewport } from 'next';
import { NextStudio } from 'next-sanity/studio';
import { metadata as studioMetadata, viewport as studioViewport } from 'next-sanity/studio';
import config from '../../../../sanity.config';
import styles from './admin.module.css';

export const dynamic = 'force-static';
export const metadata: Metadata = { ...studioMetadata, title: { absolute: '포트폴리오 관리자' } };
export const viewport: Viewport = studioViewport;

export default function AdminPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <div className={styles.shell} data-admin-root>
        <section className={styles.setup}>
          <p className={styles.kicker}>VINORLEAGUE · PORTFOLIO</p>
          <h1>포트폴리오 관리자</h1>
          <p className={styles.lead}>프로젝트 정보와 이미지를 사이트 코드 수정 없이 관리할 수 있습니다.</p>
          <div className={styles.steps}>
            <h2>관리자 연결 준비</h2>
            <ol>
              <li><a href="https://www.sanity.io/manage" target="_blank" rel="noreferrer">Sanity 프로젝트</a>를 만든 뒤 Project ID를 확인합니다.</li>
              <li>프로젝트 루트의 <code>.env.local</code>에 Project ID와 dataset을 입력합니다.</li>
              <li>개발 서버를 다시 시작하고 이 주소를 열면 관리자 편집기가 나타납니다.</li>
            </ol>
            <pre>NEXT_PUBLIC_SANITY_PROJECT_ID=프로젝트_ID{ '\n' }NEXT_PUBLIC_SANITY_DATASET=production</pre>
            <p className={styles.note}>현재 포트폴리오 8개는 연결 후 가져오기 명령 한 번으로 관리자에 옮기도록 준비되어 있습니다.</p>
          </div>
          <a className={styles.back} href="/work">사이트 포트폴리오 보기 ↗</a>
        </section>
      </div>
    );
  }

  return <div className={styles.shell} data-admin-root><NextStudio config={config} /></div>;
}
