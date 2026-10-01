# vinorleague 작업 인계

최종 갱신: 2026-09-29 · 작업 폴더: D:\Work\Vinorleague · 브랜치: master

## 2026-09-29 — 스크롤 장면 전환 버전 저장

- Motto 녹화를 분석한 뒤, 사용자가 원본 복제 대신 대안 구현을 선택. 첫 화면은 제목의 좌우 퇴장 → 중앙 이미지 펼침 → 소개 패널이 이미지를 덮는 순서이며, 기존 `growth-sculpture.webp`를 임시 비주얼로 사용.
- `home-scroll-motion.tsx`의 일시 정지된 애니메이션 재생 위치를 스크롤 거리로 직접 제어. 정지·역스크롤 대응, 키보드 포커스 복구, reduced-motion/JS 비활성 시 일반 문서 흐름 지원. 전체 섹션 스크롤 스냅은 제거하고 작업 목록의 기본 스크롤을 유지.
- 화면 높이에 비례해 글자를 축소하던 규칙 제거. 짧은 화면에서는 내용을 읽을 추가 스크롤 거리를 확보한 다음 전환. 홈 좌우 여백은 데스크톱 96px/태블릿 48px/모바일 24px 이상, 최대 컨테이너 1400px. 홈 작업 카드는 데스크톱 2열/모바일 1열, 행 간격 96px/64px로 확대하고 이미지 `sizes` 수정.
- 홈 푸터는 어두운 배경 위에 전체 콘텐츠가 드러나는 스크롤 연동 전환 적용.
- `npm run check`, `npm run build`, `git diff --check` 통과. `scripts/verify-home-scenes.cjs`로 320/390/768/1440/2540px 및 짧은 화면, 정지·역스크롤, 키보드, 페이지 이동, reduced-motion, JS 비활성 확인. Playwright가 외부에 설치된 경우 모듈 경로를 첫 인자로 전달. 검수 캡처는 Git 제외된 `output/home-scenes/`에 저장.
- 아래 타이밍 조정 기록은 이전 중간 단계이며, 현재 진입·퇴장 모션은 시간 기반 자동 재생을 사용하지 않음.

## 2026-09-29 — 메인 스크롤 인터랙션 타이밍 & 컨테이너 폭 수정

