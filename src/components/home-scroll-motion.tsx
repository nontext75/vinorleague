'use client';

import { useEffect } from 'react';
import { animate, inView, scroll, stagger } from 'motion';
import { useReducedMotion } from 'motion/react';
import styles from '@/app/home-editorial.module.css';

const ease = [0.22, 1, 0.36, 1] as const;

function splitWords(element: HTMLElement | null) {
  if (!element) return [];
  if (element.dataset.split !== 'true') {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    for (const node of nodes) {
      const fragment = document.createDocumentFragment();
      for (const part of (node.textContent ?? '').split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) { fragment.append(part); continue; }
        const word = document.createElement('span');
        word.className = 'motion-word';
        word.textContent = part;
        fragment.append(word);
      }
      node.replaceWith(fragment);
    }
    element.dataset.split = 'true';
  }
  return [...element.querySelectorAll<HTMLElement>('.motion-word')];
}

/** Enhances server-rendered markup; everything stays visible without JavaScript. */
export function HomeScrollMotion() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion !== false) return;
    const home = document.querySelector<HTMLElement>('.editorial-home');
    if (!home) return;
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const dispose: (() => void)[] = [];
    const hidden = new Set<HTMLElement>();

    const hide = (elements: HTMLElement[], from: Record<string, number | string>) => {
      const pending = elements.filter(element => element.getBoundingClientRect().bottom > 0);
      pending.forEach(element => hidden.add(element));
      if (pending.length) animate(pending, from, { duration: 0 });
      return pending;
    };

    function reveal(
      trigger: Element | null,
      elements: (HTMLElement | null | undefined)[],
      { y = mobile ? 28 : 48, delay = 0, gap = 0.08, duration = 1.1, amount = 0.25 } = {},
    ) {
      if (!trigger) return;
      const targets = hide(elements.filter((element): element is HTMLElement => !!element), { opacity: 0, y });
      if (!targets.length) return;
      dispose.push(inView(trigger, () => {
        targets.forEach(element => hidden.delete(element));
        animate(targets, { opacity: 1, y: 0 }, { duration, ease, delay: stagger(gap, { startDelay: delay }) });
      }, { amount }));
    }

    const sections = [...home.querySelectorAll<HTMLElement>(':scope > section')];
    const [hero, philosophy, work, services, insights] = sections;

    const title = hero?.querySelector<HTMLElement>(`.${styles.heroTitle}`);
    if (hero && title) {
      const recede = animate(title, { y: [0, mobile ? -40 : -120], opacity: [1, 0.2] }, { ease: 'linear', autoplay: false });
      dispose.push(scroll(recede, { target: hero, offset: ['start start', 'end start'] }), () => recede.cancel());
    }

    if (philosophy) {
      const heading = philosophy.querySelector<HTMLElement>('h2');
      reveal(philosophy, splitWords(heading), { gap: 0.045, duration: 1 });
      reveal(philosophy, [philosophy.querySelector<HTMLElement>(`.${styles.philosophyBody}`)], { delay: 0.35 });
    }

    if (work) {
      reveal(work, [work.querySelector<HTMLElement>(`.${styles.workHeading}`)], { amount: 0.15 });
      const cards = [...work.querySelectorAll<HTMLElement>('article')];
      const rows = mobile ? cards.map(card => [card]) : [cards.slice(0, 3), cards.slice(3, 6)];
      rows.forEach(row => {
        if (!row.length) return;
        const visuals = row.map(card => card.querySelector<HTMLElement>('[data-image]')).filter((v): v is HTMLElement => !!v);
        const images = visuals.map(visual => visual.querySelector<HTMLElement>('img')).filter((v): v is HTMLElement => !!v);
        const pendingVisuals = hide(visuals, { clipPath: 'inset(100% 0% 0% 0%)' });
        const pendingImages = hide(images, { scale: 1.14 });
        reveal(row[0], row, { y: mobile ? 24 : 36, gap: 0.1, duration: 1, amount: 0.2 });
        if (pendingVisuals.length) dispose.push(inView(row[0], () => {
          [...pendingVisuals, ...pendingImages].forEach(element => hidden.delete(element));
          animate(pendingVisuals, { clipPath: 'inset(0% 0% 0% 0%)' }, { duration: 1.2, ease, delay: stagger(0.1) });
          animate(pendingImages, { scale: 1 }, { duration: 1.6, ease, delay: stagger(0.1) });
        }, { amount: 0.2 }));
      });
    }

    if (services) {
      const inset = mobile ? 12 : 32;
      const open = animate(services, {
        clipPath: [`inset(0px ${inset}px round 28px)`, 'inset(0px 0px round 0px)'],
      }, { ease: 'linear', autoplay: false });
      dispose.push(scroll(open, { target: services, offset: ['start end', 'start 15%'] }), () => open.cancel());
      reveal(services, splitWords(services.querySelector<HTMLElement>(`.${styles.methodHeading} h2`)), { gap: 0.05, amount: 0.2 });
      reveal(services, [services.querySelector<HTMLElement>(`.${styles.methodBody}`)], { delay: 0.3, amount: 0.2 });
      const rows = [...services.querySelectorAll<HTMLElement>(`.${styles.service}`)];
      reveal(rows[0] ?? null, rows, { y: 32, gap: 0.09, delay: 0.15, amount: 0.1 });
    }

    if (insights) {
      reveal(insights, [insights.querySelector<HTMLElement>(`.${styles.sectionIntro}`)], { amount: 0.2 });
      const rows = [...insights.querySelectorAll<HTMLElement>(`.${styles.storyRow}`)];
      reveal(rows[0] ?? null, rows, { y: 36, gap: 0.12, delay: 0.15, amount: 0.15 });
    }

    const footer = document.querySelector<HTMLElement>('.home-footer');
    if (footer) {
      const invitation = footer.querySelector<HTMLElement>('.home-footer-invitation');
      reveal(footer, [invitation?.querySelector<HTMLElement>('h2, h3, p, [class*="heading"]') ?? invitation, invitation?.querySelector<HTMLElement>('a')], { gap: 0.15, amount: 0.2 });
      const wordmark = footer.querySelector<HTMLElement>('.wordmark');
      reveal(wordmark, [wordmark], { y: mobile ? 40 : 90, duration: 1.4, amount: 0.3 });
    }

    // A keyboard user must never land on an element that is still transparent.
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      const blocked = [...hidden].filter(element => element.contains(event.target as Node));
      if (!blocked.length) return;
      blocked.forEach(element => hidden.delete(element));
      animate(blocked, { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }, { duration: 0.3 });
    };
    document.addEventListener('focusin', onFocus);
    return () => {
      document.removeEventListener('focusin', onFocus);
      dispose.forEach(cleanup => cleanup());
    };
  }, [reducedMotion]);

  return null;
}
