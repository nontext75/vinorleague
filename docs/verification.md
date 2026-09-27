# 메인 리뉴얼 확인 결과 — 2026-09-28

- `npm run check`, `npm run build` 통과.
- 화면 너비 320 / 390 / 768 / 1440 / 1917px에서 가로 넘침, 이미지 누락 없음.
- 마지막 제목 수정: 최대 216px, 행간 0.9. 모든 검사 너비에서 세 줄 유지 및 우측 여유 확인. 데스크톱/모바일 캡처 육안 검수 완료.
- 포트폴리오 All 6 / Digital 5 / Character 1 필터와 이미지/목록 전환 정상.
- 서비스 설명 펼침, 모바일 메뉴 열기 및 Escape 닫기 정상.
- 데스크톱/모바일 영상 재생과 일시정지 정상. 모션 줄이기 설정 시 포스터 표시.
- 메인 내부 링크 14개 HTTP 200 확인. 빌드와 개발 서버 동시 사용 중 발생했던 개발 캐시 오류는 서버 재시작 후 해소했다.
- 요청한 프로젝트 오버레이/화살표, Studio 눈썹 제목, 푸터 대형 화살표 제거 확인. 고객사 로고 비율과 서비스 본문 줄바꿈 확인.
- 새로 불러온 메인 페이지 JavaScript 오류 없음.

최종 캡처: `output/playwright/final-title-tight-1917.png`, `final-title-tight-390.png`, `final-work.png`, `final-work-list.png`, `final-method-title.png`, `final-mobile-services.png`, `final-mobile-logos.png`. 캡처와 브라우저 점검 스크립트는 로컬 `output`에 보관하며 Git에는 포함하지 않는다.

아래는 이전 초안의 확인 기록이다.

# 초안 확인 결과

메인 기획 반영 후 재확인: 빌드 통과. 1440px / 390px 가로 넘침 없음, 프로젝트 6개와 고객사 28곳 표시, 로딩된 이미지 누락 없음. `output/playwright/concept-1440.png`, `concept-390.png`에 전체 화면 기록. 첫 화면은 브라운·핑크 타이포그래피 콘셉트 초안이며 대표 사진은 공유 사이트의 기존 임시 이미지를 사용.

확인일: 2026-09-27. 로컬 http://127.0.0.1:3000, Playwright Chromium.

- `npm run build` 통과. 프로젝트 8개·스토리 10개 상세 페이지 생성 확인.
- `npm run check` 통과.
- 홈 너비 360 / 390 / 768 / 1440px에서 가로 넘침 없음, H1 한 개.
- 모바일 메뉴 열기와 Escape 닫기 정상.
- 서비스 설명 펼치기 정상.
- 분야 필터: All 8 / Digital 5 / Branding 1 / Character 1 / Editorial 1.
- 홈·작업·소개·글·문의 및 모든 상세 주소 23개 HTTP 200.
- 문의 필수 입력 누락 차단, 올바른 입력 통과. 메일 발송은 실행하지 않음.
- 모션 줄이기 설정 시 자동 스크롤 동작 확인.
- 검사 중 페이지 JavaScript 오류 0건.
- 전체 화면의 지연 로딩 이미지를 스크롤하여 불러온 뒤 PC/모바일 육안 확인.

캡처: `output/playwright/home-desktop.png`, `home-mobile.png`, `mobile-first-screen.png`.
최종 고해상도 작업 이미지 및 전체 글 본문 이관 범위는 `site-plan.md` 참조.