- 사용자가 "섹션별 인터랙션이 중간에 멈춘다"고 지적. 진단 결과 코드 자체는 정상 동작했지만 `home-scroll-motion.tsx`의 reveal duration/delay/stagger 값이 일반적인 스크롤 속도보다 훨씬 길어(최대 1.4초+) 실사용 시 텍스트·카드가 중간 opacity에서 멈춘 것처럼 보였음. Codex에게 위임해 duration을 대략 절반(0.5~0.7초대)으로, stagger gap도 축소. 어두운 서비스(.methodRevised) 섹션의 보조 텍스트 색상도 대비를 약간 높임(#909090→#aaa 등).
- 별개로 "메인/서브페이지 컨텐츠 폭이 다르다"는 지적 확인. `editorial-theme.css`의 `body:has(.editorial-home) .container { width:min(1600px,...) }` 규칙이 `.editorial-home` 래퍼가 있는 페이지(=홈)에서만 컨테이너를 1600px로 넓히고 있었음. 리팩터링으로 서브페이지들이 `.editorial-home` 래퍼를 더 이상 쓰지 않게 되면서 폭이 갈라진 것. `docs/design-system.md`에 명시된 "컨테이너 최대 1400px" 기준에 맞춰 해당 1600px 오버라이드를 제거.
- 두 수정 모두 브라우저에서 실제 스크롤 검증 완료, `npx tsc --noEmit` 통과.

## 최신 요청 — 분석 우선

사용자는 정적 디자인을 먼저 커밋하고 스크롤 시안을 요청했다. 정적 기준 커밋은 364fbbc다. 이후 Motto의 명확한 분석이 선행돼야 하며 적용하지 말라고 요청했고, 스크롤이 뻑뻑하다고 지적했다. 긴 고정 구간과 opacity 오류가 있는 시안은 output/scroll-draft에 보관하고 화면을 364fbbc로 복원했다. 현재는 추가 모션을 적용하지 않는다.

분석: docs/MOTTO-ANALYSIS.md. 현행 공개 문서와 공식 리브랜딩 자료를 조사했다. 실제 브라우저는 Cloudflare 403으로 차단됐으므로, 모션 시간·폰트 이름·라이브러리를 확인한 것처럼 서술하지 않는다.

## 현재 디자인

저장된 8763f15의 기본 편집을 기준으로 수정했다. 사용자는 과한 Motto 시안을 롤백했고, 기본 정렬과 위계를 먼저 정리한 뒤 인터랙션을 검토하기로 했다. 이 문서가 이전 영상·모션 기록보다 우선한다.

- 히어로: Design / sustainable / growth. 세 줄, 좌측 정렬. Poppins 400, 최대 216px, 행간 0.84. We와 Independent design studio 삭제.
- 히어로의 영상, 이미지 배경, 재생 버튼, 타이포 등장 효과를 모두 제거했다. 단색 바탕과 정적 타이포그래피만 사용한다.
- 히어로 하단 문구는 강제 줄바꿈 없이 이어 쓴다. 스튜디오 한국어 핵심 문장과 같은 Body lead 컴포넌트로 20–25px / 700 / 행간 1.65를 공유한다. PC에서 한 줄, 좁은 화면에서 자연스럽게 줄바꿈한다.
- 폰트: 헤딩 Poppins, 본문 Inter Variable, 한글 Pretendard. 모두 자체 호스팅한다. Outfit 및 임시 폰트 조정 패널은 삭제했다.
- 텍스트 버튼: 모든 TextLink를 26px / 650으로 통일했다. 테두리 없는 밑줄 링크이며, 스튜디오·서비스·작업·문의 링크가 같은 컴포넌트를 쓴다.
- Experience: 제목 위 15px, 설명 위 16px. 전체 작업 보기 링크는 설명 아래. 헤더와 카드 목록 사이 45px, 모바일 38px.
- 메인 6개와 Work 8개 프로젝트는 같은 ProjectGrid / ProjectCard를 쓴다. 이미지의 원래 비율에 따라 높이가 달라지는 masonry 배치, PC 4열·태블릿 2열·모바일 1열. 양쪽 모두 컬러 이미지. 번호·화살표·상단 구분선 삭제, 제목 20–24px.
- Work 필터는 박스 없는 텍스트 탭. 선택한 항목에만 밑줄, 카테고리별 개수 표시. 모바일에서 가로 스크롤한다.
- 서비스는 전체 폭의 세로 흐름. Always there.와 From first idea to final detail.이 같은 제목 크기를 공유한다. 소개 → 서비스 링크 → 공통 아코디언 순서.
- 헤더 메뉴 16px. 모든 페이지에 동일한 헤더·간결한 문의 푸터를 사용한다. 푸터 프로젝트 의뢰하기도 텍스트 버튼이다.
- 고객사 28개 로고는 기존 비율 보정을 유지한다. 연락처·주소·채용 정보는 ContactDetails에서 볼 수 있다.

## 공통 구현

- src/components/typography.tsx — Heading / Body. 크기와 굵기는 globals.css의 공통 변수에서 관리.
- actions.tsx — TextLink / ButtonLink / Button.
- editorial.tsx — SectionHeader / PageIntro.
- editorial-sections.tsx — StatementSection / ServicesSection / ClientsSection.
- project-card.tsx / project-grid.tsx — 카드, 원본 비율 이미지, 반응형 masonry. ResizeObserver로 이미지·폰트·화면 크기 변경에 맞춰 행 높이를 계산한다. JS 전에는 일반 그리드가 표시된다.
- filter-tabs.tsx — 공통 필터 탭. project-filter.tsx가 필터 상태를 관리한다.
- story-list.tsx — 메인과 Story의 동일한 글 목록.
- accordion-item.tsx — 서비스 펼침 항목. 기존 Motion 동작 및 모션 줄이기 대응.
- form-field.tsx / contact-details.tsx — 문의 폼의 필드와 연락처.
- CSS는 공통 globals.css, editorial-theme.css와 기존 편집/카드 모듈을 사용한다. 페이지별 CSS를 새로 만들지 않았다. 사용하지 않는 과거 시안과 중복 선언을 제거했다.

## 확인할 화면

- 로컬: http://127.0.0.1:3000
- 디자인 시스템: http://127.0.0.1:3000/design-system
- /work, /studio, /news, /contact 및 프로젝트·글 상세에 공통 스타일 적용.
- 디자인 시스템 설명: docs/design-system.md
- 검수 기록: docs/verification.md

## 기능과 작업 경계

문의 폼은 메일 앱에서 초안을 여는 mailto 방식이다. 서버 전송·접수·저장 기능은 없다. 실제 문의를 보내지 않고 브라우저 검증만 수행한다. 기존 프로젝트 8개·글 10개의 콘텐츠를 유지한다. 원문이 없는 글의 전체 내용을 새로 만들지 않는다.

과거 영상 파일과 scripts의 제작 도구는 기록으로 남아 있지만 페이지에서 불러오지 않는다. 영상 제거 요청을 되돌리지 않는다. 고정 스크롤·과한 확대/회전·전체 화면 타이포 실험을 다시 추가하지 않는다.

작업 완료 후 handoff 작성 및 push는 사용자가 이미 요청했다. 저장소: https://github.com/nontext75/vinorleague. main이 아니라 master 브랜치다. 최신 화면이 다르게 보이면 먼저 현재 브랜치·작업 폴더·3000 포트 프로세스를 확인한다. 다른 프로젝트의 서버를 종료하지 않는다. 빌드와 개발 서버는 동시에 실행하지 않는다.
