/** Shared by visible copy, metadata, and structured data. */
export const site = {
  name: 'vinorleague',
  description: 'vinorleague는 브랜드 전략, 웹·앱 UX/UI, 캐릭터와 디지털 경험을 만드는 디자인 스튜디오입니다. 방향 설정부터 출시 이후의 개선까지 함께합니다.',
};

export const pageContent = {
  home: { path: '/', title: '브랜드 전략·UX/UI 디자인 스튜디오', description: site.description },
  work: { path: '/work', title: '프로젝트 | 웹·앱 UX/UI와 브랜드 디자인', description: '웹·앱 UX/UI, 브랜딩, 캐릭터 디자인 프로젝트를 소개합니다. 각 작업의 의뢰 배경, 디자인 방향과 결과물을 살펴보세요.' },
  studio: { path: '/studio', title: '스튜디오 | 서비스와 작업 방식', description: '브랜드와 사용자를 살피는 전략 수립부터 웹·앱 UX/UI, 브랜드 시스템, 출시 이후 운영까지. vinorleague의 서비스와 일하는 방식을 소개합니다.' },
  news: { path: '/news', title: '이야기 | 디자인과 프로젝트 경험', description: '프로젝트 견적, 고객과의 협업, 캐릭터 개발 등 디자인 현장에서 겪은 경험과 생각을 나눕니다.' },
  contact: { path: '/contact', title: '문의 | 디자인 프로젝트 상담', description: '브랜드 전략, 웹·앱 UX/UI, 캐릭터 디자인 프로젝트를 문의하세요. 작업 분야, 일정과 예산을 정리해 이메일로 상담할 수 있습니다.' },
} as const;
