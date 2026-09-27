export const projects = [
  { slug: 'mongdang', title: 'Woongjin ThinkBig', subtitle: 'AI Education App Character', client: '웅진씽크빅', category: 'Character', image: 'mongdang', description: '아이들과 부모에게 친근하게 다가가는 교육 앱 캐릭터. 브랜드의 이야기를 담은 표정과 형태로 디지털 경험에 즐거움을 더합니다.' },
  { slug: 'shinhan-easy', title: 'Shinhan Easy', subtitle: 'Financial Education Platform', client: '신한', category: 'Digital', image: 'shinhan', description: '금융 교육 플랫폼의 UI 디자인. 웹과 모바일에서 교육 콘텐츠를 편하게 탐색할 수 있는 경험을 만듭니다.' },
  { slug: 'crowdsourcing-platform-crowd-oh', title: 'Crowd OH!', subtitle: 'Crowdsourcing Platform', client: 'Crowd OH!', category: 'Digital', image: 'crowd', description: '온라인 아웃소싱 플랫폼 Crowd OH!의 디지털 경험. 다양한 참여자와 프로젝트를 연결하는 플랫폼을 디자인합니다.' },
  { slug: 'macadamia-website', title: 'Daekyo Macadamia', subtitle: 'Learning Platform Website', client: '대교', category: 'Digital', image: 'macadamia', description: '대교 마카다미아 웹사이트. 서비스의 방향과 사용자의 흐름을 함께 고려한 UX/UI 디자인 프로젝트입니다.' },
  { slug: 'budongsan114-mediate-bizsolution', title: 'Budongsan114', subtitle: 'Mediate BIZsolution', client: '부동산114', category: 'Digital', image: 'budongsan', description: '부동산 중개 업무를 위한 B2B 솔루션. 업무에 필요한 정보를 읽고 다루기 쉽게 정리한 인터페이스입니다.' },
  { slug: 'donga-on-book', title: 'Dong-A OnBook', subtitle: 'Brand & Digital Platform', client: '동아출판', category: 'Digital', image: 'donga', description: '동아출판 온북의 브랜드와 디지털 플랫폼. 콘텐츠와 브랜드의 인상이 하나의 경험으로 이어지도록 디자인합니다.' },
  { slug: 'aliot-brand-identity', title: 'Aliot', subtitle: 'Brand Identity', client: 'Aliot', category: 'Branding', image: 'aliot', description: 'Aliot의 브랜드 아이덴티티. 브랜드가 전하는 메시지를 일관된 시각 언어로 정리합니다.' },
  { slug: 'the-frame-artstore-catalogue', title: 'The Frame', subtitle: 'Artstore Catalogue', client: '삼성', category: 'Editorial', image: 'frame', description: '삼성 The Frame 아트스토어 카탈로그. 작품과 제품의 이야기를 지면 위에 담아낸 편집 디자인입니다.' },
] as const;
export type Project = (typeof projects)[number];

export const stories = [
  { slug: 'brand-colors-by-instinct', title: '브랜드 컬러를 감으로 고르면 안 되는 이유', date: '2026.04.20', image: 'story-colors', summary: '좋아하는 색을 고르기 전에, 브랜드가 어떤 인상을 남길지 먼저 생각합니다. 분명한 기준이 있을 때 색은 브랜드의 언어가 됩니다.' },
  { slug: 'design-principles', title: '디자인 원칙이 없으면 생기는 일', date: '2026.05.22', image: 'story-principles', summary: '디자인 원칙은 판단의 이유를 설명해 줍니다. 취향에 따라 방향이 흔들리지 않도록, 팀이 함께 쓸 수 있는 기준을 세웁니다.' },
  { slug: 'ux-writing-single-button', title: '버튼 하나에서 시작하는 UX 라이팅', date: '2026.05.01', image: '', summary: '버튼에 쓰인 짧은 문장도 다음 행동을 바꿉니다. 사용자가 무엇을 해야 하는지 알 수 있도록, 작은 말부터 살펴봅니다.' },
  { slug: 'product-language-experience', title: '제품의 언어가 경험을 바꾸는 순간', date: '2026.06.04', image: '', summary: '명확한 문장은 지금 무슨 일이 일어났는지, 다음에는 무엇을 해야 하는지 알려줍니다.' },
  { slug: 'small-brand-system-scale', title: '작은 브랜드 시스템이 확장되는 방법', date: '2026.06.18', image: '', summary: '반복되는 디자인 결정을 모아 함께 쓰는 기준으로 만듭니다. 유용한 브랜드 시스템은 그렇게 시작됩니다.' },
  { slug: 'interface-hierarchy', title: '인터페이스의 위계는 어디에서 시작될까', date: '2026.07.02', image: '', summary: '정보에 순서를 부여하면 화면을 읽는 데 드는 수고가 줄어듭니다. 무엇을 먼저 보여줄지부터 정합니다.' },
  { slug: 'better-design-feedback', title: '디자인을 앞으로 움직이는 피드백', date: '2026.07.16', image: '', summary: '좋은 피드백은 개인의 취향보다 함께 정한 목표를 향합니다.' },
  { slug: 'practical-ai-design', title: '디자인에 AI를 들이는 현실적인 방법', date: '2026.08.01', image: '', summary: 'AI로 더 많은 가능성을 탐색하되, 어떤 결과가 좋은지 판단하는 기준은 사람이 세웁니다.' },
  { slug: 'service-details-trust', title: '서비스의 작은 디테일이 신뢰를 만드는 법', date: '2026.08.14', image: '', summary: '로딩, 오류 안내, 완료 메시지처럼 짧게 마주하는 순간들이 서비스에 대한 신뢰를 쌓습니다.' },
  { slug: 'visual-consistency-brand-memory', title: '일관된 디자인이 브랜드를 기억하게 하는 이유', date: '2026.08.28', image: '', summary: '다른 화면과 장소에서도 같은 시각 언어를 만나면, 사람들은 브랜드를 더 쉽게 알아봅니다.' },
] as const;

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
