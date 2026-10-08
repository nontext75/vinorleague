'use client';

import { useEffect, useRef } from 'react';
import { animate, inView } from 'motion';
import { readMotionEase, readMotionToken } from '@/lib/motion-tokens';
import styles from '@/app/home-editorial.module.css';

const clamp = (value: number) => Math.max(0, Math.min(1, value));
// Quartic ease-out: a quick start that glides to rest, never overshooting.
const easeOut = (value: number) => 1 - (1 - clamp(value)) ** 4;
const easeInOut = (value: number) => {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
};
const RAIL_SPEED = 0.92;
const RAIL_START = 1.8;
const OVERLAP = 0.36;
const MASK_DURATION = 0.34;
const NEXT_CUT_START = 1.35;
const CUT_INTERVAL = 0.42;
// Scene progress trails the native scroll with exponential damping (ms), so
// reveals and wipes keep gliding briefly after the wheel stops. The page itself stays native.
const INERTIA = 110;
const FINAL_CUT_HOLD = 0.35;
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
    const motionEase = readMotionEase();
    const motionSettings = {
      enterDuration: readMotionToken('--motion-home-enter-duration', 0.66),
      enterDistance: readMotionToken('--motion-home-enter-distance', 38),
      sectionHold: readMotionToken('--motion-home-section-hold', 0.3),
      titleDistance: readMotionToken('--motion-home-title-distance', 0.72),
      copyDistance: readMotionToken('--motion-home-copy-distance', 54),
      cardX: readMotionToken('--motion-home-card-x-distance', 132),
      cardY: readMotionToken('--motion-home-card-y-distance', 72),
      cardScale: readMotionToken('--motion-home-card-scale', 0.92),
      rowX: readMotionToken('--motion-home-row-x-distance', 80),
      stagger: readMotionToken('--motion-reveal-stagger', 0.075),
    };
    let entered = false;
    let dispose = () => {};

    const setupMobile = () => {
      const hero = home.querySelector<HTMLElement>(`.${styles.intro}`);
      const heroEntranceElements = hero ? [
        ...hero.querySelectorAll<HTMLElement>(`.${styles.titleLine}`),
        hero.querySelector<HTMLElement>(`.${styles.heroSubtitle}`),
        ...hero.querySelectorAll<HTMLElement>(`.${styles.heroBottom} > *`),
      ].filter((element): element is HTMLElement => !!element) : [];

      const anims: { stop: () => void }[] = [];
      if (!entered && window.scrollY < 20) {
        heroEntranceElements.forEach((element, index) => {
          anims.push(animate(element, {
            transform: [`translate3d(0, ${index < 3 ? motionSettings.enterDistance : motionSettings.enterDistance * 0.55}px, 0)`, 'translate3d(0, 0, 0)'],
          }, { duration: motionSettings.enterDuration, delay: 0.03 + index * motionSettings.stagger * 0.7, ease: motionEase }));
        });
      }
      entered = true;

      const revealElements = [
        ...home.querySelectorAll<HTMLElement>(`.${styles.statementLine}`),
        ...home.querySelectorAll<HTMLElement>(`.${styles.philosophyBody} > *`),
        home.querySelector<HTMLElement>('#experience-title'),
        home.querySelector<HTMLElement>('.section-header-copy'),
        ...home.querySelectorAll<HTMLElement>('ol[data-home="true"] li'),
        ...home.querySelectorAll<HTMLElement>(`.${styles.methodLine}`),
        ...home.querySelectorAll<HTMLElement>(`.${styles.methodBody} > *`),
        ...home.querySelectorAll<HTMLElement>(`.${styles.service}`),
        home.querySelector<HTMLElement>(`.${styles.insights} h2`),
        home.querySelector<HTMLElement>(`.${styles.insights} .section-header-copy`),
        ...home.querySelectorAll<HTMLElement>(`.${styles.storyRow}`),
      ].filter((el): el is HTMLElement => !!el);

      const stops: (() => void)[] = [];
      revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translate3d(0, 20px, 0)';
        element.style.transition = 'opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1), transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)';
        stops.push(inView(element, () => {
          element.style.opacity = '1';
          element.style.transform = 'translate3d(0, 0, 0)';
        }, { margin: '0px 0px -10% 0px' }));
      });

      dispose = () => {
        stops.forEach(stop => stop());
        anims.forEach(a => a.stop());
        revealElements.forEach(element => {
          element.style.opacity = '';
          element.style.transform = '';
          element.style.transition = '';
        });
      };
    };

    const setup = () => {
      dispose();
      if (curtain.current) curtain.current.hidden = true;
      if (preference.matches) return;
      if (compact.matches) {
        setupMobile();
        return;
      }

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
        scene(home.querySelector('[data-statement-panel]'), select(styles.philosophy), 1.1),
        scene(experience, experienceStage, 2.0),
        scene(select(styles.methodPanel), select(styles.method), 1.8),
        scene(select(styles.insightsPanel), select(styles.insights), 1.4),
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
      let smoothScroll = window.scrollY;
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
            transform: [`translate3d(0, ${index < 3 ? 32 : 14}px, 0)`, 'translate3d(0, 0, 0)'],
          }, { duration: index < 3 ? motionSettings.enterDuration * 1.08 : motionSettings.enterDuration * 0.86, delay: 0.04 + index * motionSettings.stagger * 0.65, ease: motionEase }));
        });
      }
      entered = true;

      hero.querySelectorAll<HTMLElement>(`.${styles.lineMask}`).forEach((line, index) => {
        openingTrack(line, [
          { transform: 'translateX(0)', easing: 'cubic-bezier(.55,0,.8,.45)' },
          { transform: `translateX(${index % 2 ? '' : '-'}${compact.matches ? 48 : 160}px)` },
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

      // Each frame only touches styles whose value actually changed. Rewriting every
      // inline style (and the counter text) per frame forced a style recalc and layout
      // on every scroll frame, which is what made scrolling stutter on slower machines.
      const written = new Map<HTMLElement, Record<string, string>>();
      const write = (element: HTMLElement | null | undefined, property: 'opacity' | 'transform' | 'clipPath' | 'pointerEvents', value: string) => {
        if (!element) return;
        let cache = written.get(element);
        if (!cache) written.set(element, cache = {});
        if (cache[property] === value) return;
        cache[property] = value;
        element.style[property] = value;
      };
      const round = (value: number) => Math.round(value * 100) / 100;

      const reveal = (element: HTMLElement | null | undefined, progress: number, start: number, duration: number, kind: 'title' | 'copy' | 'card' | 'row' = 'copy') => {
        if (!element) return;
        const value = Math.round(easeOut((progress - start) / duration) * 1000) / 1000;
        const rest = 1 - value;
        write(element, 'opacity', String(value));
        // Travel is large enough to read as an entrance, not a fade.
        if (kind === 'title') {
          // Keep moving headings readable while the user pauses mid-scroll.
          write(element, 'transform', `translate3d(0, ${round(rest * motionSettings.titleDistance)}em, 0) scale(${round(0.95 + value * 0.05)})`);
        } else if (kind === 'card') {
          write(element, 'transform', `translate3d(${round(rest * motionSettings.cardX)}px, ${round(rest * motionSettings.cardY)}px, 0) scale(${Math.round((motionSettings.cardScale + value * (1 - motionSettings.cardScale)) * 1e4) / 1e4})`);
        } else if (kind === 'row') {
          write(element, 'transform', `translate3d(${round(rest * motionSettings.rowX)}px, ${round(rest * 18)}px, 0) scale(${round(0.96 + value * 0.04)})`);
        } else {
          write(element, 'transform', `translate3d(0, ${round(rest * motionSettings.copyDistance)}px, 0) scale(${round(0.975 + value * 0.025)})`);
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
          // Leave a short, settled beat after each scene before the next wipe begins.
          chapter.root.style.height = `${available + viewport * (chapter.distance + motionSettings.sectionHold) + chapter.read + (chapter === work ? galleryTravel / RAIL_SPEED : 0)}px`;
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
        // Touch scrolling already carries native momentum; focus and jumps settle instantly.
        smoothScroll = instantRail || jumped || !finePointer.matches ? position : smoothScroll + (position - smoothScroll) * (1 - Math.exp(-elapsed / INERTIA));
        if (Math.abs(position - smoothScroll) < 0.5) smoothScroll = position;
        const motion = smoothScroll;
        const openingProgress = (motion - openingStart - heroRead) / viewport;
        write(heroContent, 'transform', `translate3d(0, ${-round(Math.min(heroRead, Math.max(0, position - openingStart - viewport * 0.3)))}px, 0)`);
        openingTracks.forEach(track => {
          const currentTime = Math.round(clamp((openingProgress - track.start) / (track.end - track.start)) * 1000);
          if (track.animation.currentTime !== currentTime) track.animation.currentTime = currentTime;
        });
        write(hero, 'pointerEvents', openingProgress > 1.2 ? 'none' : '');

        chapters.forEach((chapter, index) => {
          const progress = (motion - chapter.start) / viewport;
          const hidden = round((1 - easeInOut(progress / OVERLAP)) * 100);
          // Every scene arrives as a vertical wipe from bottom.
          if (chapter === work) write(chapter.stage, 'clipPath', `inset(${hidden}% 0 0)`);
          else if (chapter === method) write(chapter.stage, 'clipPath', `inset(0 0 ${hidden}% 0)`);
          else if (chapter === insights) write(chapter.stage, 'clipPath', `inset(${hidden / 2}% 0)`);
          else write(chapter.stage, 'clipPath', `inset(${hidden}% 0 0)`);
          const next = chapters[index + 1];
          const exit = next ? round(easeInOut((motion - next.start + viewport * 0.16) / (viewport * 0.46)) * 1000) / 1000 : 0;
          // Outgoing content recedes upward and cleanly fades out under incoming wipe.
          write(chapter.content, 'opacity', String(Math.max(0, round((1 - exit * 1.25) * 1000) / 1000)));
          const read = Math.min(chapter.read, Math.max(0, position - chapter.start - viewport * 1.35));
          write(chapter.content, 'transform', `translate3d(0, ${-round(read + exit * 72)}px, 0)`);
          write(chapter.stage, 'pointerEvents', progress < 0.45 || exit > 0.98 ? 'none' : '');
        });

        const statementProgress = (motion - statement.start) / viewport;
        statementLines.forEach((element, index) => reveal(element, statementProgress, 0.12 + index * 0.07, 0.28, 'title'));
        statementCopy.forEach((element, index) => reveal(element, statementProgress, 0.28 + index * 0.06, 0.25));
        const workProgress = (motion - work.start) / viewport;
        reveal(workTitle, workProgress, 0.12, 0.32, 'title');
        reveal(workCopy, workProgress, 0.22, 0.3);
        write(gallery, 'opacity', '1');
        galleryCards.forEach((card, index) => reveal(card, workProgress, 0.38 + Math.min(index, 3) * 0.07, 0.38, 'card'));
        reveal(progressLabel, workProgress, 0.62, 0.25);
        const galleryTarget = Math.min(galleryTravel, Math.max(0, (position - galleryStart) * RAIL_SPEED));
        // The page remains native. Settle just this rail, and snap on touch, focus or a jump.
        galleryPosition = instantRail || jumped || !finePointer.matches ? galleryTarget : galleryPosition + (galleryTarget - galleryPosition) * (1 - Math.exp(-elapsed / 65));
        if (Math.abs(galleryTarget - galleryPosition) < 0.1) galleryPosition = galleryTarget;
        write(gallery, 'transform', `translate3d(${-round(galleryPosition)}px, 0, 0)`);
        const railProgress = galleryTravel ? galleryPosition / galleryTravel : 1;
        write(progressBar, 'transform', `scaleX(${Math.round(railProgress * 1000) / 1000})`);
        const current = String(1 + Math.round(railProgress * (galleryCards.length - 1))).padStart(2, '0');
        if (progressCurrent && progressCurrent.textContent !== current) progressCurrent.textContent = current;

        const methodProgress = (motion - method.start) / viewport;
        methodLines.forEach((element, index) => reveal(element, methodProgress, 0.12 + index * 0.09, 0.3, 'title'));
        methodCopy.forEach((element, index) => reveal(element, methodProgress, 0.26 + index * 0.07, 0.26));
        write(methodPicture, 'transform', `scale(${Math.round((1.06 - clamp(methodProgress / 2.8) * 0.06) * 1e4) / 1e4})`);
        const insightsProgress = (motion - insights.start) / viewport;
        reveal(insightsTitle, insightsProgress, 0.12, 0.3, 'title');
        reveal(insightsCopy, insightsProgress, 0.25, 0.28);
        stories.forEach((element, index) => reveal(element, insightsProgress, 0.36 + index * 0.08, 0.3, 'row'));
        instantRail = false;
        if (galleryPosition !== galleryTarget || smoothScroll !== position) frame = requestAnimationFrame(render);
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
