# vinorleague 작업 인계

최종 갱신: 2026-09-28 · 작업 폴더: `E:\Work\vinorleague`

## 현재 상태

메인페이지의 최신 디자인 피드백을 반영하고 브라우저 검수까지 완료했다. 사용자는 **작업 종료 후 handoff 작성과 푸시**를 요청했다. 이번 상태를 `origin/master`에 저장하고 멈춘다. 이후 작업은 새 요청에 맞춰 진행한다.

- 로컬: http://127.0.0.1:3000 (`npm run dev`)
- 저장소: https://github.com/nontext75/vinorleague
- 브랜드 가칭: **vinorleague**
- 원래 회사 사이트: https://vinus.co.kr/index.php
- 콘텐츠 기준: https://vinuspread.vercel.app/
- 메인만 새 디자인으로 작업했다. 기존 상세 페이지와 문의 폼은 유지한다.

## 최신 피드백과 반영 사항

최신 추가 수정: 스튜디오 한국어 핵심 문장, Experience 설명, Clients 설명의 강제 줄바꿈을 제거했다. 1381px과 1917px에서는 각각 한 줄이다. 작은 화면에서는 자연스럽게 줄바꿈한다. 서비스 제목은 `Always there.`와 `From first idea / to final detail.` 모두 같은 글자 크기이며, 소개 글 → 서비스 버튼 → 전체 폭 서비스 목록 순으로 세로 배치한다. 320/390/768/1381/1917px 가로 넘침 없음과 제목 크기 일치를 확인했고 `npm run check`를 통과했다.

1. **스튜디오 소개 레이아웃**: 영문 선언문을 전체 폭에 배치하고, 한국어 핵심 문장과 설명을 하나의 읽기 흐름으로 묶었다. 소개 버튼은 같은 영역의 하단에 정렬한다.
2. **Experience 헤더**: 큰 제목, 설명, 전체 작업 보기 버튼, 필터 순으로 위계를 다시 잡았다.
3. **포트폴리오**: 원격 커밋 `f7e9f84`를 pull하여 현재는 6개 프로젝트를 4열 그리드로 표시한다. 이전 Explore/Overview 미리보기 구성은 현재 사용하지 않는다. 프로젝트 목록도 같은 커밋에서 4열 디자인으로 변경됐다.
4. **서비스 영역**: 검정 배경에 같은 크기의 전체 폭 제목을 배치하고, 소개 글과 서비스 목록을 세로로 이어 배치한다. 본문은 문장 단위로 줄바꿈한다.
5. **푸터**: 메인에서 Contact 소개 문장과 연락처 4열을 제거했다. 큰 문의 문구 아래에 `/contact`로 연결되는 **프로젝트 의뢰하기** 버튼을 추가했다. 다른 경로의 기존 푸터는 유지한다.
6. **히어로 영상**: 회전하는 금속 리본은 사용자가 시상식 트로피 같다고 지적하여 교체했다. 새로운 영상은 **선 → 그리드와 글자 → 아이덴티티 → 실제 인터페이스 → 프로젝트 모음 → 브랜드**의 18초 디자인 과정이다. 실제 기존 포트폴리오 이미지와 직접 제작한 타이포그래피 모션을 사용했다.

## 유지할 결정

- 전체 편집은 흑백. 히어로 영상만 컬러를 허용한다.
- 히어로 문구는 `We design / sustainable / growth.` 세 줄. 최대 216px, 행간 0.9. 우측 글자 잘림을 방지하는 여백을 유지한다.
- 고객사 28개 로고는 원본 비율과 실제 그림 영역에 맞춰 보정했다.
- 프로젝트 이미지 위 View project 오버레이, 제목 옆 화살표, Studio 눈썹 제목, 푸터 대형 화살표를 다시 넣지 않는다.
- 사용자는 단순한 확대/회전이나 같은 크기 카드 반복을 선호하지 않는다. 콘텐츠와 관련 있는 모션과 편집 구성이 중요하다.
- 쉬운 한국어로 짧게 설명하고 불필요한 승인 질문을 하지 않는다.
- 문의 폼은 **mailto로 메일 초안을 여는 방식**이다. 서버 접수나 저장 기능이 있는 것처럼 설명하지 않는다.

