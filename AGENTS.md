<!-- BEGIN:nextjs-agent-rules -->
# Agents Collaboration Protocol

## Roles
- **Karina (Primary Engineer)**: System architecture, design system (tokens) management, complex logic, and final quality review.
- **Gemma (Creative Partner)**: Content production, layout refinement, storytelling sections, and micro-interactions.

## Technical Guidelines
- **Font**: Use **Outfit** (`--font-outfit`) only.
- **Colors**: `#FD2F79` (Pink), `#5a4838` (Brown).
- **Core CSS Classes**:
    - **Page structure** — always use these on every page:
        - `page-wrapper`: Root div (`min-h-screen bg-white relative font-sans overflow-hidden`). Global `::selection` pink is applied automatically.
        - `mesh-overlay`: Fixed bg-mesh overlay div, placed as first child of page-wrapper.
        - `page-main`: Main element (`relative z-10 pt-40 pb-80`).
        - `section-wrap`: Inner section container (`max-w-[1400px] mx-auto px-8 md:px-12`).
    - **Navigation**:
        - `back-link`: Standard "BACK TO INDEX →" link style.
    - **Watermark**:
        - `watermark`: Fixed bottom-left `Vinorleague Digital Anthology v2.0` label div.
    - **Forms**:
        - `form-input`: Input/textarea field style.
        - `form-label`: Form field label style.
    - **Content**:
        - `bg-mesh`: Background gradient (used inside mesh-overlay).
        - `anthology-card`: Premium content containers.
        - `soft-shadow`: Standard elevation shadows.
        - `sticker-card`: Irregularly rotated photo cards.
        - `editorial-header`: Centered page header with max-width and bottom margin.
        - `editorial-banner`: Full-width hero banner image container.
        - `editorial-character-row` / `editorial-character-row-reverse`: Two-column character layout rows.
- **Technology Stack**: Next.js (App Router), Tailwind CSS v4, DaisyUI v5.
- **Design Principle**: High-density typography (Outfit), editorial layout, and vibrant micro-animations.

---
This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
