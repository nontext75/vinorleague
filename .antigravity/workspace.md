# Workspace Rules — 캐릭터 굿즈 쇼핑몰 (가칭)

## Project Overview
- Type: E-commerce / 브랜드 쇼핑몰
- Platform: Web (모바일 우선 반응형)
- Core features: 메인 배너, 상품 목록/상세, 자체 결제 연동, 외부 스토어(스마트스토어, 크림) 연결 배너, 캐릭터 패밀리(Wani 등) 프로필, CMS 기반 상품 관리

## Tech Stack
- Framework: Next.js 14 (App Router)
- State management: Zustand
- Styling: Tailwind CSS
- Data fetching: React Query / Fetch API
- Auth: NextAuth (Phase 2 예정)
- DB / API: Shopify Storefront API 또는 자체 백엔드 연동 (CMS 등 결정 대기)

## Folder Structure
- `src/app/`: App Router 기반 페이지 라우팅
- `src/components/`: 공통 UI 및 피쳐 컴포넌트
- `src/lib/`: 유틸리티 및 라이브러리 설정
- `src/services/`: 외부 API(Shopify/Cafe24 등) 통신
- `src/store/`: 전역 상태 (Zustand)
- `src/types/`: TypeScript 인터페이스/타입

## Design System
- Component library: DaisyUI (Tailwind CSS 기반)
- Figma: 러프하게 MVP 구축 후 기획/디자인 점진적 고도화
- Token conventions: 파스텔톤, 둥글둥글한 UI(기본 테마 활용), 귀엽고 캐주얼한 카카오프렌즈풍 톤앤매너

## Project-specific Rules
- 모바일 우선(Mobile-first) 반응형 퍼블리싱.
- 향후 새로운 캐릭터 패밀리(패밀리 2, 3)가 쉽게 추가될 수 있도록 데이터 구조화.
- Phase 1 MVP 런칭을 목표로 불필요한 기능(마이페이지, 회원가입 등)은 일차적으로 배제.

## Off-limits for this project
- 복잡한 Class Component 사용 금지 (Functional Component + Hooks 필수)
- 무거운 Redux 대신 Zustand 사용
- `any` 타입 지양, TS 기반의 명확한 타입 정의
