import catalog from '@/data/vinus-catalog.json';
import workProjects from '@/data/vinus-work-projects.json';

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client: string;
  period: string;
  overview: string;
  seoTitle?: string;
  seoDescription?: string;
  sortOrder?: number;
  image: { src: string; width: number; height: number; animated: boolean; alt?: string };
  hero: { src: string; alt: string; position: string; width?: number; height?: number };
};
export const projects = workProjects as Project[];
export const stories = catalog.stories;

export const services = [
  { title: 'Product Strategy', subtitle: '올바른 질문에서 시작합니다.', text: '브랜드와 사용자를 살피고 프로젝트의 목표와 방향을 함께 정합니다.', tags: 'Discovery · Roadmap · AI Opportunity' },
  { title: 'Experience Design', subtitle: '쓰임이 좋은 경험을 만듭니다.', text: '웹과 앱에서 필요한 정보를 쉽게 찾고, 자연스럽게 다음 행동으로 이어지도록 설계합니다.', tags: 'UX/UI · Web · App' },
  { title: 'Brand Systems', subtitle: '오래 기억될 인상을 남깁니다.', text: '브랜드의 성격을 시각 언어로 풀어내고, 캐릭터와 콘텐츠에 일관되게 담습니다.', tags: 'Identity · Visual Direction · Content' },
  { title: 'Launch & Operation', subtitle: '공개한 뒤에도 함께합니다.', text: '운영과 분석을 통해 경험을 살피고, 필요한 부분을 꾸준히 개선합니다.', tags: 'CMS · SEO · Analytics' },
] as const;

export const clients = [
  { file: 'samsung', name: 'Samsung' }, { file: 'lg-cns', name: 'LG CNS' },
  { file: 'daekyo', name: '대교' }, { file: 'koscom', name: '코스콤' },
  { file: 'shinhan-financial-group', name: '신한금융그룹' }, { file: 'kepco', name: '한국전력' },
  { file: 'kt-alpha', name: 'KT alpha' }, { file: 'deloitte', name: 'Deloitte' },
  { file: 'hyundai', name: 'Hyundai' }, { file: 'lotte-rental', name: '롯데렌탈' },
  { file: 'nh-bank', name: 'NH농협은행' }, { file: 'ace', name: 'ACE' },
  { file: 'gymboree', name: 'Gymboree' }, { file: 'korean-re', name: 'Korean Re' },
  { file: 'sgi', name: 'SGI' }, { file: 'nepa', name: 'NEPA' },
  { file: 'k-shopping', name: 'K Shopping' }, { file: 'ajou-university', name: '아주대학교' },
  { file: 'think-big', name: '웅진씽크빅' }, { file: 'pulmuone', name: '풀무원' },
  { file: 'hunet', name: '휴넷' }, { file: 'hankook-tire', name: '한국타이어' },
  { file: 'chunjae-education', name: '천재교육' }, { file: 'korea-federation-of-banks', name: '은행연합회' },
  { file: 'yonsei-university-health-system', name: '연세의료원' }, { file: 'lotte', name: '롯데' },
  { file: 'bnk', name: 'BNK금융그룹' }, { file: 'samsung-heavy-industries', name: '삼성중공업' },
] as const;
