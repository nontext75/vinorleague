# vinorleague 디자인 시스템

2026-09-28. 화면 예시: /design-system.

## 타이포그래피

헤딩과 본문 두 계열만 사용한다. 영문 헤딩은 Poppins, 본문은 Inter Variable, 한글은 Pretendard다. 한글 본문은 keep-all로 단어가 중간에서 끊기지 않도록 한다.

| 계열 / 역할 | 크기 | 굵기 | 행간 | 공통 컴포넌트 |
|---|---|---|---|---|
| Heading / display | PC 102–216px, 모바일 60–126px | 400 | 0.84 | Heading scale=display |
| Heading / section | PC 40–92px, 모바일 28–52px | 400 | 1.12 | Heading scale=section |
| Heading / compact | 20–24px | 500 | 1.35 | Heading scale=compact |
| Body / regular | 15px | 400 | 1.85 | Body |
| Body / lead | 20–25px | 700 | 1.65 | Body size=lead strong |
| Body / small | 13px | 400 | 1.55 | Body size=small |
| Text action | 26px | 650 | 1.55 | TextLink |

크기는 src/app/globals.css의 --heading-* / --body-* / --link-* 변수에서 한 번만 정의한다. 타이포그래피를 바꾸려면 이 변수를 수정하고 메인과 서브페이지에서 같이 확인한다. 폰트 미리보기 슬라이더는 사용자 요청으로 제거했다.

## 레이아웃과 컴포넌트

컨테이너는 최대 1400px. 큰 화면 좌우 56px, 태블릿 32px, 모바일 20px의 기본 여백을 사용한다. 제목·설명·링크는 SectionHeader, 페이지 첫 제목은 PageIntro를 사용한다. 텍스트 링크는 TextLink, 폼의 실행 버튼은 Button, 버튼 링크는 ButtonLink로 구분한다.

프로젝트는 ProjectCard / ProjectGrid를 재사용한다. 이미지는 원본 비율을 유지하며 높이를 통일하지 않는다. masonry는 4/2/1열이고 첫 행은 좌우로 읽는다. 카드 사이 간격은 PC 48px, 모바일 36px이며 행 단위 계산 때문에 최대 7px 추가될 수 있다. 페이지별 카드 CSS를 만들지 않는다.

서비스는 ServicesSection과 AccordionItem, 글 목록은 StoryList, 회사 소개는 StatementSection, 고객사 로고는 ClientsSection을 사용한다. 폼 필드는 FormField로 감싸 이름과 필수 여부를 연결한다.

## 표현 원칙

바탕 #f5f5f5, 텍스트 #171717, 본문 보조색 #666, 구분선 #d2d2d2. 서비스 영역은 검정 바탕을 사용한다. 프로젝트는 컬러, 고객사 로고와 글 썸네일은 흑백이다. 히어로에는 영상·사진·장식 배경이 없다.

기본 편집이 먼저다. 새로운 스크롤 효과를 추가하기 전 정렬·정보 순서·읽기 흐름을 확인한다. 기존 메뉴와 아코디언의 짧은 동작만 유지하며 prefers-reduced-motion을 존중한다. 제목 옆 프로젝트 화살표, 번호, View project 오버레이, 버튼 박스 장식을 다시 넣지 않는다.

Pretendard 원본: https://github.com/orioncactus/pretendard/releases/tag/v1.3.9. public/fonts/OFL.txt에 라이선스가 있다. Poppins와 Inter는 @fontsource 패키지의 로컬 폰트 파일을 사용한다.
