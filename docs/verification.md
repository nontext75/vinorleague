# 화면 검수 — 2026-09-28

## 정적 디자인 기준

Poppins 헤딩 / Inter 본문 / Pretendard 한글, 영상·배경 제거, 공통 컴포넌트와 masonry 리스트를 적용한 기준이다. 사용자가 이 상태를 먼저 커밋하고 스크롤 액션을 추가하도록 요청했다.

- npm run check 통과.
- Playwright로 320 / 390 / 768 / 1381 / 1627 / 1917px, 8개 경로의 48개 조합 확인. HTTP 200, H1 한 개, 가로 넘침·undefined 클래스·로딩 완료 이미지 오류 없음.
- 경로: /, /work, /studio, /news, /contact, /work/mongdang, /news/design-principles, /design-system.
- 메인 영상 0, 히어로 이미지 0, 임시 폰트 패널 0.
- 히어로 설명과 스튜디오 핵심 문장이 25px / 700 / 행간 1.65로 일치. 1627px에서 강제 줄바꿈 없이 한 줄.
- 서비스 두 문구의 크기·굵기 일치. 고객사 로고 비율 보정 유지.
- 메인 TextLink 모두 26px, 메뉴 16px. 프로젝트 이미지에 grayscale 필터 없음. 카드 번호·상단 라인·화살표 삭제.
- Work 필터: All 8 / Digital 5 / Branding 1 / Character 1 / Editorial 1. 선택 상태 및 카드 수 변경 확인.
- 서비스 펼침·닫힘, 모바일 메뉴 열기 및 Escape 닫기 확인.
- 문의 폼: 필수 항목 미입력 시 유효하지 않음, 이름·이메일·10자 이상의 프로젝트 내용 입력 시 유효함. 실제 메일 전송 없음.
- 브라우저 pageerror 없음. 파일 분리 도중의 일시적인 HMR import 오류는 import 수정 뒤 해소했다.

PC·모바일 캡처와 점검 스크립트는 output/playwright/final-*에 있다. output은 Git 제외. 긴 화면 캡처의 일부 lazy 이미지가 로드되지 않은 경우, 최종 육안 확인에서는 스크롤하여 이미지를 로드한 뒤 다시 캡처한다.

## 최종 상태

사용자의 최신 요청에 따라 Motto 분석을 먼저 진행하고 추가 적용을 중단했다. 스크롤 시안에서 긴 고정 구간과 완료 뒤 opacity가 0으로 돌아가는 오류를 확인하여 output/scroll-draft에 보관했고, 화면은 정적 기준 364fbbc로 복원했다.

복원한 소스로 npm run check 및 npm run build 통과. 27개 정적 페이지 생성. 개발 서버는 빌드 동안 종료하고 127.0.0.1:3000에서 다시 시작한다. 다른 프로젝트의 서버는 종료하지 않았다.

분석 범위와 실시간 접속 제한은 docs/MOTTO-ANALYSIS.md에 기록했다. 이후 모션은 사용자의 후속 요청 전까지 다시 적용하지 않는다.
