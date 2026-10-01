# Vinorleague homepage handoff — 2026-09-28

## Task and stop state

The user asked to STOP implementation and leave this handoff so they can use another agent. Do not assume the current visual treatment is accepted. No new agent has been launched. All changes are uncommitted on `master`, in `E:\Work\vinorleague`.

Continue refining the homepage into six distinct, beautifully composed sections with perceptible scroll-driven motion and natural transitions. The latest motion implementation is a draft and has NOT been checked in the browser.

## User requests, in order

1. Supplied six screenshots and said “이미지하나당 하나의 섹션으로 구성해줘”.
2. Supplied the client-logo screenshot and said “이건 서브로 넣자”. We agreed to put it on the Studio subpage.
3. “포트폴리오 리스트의 경우 한화면안에 들어가게 구조를 조정해봐”. The home portfolio was changed to six previews in a 3-column × 2-row desktop grid.
4. “섹션별로 나누는건 좋은데 진행이 자연스럽지않아”. We removed CSS proximity scroll snap and adjusted spacing.
5. “스크롤에 따른 모션은 전혀 없고 ...뭔가 좀 이상한데? 섹션별로 끊어지는 느낌도 없어”. Removing snap alone did not satisfy the user. They want actual motion and an evident section-by-section rhythm, with natural progression.
6. “잠시만 현재 작업 handoff로 남겨봐” / “다른에이전트로 구현해볼게”. Stop and document; user will select another agent.

## Design and section order

Preserve the supplied minimalist black/near-white design, Poppins display type, Pretendard Korean fallback, generous whitespace, underlined text links, existing copy and real project imagery.

1. Header + large three-line `Design / sustainable / growth.` hero, supporting Korean text and Explore our work at the bottom.
2. `We focus on essential value and elevate it with beauty.` statement, Korean lead/body, Studio link.
3. Experience / portfolio. Six items on ONE desktop screen; full-length web screenshots must not create a very tall gallery. All cards link to project detail routes.
4. Dark Services section: `Always there. / From first idea to final detail.`, description, service link, four working accordion rows.
5. Ideas & Insights: left heading/description/link; right three story rows with square thumbnails.
6. Project inquiry + large vinorleague wordmark footer. This is the shared Footer outside `<main>`; five direct homepage sections + the footer form six visual sections.

Clients belong on `/studio`, after Services, with 28 client logos (29 img elements because LG CNS uses two SVGs).

## Relevant files and current edits

- `src/app/page.tsx`: server page, five sections in order; removed ClientsSection; work heading uses `layout="row"`; imports/renders the new HomeScrollMotion.
- `src/components/home-scroll-motion.tsx`: NEW, untracked, latest UNVERIFIED motion draft. Client-only enhancement importing `animate`, `scroll` from `motion` and `useReducedMotion` from `motion/react`. Queries existing server markup. Hero title moves up/fades as it leaves; statement heading/body reveal separately; portfolio cards reveal by scroll position; service heading/body/rows reveal; story rows slide horizontally; footer invitation/wordmark reveal. Motion bound to scroll progress, not a scroll event/useState loop. Skips when reduced motion is requested, cancels effects on cleanup. Returns null, so server HTML stays visible without JS.
- `src/app/home-editorial.module.css`: many pre-existing overlapping rules. Our scoped `.home ...` overrides are at the END. Latest draft makes statement/work/services/insights min-height 100svh, centers content, adds thin section boundaries to statement/work. Mobile statement 80svh, portfolio remains content-height. Hero retains full screen height. Studio styles are shared: scope homepage changes carefully.
- `src/app/editorial-theme.css`: homepage shell, gutters, footer. Removed original `scroll-snap-type: y proximity` and section `scroll-snap-align`. Current html scroll padding 32px. Latest draft adds a top border and min-height 90svh to home footer. Desktop home gutters 32px; mobile 20px.
- `src/components/project-grid.tsx`: `useLayoutEffect` skips masonry when `home`; non-home lists retain existing masonry.
- `src/components/work-gallery.module.css`: home-only 3 × 2 grid, 28px row/32px column gaps, thumbnail height `clamp(100px,18svh,220px)`. Images crop from top, character contains, Budongsan centers. Tablet 2 columns; narrow mobile 1 column.
- `src/components/project-card.tsx`: added `data-image` to visual wrapper so Budongsan crop centers its logo.
- `src/app/studio/page.tsx`: added ClientsSection after Services. Preserve existing studio photo and StudioValues edits.
- `src/components/home-motion.tsx`: existing Hero and ServiceList; no edits in this session. Accordion already uses Motion.
- `src/components/editorial-sections.tsx`: shared StatementSection, ServicesSection, ClientsSection.
- `src/components/footer.tsx`: shared server footer in root layout.

## What was tested versus what was not

Before the LAST motion/min-height patch:

- `npm run check` passed.
- Playwright checked actual desktop/mobile rendering.
- At 1280 × 720, portfolio section height was 716.47px with six cards, no horizontal overflow. This measurement predates the newest min-height and motion changes.
- At 1440 × 900, all six cards fit; thumbnail cropping was subsequently improved to center the Budongsan logo.
- At 390 × 844, no horizontal overflow, no broken loaded images; hero height 844px.
- Browser console had zero errors/warnings for the earlier implementation.
- `/studio` had 29 client img elements and no horizontal overflow at mobile width.

