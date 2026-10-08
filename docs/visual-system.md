# 사이트 비주얼 시스템

페이지마다 같은 스타일을 복사하지 않고 아래 공통 파일과 컴포넌트를 기준으로 수정합니다.

## 공통 기준

- `src/app/globals.css`: 색상, 폰트 크기, 페이지 폭과 여백, 모션 속도·거리의 기준값입니다. 여러 페이지의 값을 바꿀 때 먼저 여기의 토큰을 수정합니다.
- `src/app/editorial-theme.css`: 공통 헤더, 푸터와 에디토리얼 스타일을 관리합니다.
- `src/components/editorial.tsx`: `PageIntro`와 `SectionHeader`를 통해 페이지 제목과 섹션 제목의 구조를 맞춥니다.
- `src/components/project-grid.tsx`, `src/components/project-card.tsx`, `src/components/work-gallery.module.css`: 메인과 작업 목록이 같은 프로젝트 카드를 공유합니다. 열 수와 카드 간격은 공통 갤러리 스타일에서 조절합니다.
- `src/components/reveal-motion.tsx`: 서브페이지의 제목, 본문, 카드, 이미지를 한 번만 순서대로 보여줍니다. `src/components/home-scroll-motion.tsx`는 메인 전용 스크롤 연출을 담당하며 같은 CSS 모션 토큰을 사용합니다.
- `--motion-home-section-hold`: 메인 각 장면이 다 보여진 뒤 다음 장면으로 넘어가기 전의 정지 구간입니다. 화면 높이에 대한 비율로 지정합니다.
- 화면 문구는 문장이 끝나는 지점에서 개행합니다. 문장 중간을 임의로 끊지 말고, 모바일에서는 어색한 한두 단어 줄이 생기지 않도록 줄바꿈을 점검합니다.

## 새 페이지를 만들 때

1. 기본 폭과 상하 여백에는 `container page-content`를 사용합니다.
2. 페이지 제목은 `PageIntro`, 섹션 제목은 `SectionHeader`를 사용합니다.
3. 순차 등장 효과는 `data-reveal-children`을 반복 묶음에, 개별 요소는 `data-reveal="line|copy|card|image"`를 붙여 적용합니다.
4. 페이지별 CSS에는 고유한 콘텐츠 배치만 두고, 색상·폭·타이포그래피·모션 값은 공통 토큰을 우선 사용합니다.
5. 모션은 `prefers-reduced-motion` 설정과 키보드 포커스 상태를 계속 지원합니다.
