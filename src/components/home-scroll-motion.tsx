'use client';

import { useEffect, useRef } from 'react';
import styles from '@/app/home-editorial.module.css';

type Track = {
  element: HTMLElement;
  anchor: HTMLElement;
  animation: Animation;
  start: number;
  end: number;
  top: number;
  from: number;
  to: number;
  forced: boolean;
  intro: boolean;
  focusProgress: number;
  afterReading: boolean;
  reading: boolean;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));

// Layout coordinates do not change when an animated child is translated or scaled.
function layoutTop(element: HTMLElement) {
  let top = 0;
  let current: HTMLElement | null = element;
  while (current) {
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return top;
}

/** One paused animation per element, driven solely by the current scroll position. */
export function HomeScrollMotion() {
  const curtain = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const home = document.querySelector<HTMLElement>('.editorial-home');
    if (!home) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compact = window.matchMedia('(max-width: 767px)');
    let dispose = () => {};

    const setup = () => {
      dispose();
      if (preference.matches) {
        if (curtain.current) curtain.current.hidden = true;
        return;
      }

      home.dataset.scrollIntro = 'true';

      const opening = home.querySelector<HTMLElement>('[data-opening]');
      const visual = home.querySelector<HTMLElement>('[data-opening-visual]');
      const heroContent = home.querySelector<HTMLElement>(`.${styles.heroInner}`);
      const headerHeight = compact.matches ? 78 : 80;
      let readingDistance = 0;
      // The stage length is scroll distance, not an animation duration.
      const sizeOpening = () => {
        home.style.setProperty('--opening-top', `${headerHeight}px`);
        const available = window.innerHeight - headerHeight;
        home.style.setProperty('--opening-height', `${available}px`);
        // Never shrink type to fit a short viewport. Let the user read the remaining
        // content by scrolling it upward before the scene's exit can begin.
        readingDistance = Math.max(0, (heroContent?.offsetHeight ?? available) - available);
        home.style.setProperty('--opening-read-distance', `${readingDistance}px`);
        home.style.setProperty('--opening-distance', `${window.innerHeight * 2.65 + readingDistance}px`);
      };
      sizeOpening();

      const tracks: Track[] = [];
      let frame = 0;
      let alive = true;
      let needsMeasure = true;
      let viewport = window.innerHeight;
      const distance = compact.matches ? 12 : 20;

      const add = (
        element: HTMLElement | null,
        anchor: HTMLElement | null,
        keyframes: Keyframe[],
        start = 0.92,
        end = 0.48,
        intro = false,
        options: { focusProgress?: number; afterReading?: boolean; reading?: boolean } = {},
      ) => {
        if (!element || !anchor) return;
        const animation = element.animate(keyframes, { duration: 1000, fill: 'both' });
        animation.pause();
        animation.currentTime = 0;
        tracks.push({ element, anchor, animation, start, end, top: 0, from: 0, to: 0, forced: false, intro, focusProgress: options.focusProgress ?? 1, afterReading: options.afterReading ?? false, reading: options.reading ?? false });
      };

      const reveal = (element: HTMLElement | null, anchor = element, order = 0) => {
        add(element, anchor, [
          { opacity: 0, transform: `translateY(${distance}px)`, offset: 0 },
          { opacity: 1, transform: `translateY(${distance * 0.3}px)`, offset: 0.38 },
          { opacity: 1, transform: 'translateY(0)', offset: 1 },
        ], 0.84 - order * 0.055, 0.61 - order * 0.055);
      };

      const section = (className: string) => home.querySelector<HTMLElement>(`.${className}`);
      const hero = section(styles.intro);
      const philosophy = section(styles.philosophy);
      const work = section(styles.experience);
      const method = section(styles.method);
      const insights = section(styles.insights);

      // The first section is a scroll stage. Every beat is a distance, never a delay.
      if (hero) {
        const header = document.querySelector<HTMLElement>('.editorial-header');
        const enter = (element: HTMLElement | null, start: number, end: number, travel = distance) => {
          add(element, opening ?? hero, [
            { opacity: 0, transform: `translateY(${travel}px)`, offset: 0 },
            { opacity: 1, transform: `translateY(${travel * 0.24}px)`, offset: 0.4 },
            { opacity: 1, transform: 'translateY(0)', offset: 1 },
          ], start, end, true);
        };
        enter(header?.querySelector<HTMLElement>('.wordmark') ?? null, 0, 0.07, 0);
        header?.querySelectorAll<HTMLElement>('.desktop-nav a, .header-contact, .menu-toggle')
          .forEach(element => enter(element, 0.025, 0.11, 0));
        hero.querySelectorAll<HTMLElement>(`.${styles.titleLine}`)
          .forEach((line, index) => enter(line, 0.015 + index * 0.105, 0.19 + index * 0.11, compact.matches ? 24 : 44));
        enter(hero.querySelector<HTMLElement>(`.${styles.heroSubtitle}`), 0.34, 0.48, 12);
        const bottom = hero.querySelector<HTMLElement>(`.${styles.heroBottom}`);
        bottom?.querySelectorAll<HTMLElement>(':scope > *').forEach((element, index) => enter(element, 0.43 + index * 0.07, 0.56 + index * 0.07, 8));

        // Outer line wrappers own exits; inner spans retain independent entrance motion.
        hero.querySelectorAll<HTMLElement>(`.${styles.lineMask}`).forEach((line, index) => {
          add(line, opening, [
            { transform: 'translateX(0)', easing: 'cubic-bezier(.55,0,.8,.45)' },
            { transform: `translateX(${index % 2 ? '' : '-'}${compact.matches ? 32 : 96}px)` },
          ], 0.78 + index * 0.035, 1.18 + index * 0.035, true, { focusProgress: 0, afterReading: true });
        });
        add(hero, opening, [{ opacity: 1 }, { opacity: 0 }], 0.86, 1.16, true, { focusProgress: 0, afterReading: true });
        add(heroContent, opening, [{ transform: 'translateY(0)' }, { transform: `translateY(${-readingDistance}px)` }], 0.65, 0.65, true, { reading: true });
      }

      // This is a new visual scene, not a copy of Motto's image-to-word morph.
      // A central aperture opens only after the title starts leaving the stage.
      add(visual, opening, [
        { clipPath: 'inset(38% 50% 38% 50%)', easing: 'cubic-bezier(.32,0,.22,1)' },
        { clipPath: 'inset(0% 0% 0% 0%)' },
      ], 0.96, 1.62, true, { afterReading: true });
      add(visual?.querySelector<HTMLElement>('img') ?? null, opening, [
        { transform: 'scale(1.12)', easing: 'cubic-bezier(.2,.65,.3,1)' },
        { transform: 'scale(1)' },
      ], 0.96, 1.78, true, { afterReading: true });

      if (philosophy) {
        const heading = philosophy.querySelector<HTMLElement>('h2');
        philosophy.querySelectorAll<HTMLElement>(`.${styles.statementLine}`).forEach((line, index) => {
          add(line, heading, [
            { opacity: 0, transform: 'translateY(16px)', offset: 0 },
            { opacity: 1, transform: 'translateY(4px)', offset: 0.42 },
            { opacity: 1, transform: 'translateY(0)', offset: 1 },
          ], 0.9 - index * 0.085, 0.7 - index * 0.085);
        });
        philosophy.querySelectorAll<HTMLElement>(`.${styles.philosophyBody} p, .${styles.philosophyBody} > a`)
          .forEach(element => reveal(element));
      }

      const revealHeading = (container: HTMLElement | null) => {
        const heading = container?.querySelector<HTMLElement>('.section-header') ?? null;
        if (!heading) return;
        reveal(heading.querySelector<HTMLElement>('h2'), heading);
        heading.querySelectorAll<HTMLElement>('.section-header-copy > *').forEach((element, index) => reveal(element, heading, index + 1));
      };

      revealHeading(work);
      work?.querySelectorAll<HTMLElement>('article').forEach((card, index) => {
        const visual = card.querySelector<HTMLElement>('[data-image]');
        const picture = visual?.querySelector<HTMLElement>('img') ?? null;
        // Only the image is masked. Captions and letter descenders remain unclipped.
        const columnOffset = compact.matches ? 0 : (index % 2) * 0.035;
        add(visual, card, [
          { opacity: 0, clipPath: 'inset(12% 0 12% 0)', offset: 0 },
          { opacity: 1, clipPath: 'inset(5% 0 5% 0)', offset: 0.32 },
          { opacity: 1, clipPath: 'inset(0% 0 0% 0)', offset: 1 },
        ], 0.94 - columnOffset, 0.6 - columnOffset);
        add(picture, card, [
          { transform: 'scale(1.045)' },
          { transform: 'scale(1)' },
        ], 0.94 - columnOffset, 0.55 - columnOffset);
        // Captions arrive together so title, category and description read as one unit.
        const caption = card.querySelector<HTMLElement>('[data-image] ~ *');
        card.querySelectorAll<HTMLElement>('[data-image] ~ *').forEach(element => {
          add(element, caption, [
            { opacity: 0, transform: 'translateY(8px)', offset: 0 },
            { opacity: 1, transform: 'translateY(2px)', offset: 0.35 },
            { opacity: 1, transform: 'translateY(0)', offset: 1 },
          ], 0.88, 0.7);
        });
      });

      if (method) {
        const heading = method.querySelector<HTMLElement>('h2');
        method.querySelectorAll<HTMLElement>(`.${styles.methodLine}`).forEach((line, index) => reveal(line, heading, index));
        method.querySelectorAll<HTMLElement>(`.${styles.methodBody} > p > span, .${styles.methodLinks}`)
          .forEach(element => reveal(element));
        const picture = method.querySelector<HTMLElement>(`.${styles.methodBg} img`);
        // Fixed overscan prevents the image exposing an edge at either end of travel.
        add(picture, method, [
          { transform: 'translateY(2%) scale(1.08)' },
          { transform: 'translateY(-2%) scale(1.08)' },
        ], 1, -1);
      }

      revealHeading(insights);
      insights?.querySelectorAll<HTMLElement>(`.${styles.storyRow}`).forEach(row => {
        const thumbnail = row.querySelector<HTMLElement>(`.${styles.storyThumb}`);
        add(thumbnail, row, [
          { opacity: 0, transform: 'translateY(12px)', offset: 0 },
          { opacity: 1, transform: 'translateY(3px)', offset: 0.35 },
          { opacity: 1, transform: 'translateY(0)', offset: 1 },
        ], 0.88, 0.64);
        reveal(row.querySelector<HTMLElement>(`.${styles.storyThumb} + div`), row, 0.6);
      });

      const footer = document.querySelector<HTMLElement>('.home-footer');
      const footerContent = footer?.querySelector<HTMLElement>(':scope > .container') ?? null;
      // The footer is revealed as one composition. No extra per-line fade on top.
      add(footerContent, footer, [
        { transform: 'translateY(-24vh)' },
        { transform: 'translateY(0)' },
      ], 1, 0.08);

      const render = () => {
        frame = 0;
        if (needsMeasure) {
          viewport = window.innerHeight;
          sizeOpening();
          const maxScroll = document.documentElement.scrollHeight - viewport;
          tracks.forEach(track => {
            track.top = layoutTop(track.anchor);
            if (track.intro) {
              const origin = track.top - (compact.matches ? 78 : 80);
              track.from = origin + viewport * track.start + (track.afterReading ? readingDistance : 0);
              track.to = origin + viewport * track.end + (track.afterReading ? readingDistance : 0);
              if (track.reading) {
                track.to = track.from + Math.max(1, readingDistance);
                (track.animation.effect as KeyframeEffect).setKeyframes([
                  { transform: 'translateY(0)' }, { transform: `translateY(${-readingDistance}px)` },
                ]);
              }
              return;
            }
            track.from = track.top - viewport * track.start;
            track.to = track.top - viewport * track.end;
            const section = track.element.closest<HTMLElement>('section, footer');
            // Content that fits in a section's first screen is readable at its snap stop.
            // Long galleries retain independent progress for cards below the first screen.
            if (section && track.end > 0) {
              const boundary = layoutTop(section);
              const bottom = layoutTop(track.element) + track.element.offsetHeight;
              if (bottom <= boundary + viewport - 100) {
                track.to = Math.min(track.to, boundary - 80);
                track.from = Math.min(track.from, track.to - viewport * 0.25);
              }
            }
            track.to = Math.min(track.to, maxScroll);
          });
          needsMeasure = false;
        }
        const position = window.scrollY;
        tracks.forEach(track => {
          const progress = track.forced ? track.focusProgress : clamp(
            (position - track.from) / (track.to - track.from),
          );
          // Keyframes shape the movement in scroll space, with a crisp reveal and a soft landing.
          // The playhead never advances on its own.
          track.animation.currentTime = progress * 1000;
        });
        // A fully covered hero must not retain invisible pointer targets.
        if (hero && opening) {
          hero.style.pointerEvents = position > layoutTop(opening) - headerHeight + viewport * 1.16 + readingDistance ? 'none' : '';
        }
      };

      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(render);
      };
      const measure = () => { needsMeasure = true; schedule(); };
      const onScroll = () => {
        schedule();
      };
      const onFocus = (event: FocusEvent) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        if (hero?.contains(target) && opening) {
          const origin = layoutTop(opening) - headerHeight;
          if (window.scrollY < origin + viewport * 0.55 + readingDistance || window.scrollY > origin + viewport * 0.78 + readingDistance) {
            window.scrollTo({ top: origin + viewport * 0.65 + readingDistance, behavior: 'instant' });
          }
        }
        tracks.forEach(track => {
          // A focused link also reveals its masked image and caption children.
          track.forced = track.element.contains(target) || target.contains(track.element);
        });
        schedule();
      };
      const onBlur = () => {
        tracks.forEach(track => { track.forced = false; });
        schedule();
      };

      const resize = new ResizeObserver(measure);
      resize.observe(home);
      if (heroContent) resize.observe(heroContent);
      const header = document.querySelector<HTMLElement>('.site-header');
      if (header) resize.observe(header);
      if (footer) resize.observe(footer);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', measure);
      window.addEventListener('pageshow', measure);
      document.addEventListener('focusin', onFocus);
      document.addEventListener('focusout', onBlur);
      void document.fonts.ready.then(() => { if (alive) measure(); });
      render();
      if (curtain.current) curtain.current.hidden = true;

      dispose = () => {
        alive = false;
        cancelAnimationFrame(frame);
        resize.disconnect();
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', measure);
        window.removeEventListener('pageshow', measure);
        document.removeEventListener('focusin', onFocus);
        document.removeEventListener('focusout', onBlur);
        // Cancelling releases every animated property, including on reduced-motion changes.
        tracks.forEach(track => track.animation.cancel());
        if (hero) hero.style.pointerEvents = '';
        delete home.dataset.scrollIntro;
        ['--opening-top', '--opening-height', '--opening-distance', '--opening-read-distance'].forEach(property => home.style.removeProperty(property));
      };
    };

    setup();
    preference.addEventListener('change', setup);
    compact.addEventListener('change', setup);
    return () => {
      dispose();
      preference.removeEventListener('change', setup);
      compact.removeEventListener('change', setup);
    };
  }, []);

  return <div ref={curtain} className={styles.introCurtain} aria-hidden="true" />;
}
