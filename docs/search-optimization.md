# 검색 최적화 설정

## 현재 상태

운영 도메인은 아직 미정입니다. 로컬·미리보기는 `noindex, nofollow`를 유지하며,
대표 주소(canonical)를 추측하지 않습니다. 사이트맵도 운영 설정 전에는 비어 있습니다.
배포나 검색엔진 계정 등록은 이번 코드 변경에 포함되지 않습니다.

## 운영 공개 시 설정

운영 환경에만 다음 값을 설정한 뒤 새로 빌드·배포합니다.

```dotenv
NEXT_PUBLIC_SITE_URL=https://실제-운영-도메인
SITE_INDEXING_ENABLED=true
SITE_ENV=production
```

`NEXT_PUBLIC_SITE_URL`에는 HTTPS 루트 주소를 넣습니다. 경로·쿼리·인증정보는 넣지 않습니다.
Vercel에서는 자동 제공되는 `VERCEL_ENV`가 `SITE_ENV`보다 우선합니다.
그 외 호스팅에서는 `SITE_ENV=production`을 직접 지정합니다.
`NODE_ENV=production`인 운영 빌드에서만 색인을 허용하므로 개발 서버는 항상 검색 제외입니다.
미리보기는 `SITE_INDEXING_ENABLED=false`로 둡니다. 환경이 불명확해도 검색 제외됩니다.

운영으로 전환되면 `/robots.txt`는 검색 크롤러를 허용하고 `/sitemap.xml`을 안내합니다.
사이트맵에는 홈·작업 목록·스튜디오·글 목록·문의와 실제 존재하는 공개 상세 페이지만 포함합니다.
관리자와 디자인 가이드는 사이트맵에서 제외하고 각각 `noindex`를 지정합니다.
이 지시를 읽을 수 있도록 운영 robots.txt에서는 해당 페이지의 크롤링을 차단하지 않습니다.
robots.txt 및 noindex는 로그인이나 접근 제어를 대신하지 않습니다.

## 콘텐츠와 메타데이터

- 주요 페이지의 제목·설명은 `src/lib/site-content.ts`에서 관리합니다.
- 프로젝트는 화면과 같은 `getWorkProjects()` 데이터로 제목·설명·대표 이미지를 만듭니다.
  CMS 검색 제목/설명을 수정할 때도 실제 본문과 일치시켜야 합니다.
- 글 요약은 `src/data/vinus-catalog.json`의 `summary`를 수정하면 목록·본문·검색 정보에 함께 반영됩니다.
- 홈에는 화면에 표시하는 이름과 서비스 소개를 바탕으로 `Organization`을 넣습니다.
- 도메인이 설정되면 상세 페이지의 실제 탐색 경로에 맞는 `BreadcrumbList`를 생성합니다.
- 작성자가 확인되지 않은 현재 글에는 `Article` 작성자를 만들지 않습니다.
  작성자와 날짜가 검증되고 화면에 표시될 때 Article 추가를 검토합니다.
- 존재하지 않거나 본문이 없는 상세 페이지는 404로 처리합니다.
- 가짜 수정일, 리뷰, 성과 수치, 언어별 가상 URL, 키워드 나열, 불필요한 FAQ는 추가하지 않습니다.

## 검증

```sh
npm run test:seo
npm run check
npm run build
```

운영 도메인 확정 뒤에는 실제 배포에서 다음을 확인해야 합니다.

1. 주요 URL의 성공 응답, 잘못된 URL의 404, 페이지별 제목·설명·대표 주소·공유 이미지.
2. 운영 페이지의 `index, follow`, 미리보기·내부 페이지의 `noindex`.
3. 사이트맵 URL과 canonical 일치 및 크롤러에 대한 CDN/방화벽/배포 보호 설정.
4. [Schema Markup Validator](https://validator.schema.org/)와
   [Google Rich Results Test](https://search.google.com/test/rich-results)의 실제 URL 검사.
5. Search Console 및 Bing Webmaster Tools 소유권 확인, 사이트맵 제출, 주요 URL 검사.
6. 배포일을 기준으로 검색 노출·클릭·문의 추이를 구분해 기록.
   계정에서 AI 검색 보고서를 제공하는 경우에만 해당 보고서도 확인.

도메인이 없는 현재 단계에서는 운영 크롤링·색인 여부나 검색 성과를 확인할 수 없습니다.
구조화 데이터 검사 통과가 검색 노출이나 AI 답변 인용을 보장하지도 않습니다.

### 이번 변경의 검증 결과

- 타입 검사, 기본 빌드, 운영 설정을 모사한 빌드 통과.
- 운영 빌드의 공개 페이지 17개: 고유 제목·설명, 대표 이미지 파일,
  canonical·Open Graph URL·사이트맵 주소 일치 확인.
- 운영 설정용 테스트 도메인은 검증에만 사용했으며, 마지막 빌드는 도메인 없는
  검색 제외 상태로 다시 생성해 테스트 주소가 남지 않도록 확인.
- 검색 설정과 JSON-LD 삽입 방지 회귀 검사 3개 통과.
- Playwright로 1440px·390px에서 홈·작업·작업 상세·글 목록·글 상세·문의 확인.
  가로 넘침과 브라우저 실행 오류 없음. 자바스크립트 없이도 주요 본문 확인.
- 관리자·디자인 가이드 noindex, 일반·작업·글의 잘못된 주소 404 확인.
- Schema.org 공식 검사기에 생성한 Organization·BreadcrumbList 코드 스니펫을 입력해
  오류 0개·경고 0개 확인. 실제 운영 URL 검사 및 Google/Bing 계정 검증은 도메인 확정 후 진행.
- 운영 설정의 별도 로컬 서버 실행은 자동 승인 검토에서 차단되어,
  해당 설정은 생성된 운영 HTML·사이트맵·robots.txt로 검증.

## 기준

Google은 AI 검색에도 검색 접근성, 유용한 본문, 내부 링크, 화면과 일치하는 구조화 데이터 등
기본 SEO 원칙을 적용하도록 안내합니다. 특별한 AI 파일이나 별도의 전용 마크업은 필수가 아닙니다.

- [Google: AI 기능과 웹사이트](https://developers.google.com/search/docs/appearance/ai-features)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
- [Next.js: JSON-LD](https://nextjs.org/docs/app/guides/json-ld)