After the LAST motion/min-height patch:

- ONLY `npm run check` passed. No browser runtime, scroll progression, screenshot or reduced-motion verification yet.
- No production build was run in this session.
- No commit, push, or deployment.

## Inspect the draft critically

- The new motion helper ties transforms to the same elements sometimes used as scroll targets. Check whether transformed bounding boxes affect measurements or produce instability; use stationary wrappers if needed.
- Items begin opacity 0 and reach 1 at viewport thresholds. Ensure titles/cards are readable when expected, including the lower portfolio row at a section-aligned viewport. Do not let the one-screen grid requirement become “six cards fit but some are transparent”.
- `revealFocused` currently scrolls focused elements into view; its comment claims immediate reveal but it does not actually force animation completion. Review keyboard focus visibility rather than trusting the comment.
- Mobile media query is evaluated once on mount. Live breakpoint changes do not rebuild the effect. Consider responsive correctness and cleanup.
- Check reverse scroll, refresh mid-page, client route navigation, browser zoom, short laptop heights, reduced-motion preference, and no-JS visibility.
- The newest borders/min-heights could over-space sections. Judge the whole scroll experience; the user explicitly disliked both the previous snapping feel and the later undifferentiated flat flow.
- Motion design was described to the user as: hero slowly recedes, heading and content reveal in sequence, sections separated by viewport rhythm and fine boundaries. This is intent, not verified quality.

## Local runtime / tooling

- Correct app: `http://127.0.0.1:3001` (existing Next dev server). Port 3000 is an unrelated OH! My templates project; do NOT test it.
- Existing Playwright CLI session: `vinor`, Chromium/headless. Last browser state was homepage at 1280 × 720, portfolio in view, before latest motion patch.
- CLI: `npx.cmd --yes --package @playwright/cli playwright-cli -s=vinor ...`
- Playwright MCP was not available in this session, so CLI was used. `npx` exists.
- Screenshots from the PRE-MOTION implementation: `output/playwright/home-work-final.png`, `home-work-laptop.png`, `home-work-desktop.png`, `home-mobile.png`. These do NOT demonstrate the new motion.
- A long single-quoted `run-code` PowerShell invocation exited 1 without useful output. Short `eval`, resize, goto, screenshot commands worked. Be careful with shell quoting.
- Sandbox process creation repeatedly failed with Windows CreateProcessAsUserW error 5; escalated shell calls worked. Do not treat that as a project failure.
- Installed stack: Next 16.3.6, React 19.3, Motion 13.4.4, Phosphor icons, Tailwind 4.3.3.

## Pre-existing dirty work — preserve

At session start these were already modified:

`src/app/contact/page.tsx`, `src/app/editorial-theme.css`, `src/app/globals.css`, `src/app/home-editorial.module.css`, `src/app/news/page.tsx`, `src/app/studio/page.tsx`, `src/app/work/page.tsx`, `src/components/editorial-sections.tsx`, `src/components/editorial.tsx`, `src/components/work-gallery.module.css`.

Already untracked: `public/images/studio-interior.png`, `src/components/studio-values.tsx`.

Do not reset those files wholesale to undo this agent's changes. Inspect diffs and edit surgically. This agent additionally changed page.tsx, project-card.tsx, project-grid.tsx and added home-scroll-motion.tsx plus this handoff.

## Reference screenshots supplied by user

All in `C:\Users\nonte\AppData\Local\Temp\` (may be temporary):

- Hero: `orca-paste-1790598930153-19835c13-ea41-4bf1-9e15-f880e31c8b41.png`
- Statement: `orca-paste-1790598939652-f5fe9789-dbd2-473d-ae59-517d989cae33.png`
- Original masonry portfolio: `orca-paste-1790598950414-aee25d06-6780-4d51-aa90-22797af471ae.png` — user's later one-screen requirement supersedes its tall layout.
- Services: `orca-paste-1790598959251-d2992c75-b13d-4464-9d41-aec97bff34fc.png`
- Insights: `orca-paste-1790598979436-4748aeed-6280-48f1-b3f0-5fdc8e8e5f1e.png`
- Footer: `orca-paste-1790598990250-900e306b-44de-4df0-9b02-5377ae1d35ff.png`
- Clients: `orca-paste-1790599267585-1516ff06-0e2f-4ea7-a7d3-f0484822571a.png`

## Constraints / acceptance criteria

- Communicate briefly in plain Korean. The user is not a developer and dislikes unnecessary permission requests. Preserve design quality.
- User asked for design-taste-frontend, Framer Motion, anti-AI writing, Playwright. Exact framaer-motion/anti-ai-writing skills were not found; installed Motion is available. Design-taste-frontend and Playwright skills were read; emilkowal-animations was applied for current motion work.
- Follow AGENTS.md: read relevant `node_modules/next/dist/docs/` guides before code changes. Layout/pages, CSS, server/client guides have been read in this session.
- [ ] Six identifiable sections, with natural yet evident transitions.
- [ ] Actual visible scroll-driven motion; inspect it in the browser, not just TypeScript.
- [ ] Six portfolio previews fit one common desktop/laptop viewport and remain fully readable.
- [ ] Clients appear only on Studio, not the home sequence.
- [ ] Services, links, focus, mobile layout, reduced motion work.
- [ ] Preserve existing subpages and unrelated local changes.
- [ ] Run appropriate checks and report only verified results.