## 주요 파일

- `src/app/page.tsx` — 메인 콘텐츠와 섹션 구조.
- `src/app/home-editorial.module.css` — 메인 편집과 반응형. 하단에 최신 편집 수정 규칙이 있다. 과거 사용하지 않는 갤러리 규칙도 남아 있으므로 향후 정리는 실제 사용 여부를 확인한다.
- `src/app/editorial-theme.css` — 메인 흑백 테마, 헤더, 푸터.
- `src/components/home-motion.tsx` — Hero, Manifesto, ServiceList.
- `src/components/hero-video.tsx` — 영상 소스 선택, 재생 제어, 화면 밖 정지, 모션 줄이기 대응.
- `src/components/work-gallery.tsx` 및 `.module.css` — 메인 4열 프로젝트 그리드.
- `src/components/footer.tsx` — 메인에서는 간결한 문의 푸터, 다른 경로에서는 기존 푸터.
- `public/clients/normalized/`, `src/lib/client-logo-metrics.json` — 비율 보정 로고.
- `src/lib/content.ts` — 기존 프로젝트와 글, 서비스 콘텐츠.

## 현재 사용 중인 영상

- `public/videos/design-story-desktop.mp4` — 1600×1000, 18초, 약 1.46MB.
- `public/videos/design-story-mobile.mp4` — 720×960, 18초, 약 1.17MB.
- `public/images/design-story-poster.webp` — 재생 전/모션 줄이기용 정지 화면.
- 제작 원본: `scripts/design-story-film.html`.
- 렌더 서버: `node scripts/serve-design-story.mjs` → 127.0.0.1:4179.
- 프레임 생성: `scripts/render-design-story.mjs`. Playwright와 Chrome이 필요하다. `PLAYWRIGHT_MODULE`에 설치된 Playwright 모듈 경로를 지정하거나 로컬에 설치한다.
- 인코딩: `python scripts/encode-design-story.py`. `imageio-ffmpeg`가 필요하며 현재 로컬 도구 경로는 `output/tools`다.
- 포스터는 `output/design-story-frames/0180.png`를 Sharp로 WebP 변환했다.
- 웹사이트 실행에는 위 제작 도구가 필요 없다. 완성된 MP4/WebP만 사용한다.
- 이전 `cinematic-*`, `growth-*` 영상과 관련 스크립트는 과거 시안이며 현재 메인에서 참조하지 않는다.

## 확인 결과

- `npm run check`, `npm run build` 통과. 26개 페이지 생성.
- 320 / 390 / 768 / 1440 / 1917px에서 가로 넘침, 깨진 이미지, `undefined` 클래스 없음.
- Explore 마우스/클릭/방향키 선택, 이전/다음, 필터 6/5/1, Overview 6개 표시 확인.
- 모바일 선택 시 미리보기로 이동 확인.
- 영상 18초 재생, 일시정지/재개, 화면 밖 일시정지, 모바일 소스 전환 확인.
- 모션 줄이기 설정 시 영상 없이 포스터 표시.
- 서비스 펼침과 푸터 삭제/문의 버튼 확인.
- 브라우저 JavaScript 오류 없음. PC/모바일 실제 캡처 육안 검수 완료.
- 상세 기록: `docs/verification.md`.
- 로컬 캡처: `output/playwright/approved-*.png`, 결과: `output/playwright/revision-report.json`. `output`은 Git 제외.

## 작업 재개 시

먼저 최신 화면과 이 문서를 확인한다. 사용자의 새 피드백을 우선하며, 메인 밖의 페이지나 배포를 자동으로 확장하지 않는다. 빌드와 개발 서버를 동시에 사용하면 Next 개발 캐시가 충돌한 적이 있어, 최종 빌드는 개발 서버를 내리고 수행한 뒤 다시 시작했다.
