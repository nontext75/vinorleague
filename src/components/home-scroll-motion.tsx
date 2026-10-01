'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'motion';
import styles from '@/app/home-editorial.module.css';

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const easeOut = (value: number) => 1 - (1 - clamp(value)) ** 3;
const easeInOut = (value: number) => {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
};
const RAIL_SPEED = 0.92;
const RAIL_START = 1.8;
const OVERLAP = 0.7;
const MASK_DURATION = 0.72;
const NEXT_CUT_START = 2.75;
const CUT_INTERVAL = 1.85;
const FINAL_CUT_HOLD = 1.1;
const aperture = (): Keyframe[] => [
  { clipPath: 'inset(38% 50%)', easing: 'cubic-bezier(.32,0,.22,1)' },
  { clipPath: 'inset(0% 0%)' },
];

// Offset coordinates stay stable while children are transformed or pinned.
function layoutTop(element: HTMLElement) {
  let top = 0;
  let current: HTMLElement | null = element;
  while (current) {
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return top;
}

type Scene = {
  root: HTMLElement;
  stage: HTMLElement;
  content: HTMLElement;
  distance: number;
  start: number;
  read: number;
};

/** Native page scroll owns navigation; only the gallery has a short visual settle. */
export function HomeScrollMotion() {
  const curtain = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const home = document.querySelector<HTMLElement>('.editorial-home');
    if (!home) return;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const resetOnReload = navigation?.type === 'reload';
    const previousScrollRestoration = history.scrollRestoration;
    if (resetOnReload) history.scrollRestoration = 'manual';
    const resetReloadPosition = () => {
      if (resetOnReload) window.scrollTo({ top: 0, behavior: 'instant' });
    };
    resetReloadPosition();
    window.addEventListener('pageshow', resetReloadPosition);
    const resetFrame = requestAnimationFrame(resetReloadPosition);

    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const compact = matchMedia('(max-width: 767px)');
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
    let entered = false;
    let dispose = () => {};

    const setup = () => {
      dispose();
      if (curtain.current) curtain.current.hidden = true;
      if (preference.matches) return;

      const select = (className: string) => home.querySelector<HTMLElement>(`.${className}`);
      const opening = home.querySelector<HTMLElement>('[data-opening]');
      const hero = select(styles.intro);
      const heroContent = select(styles.heroInner);
      const visual = home.querySelector<HTMLElement>('[data-opening-visual]');
      const experience = select(styles.experience);
      const experienceStage = home.querySelector<HTMLElement>('[data-experience-stage]');
      const gallery = experience?.querySelector<HTMLOListElement>('ol[data-home="true"]');
      if (!opening || !hero || !heroContent || !visual || !experience || !experienceStage || !gallery) return;
      const openingPictures = [...visual.querySelectorAll<HTMLElement>('img')];
      const lastCutStart = NEXT_CUT_START + Math.max(0, openingPictures.length - 2) * CUT_INTERVAL;
      const openingDistance = lastCutStart + MASK_DURATION + FINAL_CUT_HOLD + OVERLAP;

      const scene = (root: HTMLElement | null, stage: HTMLElement | null, distance: number): Scene | null => {
        const content = stage?.querySelector<HTMLElement>('[data-scene-content]');
        return root && stage && content ? { root, stage, content, distance, start: 0, read: 0 } : null;
      };
      const scenes = [
        scene(home.querySelector('[data-statement-panel]'), select(styles.philosophy), 3.55),
        scene(experience, experienceStage, 4),
        scene(select(styles.methodPanel), select(styles.method), 3.8),
        scene(select(styles.insightsPanel), select(styles.insights), 2.8),
      ];
      if (scenes.some(item => !item)) return;
      const [statement, work, method, insights] = scenes as Scene[];
      const chapters = [statement, work, method, insights];
      const galleryCards = [...gallery.querySelectorAll<HTMLElement>('li')];
      const workHeading = experienceStage.querySelector<HTMLElement>('.section-header');
      const workTitle = experienceStage.querySelector<HTMLElement>('#experience-title');
      const workCopy = experienceStage.querySelector<HTMLElement>('.section-header-copy');
      const progressBar = experience.querySelector<HTMLElement>('[data-experience-progress]');
      const progressCurrent = experience.querySelector<HTMLElement>('[data-experience-current]');
      const progressTotal = experience.querySelector<HTMLElement>('[data-experience-total]');
      const progressLabel = select(styles.experienceProgress);
      if (progressTotal) progressTotal.textContent = String(galleryCards.length).padStart(2, '0');

      const statementLines = [...statement.stage.querySelectorAll<HTMLElement>(`.${styles.statementLine}`)];
      const statementCopy = [...statement.stage.querySelectorAll<HTMLElement>(`.${styles.philosophyBody} p, .${styles.philosophyBody} > a`)];
      const methodLines = [...method.stage.querySelectorAll<HTMLElement>(`.${styles.methodLine}`)];
      const methodCopy = [...method.stage.querySelectorAll<HTMLElement>(`.${styles.methodBody} > p > span, .${styles.methodLinks}`)];
      const methodPicture = method.stage.querySelector<HTMLElement>(`.${styles.methodBg} img`);
      const insightsTitle = insights.stage.querySelector<HTMLElement>('h2');
      const insightsCopy = insights.stage.querySelector<HTMLElement>('.section-header-copy');
      const stories = [...insights.stage.querySelectorAll<HTMLElement>(`.${styles.storyRow}`)];
      const entranceElements = [workTitle, workCopy, progressLabel, ...galleryCards, ...statementLines, ...statementCopy, ...methodLines, ...methodCopy, insightsTitle, insightsCopy, ...stories];
      const headerHeight = compact.matches ? 78 : 80;
      let viewport = window.innerHeight;
      let viewportWidth = document.documentElement.clientWidth;
      let openingStart = 0;
      let heroRead = 0;
      let galleryTravel = 0;
      let galleryStart = 0;
      let galleryPosition = 0;
      let frame = 0;
      let previousTime = 0;
      let previousScroll = window.scrollY;
      let needsMeasure = true;
      let instantRail = true;
      let alive = true;

      home.dataset.scrollIntro = 'true';
      const openingTracks: { animation: Animation; start: number; end: number }[] = [];
      const openingTrack = (element: HTMLElement | null, keyframes: Keyframe[], start: number, end: number) => {
        if (!element) return;
        const animation = element.animate(keyframes, { duration: 1000, fill: 'both' });
        animation.pause();
        animation.currentTime = 0;
        openingTracks.push({ animation, start, end });
      };

      // Arrive automatically. Scrolling is only needed to explore the next scene.
      const heroEntranceElements = [
        ...hero.querySelectorAll<HTMLElement>(`.${styles.titleLine}`),
        hero.querySelector<HTMLElement>(`.${styles.heroSubtitle}`),
        ...hero.querySelectorAll<HTMLElement>(`.${styles.heroBottom} > *`),
      ].filter((element): element is HTMLElement => !!element);
      const entranceAnimations: { stop: () => void }[] = [];
      if (!entered && window.scrollY < 20) {
        heroEntranceElements.forEach((element, index) => {
          entranceAnimations.push(animate(element, {
            opacity: [0, 1], transform: [`translate3d(0, ${index < 3 ? 32 : 14}px, 0)`, 'translate3d(0, 0, 0)'],
          }, { duration: index < 3 ? 0.85 : 0.65, delay: 0.06 + index * 0.09, ease: [0.22, 1, 0.36, 1] }));
        });
      }
      entered = true;

      hero.querySelectorAll<HTMLElement>(`.${styles.lineMask}`).forEach((line, index) => {
        openingTrack(line, [
          { transform: 'translateX(0)', easing: 'cubic-bezier(.55,0,.8,.45)' },
          { transform: `translateX(${index % 2 ? '' : '-'}${compact.matches ? 20 : 64}px)` },
        ], 0.78 + index * 0.025, 1.2 + index * 0.025);
      });
      openingTrack(hero, [{ opacity: 1 }, { opacity: 0 }], 0.88, 1.2);
      openingTrack(visual, aperture(), 0.98, 0.98 + MASK_DURATION);
      openingPictures.forEach((picture, index) => {
        const start = index === 0 ? 0.98 : NEXT_CUT_START + (index - 1) * CUT_INTERVAL;
        openingTrack(picture, [{ transform: 'scale(1.065)' }, { transform: 'scale(1)' }], start, start + 1.3);
      });
      visual.querySelectorAll<HTMLElement>('[data-opening-frame]').forEach((picture, index) => {
        const start = NEXT_CUT_START + index * CUT_INTERVAL;
        openingTrack(picture, aperture(), start, start + MASK_DURATION);
      });

      const reveal = (element: HTMLElement | null | undefined, progress: number, start: number, duration: number, kind: 'title' | 'copy' | 'card' | 'row' = 'copy', index = 0) => {
        if (!element) return;
        const value = easeOut((progress - start) / duration);
        element.style.opacity = String(value);
        if (kind === 'title') {
          element.style.clipPath = `inset(0 0 ${(1 - value) * 100}% 0)`;
          element.style.transform = `translate3d(0, ${(1 - value) * 20}px, 0)`;
        } else if (kind === 'card') {
          element.style.transform = `translate3d(0, ${(1 - value) * 28}px, 0) scale(${0.975 + value * 0.025})`;
        } else if (kind === 'row') {
          element.style.transform = `translate3d(${(1 - value) * (index % 2 ? -16 : 16)}px, 0, 0)`;
        } else {
          element.style.transform = `translate3d(0, ${(1 - value) * 12}px, 0)`;
        }
      };

      const measure = () => {
        viewport = window.innerHeight;
        viewportWidth = document.documentElement.clientWidth;
        const available = viewport - headerHeight;
        home.style.setProperty('--opening-top', `${headerHeight}px`);
        home.style.setProperty('--opening-height', `${available}px`);
        home.style.setProperty('--scene-overlap', `${viewport * OVERLAP}px`);
        // Match the actual container instead of a separate, drifting gutter formula.
        const inset = workHeading ? (viewportWidth - workHeading.offsetWidth) / 2 : 24;
        home.style.setProperty('--scene-inset', `${inset}px`);
        heroRead = Math.max(0, heroContent.offsetHeight - available);
        home.style.setProperty('--opening-distance', `${viewport * openingDistance + heroRead}px`);

        const defaultWidth = compact.matches ? Math.min(viewportWidth * 0.7, 320) : Math.max(280, Math.min(viewportWidth * 0.31, 420));
        home.style.setProperty('--experience-card-width', `${defaultWidth}px`);
        const firstCard = galleryCards[0];
        const cardVisual = firstCard?.querySelector<HTMLElement>('[data-image]');
        const captionHeight = firstCard && cardVisual ? firstCard.offsetHeight - cardVisual.offsetHeight : 120;
        const padding = getComputedStyle(experienceStage);
        const cardSpace = available - parseFloat(padding.paddingTop) - parseFloat(padding.paddingBottom) - (workHeading?.offsetHeight ?? 0) - captionHeight - 44;
        home.style.setProperty('--experience-card-width', `${Math.min(defaultWidth, Math.max(compact.matches ? 200 : 220, cardSpace * 0.75))}px`);
        galleryTravel = Math.max(0, gallery.scrollWidth + inset * 2 - viewportWidth);

        chapters.forEach(chapter => {
          const stageStyle = getComputedStyle(chapter.stage);
          const innerHeight = available - parseFloat(stageStyle.paddingTop) - parseFloat(stageStyle.paddingBottom);
          chapter.read = Math.max(0, chapter.content.offsetHeight - innerHeight);
          chapter.root.style.height = `${available + viewport * chapter.distance + chapter.read + (chapter === work ? galleryTravel / RAIL_SPEED : 0)}px`;
        });
        // All writes finish before reading the new chapter offsets.
        openingStart = layoutTop(opening) - headerHeight;
        chapters.forEach(chapter => { chapter.start = layoutTop(chapter.root) - headerHeight; });
        galleryStart = work.start + viewport * RAIL_START + work.read;
        needsMeasure = false;
      };

      const render = (time = performance.now()) => {
        frame = 0;
        if (needsMeasure) measure();
        const position = window.scrollY;
        const elapsed = Math.min(64, time - (previousTime || time - 16));
        const jumped = Math.abs(position - previousScroll) > viewport * 0.65;
        previousScroll = position;
        previousTime = time;
        const openingProgress = (position - openingStart - heroRead) / viewport;
        heroContent.style.transform = `translate3d(0, ${-Math.min(heroRead, Math.max(0, position - openingStart - viewport * 0.3))}px, 0)`;
        openingTracks.forEach(track => {
          const currentTime = clamp((openingProgress - track.start) / (track.end - track.start)) * 1000;
          if (track.animation.currentTime !== currentTime) track.animation.currentTime = currentTime;
        });
        hero.style.pointerEvents = openingProgress > 1.2 ? 'none' : '';

        chapters.forEach((chapter, index) => {
          const progress = (position - chapter.start) / viewport;
          const cover = easeInOut(progress / OVERLAP);
          if (chapter === work) chapter.stage.style.opacity = String(cover);
          else if (chapter === method) chapter.stage.style.clipPath = `inset(0 0 ${(1 - cover) * 100}% 0)`;
          else if (chapter === insights) chapter.stage.style.clipPath = `inset(${(1 - cover) * 50}% 0)`;
          else chapter.stage.style.clipPath = `inset(${(1 - cover) * 100}% 0 0)`;
          const next = chapters[index + 1];
          const exit = next ? easeInOut((position - next.start + viewport * 0.16) / (viewport * 0.46)) : 0;
          chapter.content.style.opacity = String(1 - exit);
          const read = Math.min(chapter.read, Math.max(0, position - chapter.start - viewport * 1.35));
          chapter.content.style.transform = `translate3d(0, ${-read}px, 0)`;
          chapter.stage.style.pointerEvents = progress < 0.45 || exit > 0.98 ? 'none' : '';
        });

        const statementProgress = (position - statement.start) / viewport;
        statementLines.forEach((element, index) => reveal(element, statementProgress, 0.55 + index * 0.1, 0.4, 'title'));
        statementCopy.forEach((element, index) => reveal(element, statementProgress, 0.9 + index * 0.08, 0.35));
        const workProgress = (position - work.start) / viewport;
        reveal(workTitle, workProgress, 0.24, 0.48, 'title');
        reveal(workCopy, workProgress, 0.4, 0.48);
        gallery.style.opacity = '1';
        galleryCards.forEach((card, index) => reveal(card, workProgress, 0.56 + Math.min(index, 3) * 0.08, 0.46, 'card'));
        reveal(progressLabel, workProgress, 0.85, 0.35);
        const galleryTarget = Math.min(galleryTravel, Math.max(0, (position - galleryStart) * RAIL_SPEED));
        // The page remains native. Settle just this rail, and snap on touch, focus or a jump.
        galleryPosition = instantRail || jumped || !finePointer.matches ? galleryTarget : galleryPosition + (galleryTarget - galleryPosition) * (1 - Math.exp(-elapsed / 65));
        if (Math.abs(galleryTarget - galleryPosition) < 0.1) galleryPosition = galleryTarget;
        gallery.style.transform = `translate3d(${-galleryPosition}px, 0, 0)`;
        const railProgress = galleryTravel ? galleryPosition / galleryTravel : 1;
        if (progressBar) progressBar.style.transform = `scaleX(${railProgress})`;
        if (progressCurrent) progressCurrent.textContent = String(1 + Math.round(railProgress * (galleryCards.length - 1))).padStart(2, '0');

        const methodProgress = (position - method.start) / viewport;
        methodLines.forEach((element, index) => reveal(element, methodProgress, 0.3 + index * 0.14, 0.5, 'title'));
        methodCopy.forEach((element, index) => reveal(element, methodProgress, 0.68 + index * 0.12, 0.44));
        if (methodPicture) methodPicture.style.transform = `scale(${1.06 - clamp(methodProgress / 2.8) * 0.06})`;
        const insightsProgress = (position - insights.start) / viewport;
        reveal(insightsTitle, insightsProgress, 0.24, 0.5, 'title');
        reveal(insightsCopy, insightsProgress, 0.4, 0.48);
        stories.forEach((element, index) => reveal(element, insightsProgress, 0.5 + index * 0.12, 0.48, 'row', index));
        instantRail = false;
        if (galleryPosition !== galleryTarget) frame = requestAnimationFrame(render);
      };

      const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
      const onMeasure = () => { needsMeasure = true; instantRail = true; schedule(); };
      const onResize = () => {
        // Mobile browser chrome must not rebuild several screens of scroll distance.
        if (compact.matches && viewportWidth === document.documentElement.clientWidth && Math.abs(innerHeight - viewport) < 120) return;
        onMeasure();
      };
      const onFocus = (event: FocusEvent) => {
        const target = event.target;
        if (!(target instanceof HTMLElement) || !target.matches(':focus-visible')) return;
        let destination: number | undefined;
        if (hero.contains(target)) destination = openingStart + viewport * 0.3 + heroRead;
        const chapter = chapters.find(item => item.stage.contains(target));
        if (chapter) {
          const padding = getComputedStyle(chapter.stage);
          const visibleHeight = chapter.stage.clientHeight - parseFloat(padding.paddingTop) - parseFloat(padding.paddingBottom);
          const targetBottom = layoutTop(target) - layoutTop(chapter.content) + target.offsetHeight;
          const readToTarget = Math.min(chapter.read, Math.max(0, targetBottom - visibleHeight));
          destination = chapter.start + viewport * 1.35 + readToTarget;
          const card = galleryCards.find(item => item.contains(target));
          if (chapter === work && card) {
            const centered = card.offsetLeft - galleryCards[0].offsetLeft - (viewportWidth - card.offsetWidth) / 2 + parseFloat(getComputedStyle(gallery).marginLeft);
            destination = galleryStart + Math.max(0, Math.min(galleryTravel, centered)) / RAIL_SPEED;
          }
        }
        if (destination !== undefined) {
          instantRail = true;
          window.scrollTo({ top: destination, behavior: 'instant' });
          schedule();
        }
      };
      const onWheel = (event: WheelEvent) => {
        if (event.ctrlKey) return;
        const horizontal = event.shiftKey ? event.deltaY : event.deltaX;
        if (!horizontal || (!event.shiftKey && Math.abs(horizontal) <= Math.abs(event.deltaY))) return;
        if (window.scrollY < galleryStart - viewport * 0.45 || window.scrollY > galleryStart + galleryTravel / RAIL_SPEED + viewport * 0.6) return;
        const delta = horizontal * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewportWidth : 1);
        const current = Math.min(galleryTravel, Math.max(0, (window.scrollY - galleryStart) * RAIL_SPEED));
        const next = Math.min(galleryTravel, Math.max(0, current + delta));
        if (next === current) return;
        event.preventDefault();
        window.scrollTo({ top: galleryStart + next / RAIL_SPEED, behavior: 'instant' });
      };
      const onKey = () => { instantRail = true; };
      const resize = new ResizeObserver(onMeasure);
      resize.observe(heroContent);
      chapters.forEach(chapter => resize.observe(chapter.content));
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', onResize);
      window.addEventListener('pageshow', onMeasure);
      document.addEventListener('focusin', onFocus);
      document.addEventListener('keydown', onKey);
      experienceStage.addEventListener('wheel', onWheel, { passive: false });
      void document.fonts.ready.then(() => { if (alive) onMeasure(); });
      render();

      dispose = () => {
        alive = false;
        cancelAnimationFrame(frame);
        resize.disconnect();
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('pageshow', onMeasure);
        document.removeEventListener('focusin', onFocus);
        document.removeEventListener('keydown', onKey);
        experienceStage.removeEventListener('wheel', onWheel);
        openingTracks.forEach(track => track.animation.cancel());
        entranceAnimations.forEach(animation => animation.stop());
        [...entranceElements, ...heroEntranceElements, hero, heroContent, gallery, methodPicture].forEach(element => {
          if (element) { element.style.opacity = ''; element.style.transform = ''; element.style.clipPath = ''; element.style.pointerEvents = ''; }
        });
        chapters.forEach(chapter => {
          chapter.root.style.height = '';
          chapter.stage.style.clipPath = '';
          chapter.stage.style.opacity = '';
          chapter.stage.style.pointerEvents = '';
          chapter.content.style.opacity = '';
          chapter.content.style.transform = '';
        });
        delete home.dataset.scrollIntro;
        ['--opening-top', '--opening-height', '--opening-distance', '--scene-overlap', '--scene-inset', '--experience-card-width'].forEach(property => home.style.removeProperty(property));
      };
    };

    setup();
    preference.addEventListener('change', setup);
    compact.addEventListener('change', setup);
    return () => {
      dispose();
      cancelAnimationFrame(resetFrame);
      window.removeEventListener('pageshow', resetReloadPosition);
      if (resetOnReload) history.scrollRestoration = previousScrollRestoration;
      preference.removeEventListener('change', setup);
      compact.removeEventListener('change', setup);
    };
  }, []);

  return <div ref={curtain} className={styles.introCurtain} aria-hidden="true" />;
}
