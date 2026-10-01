'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { animate, inView } from 'motion';

const ease = [0.22, 1, 0.36, 1] as const;
/**
 * `data-reveal` marks one element; `data-reveal-children` marks each direct child,
 * unless that child holds its own markers. Mirrored by the hide rule in editorial-theme.css.
 */
const targets = '[data-reveal], [data-reveal-children] > :not([data-reveal-children], :has([data-reveal], [data-reveal-children]))';

/** Subpage content rises once into place, in the same character as the footer entrance. */
export function RevealMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const main = document.getElementById('main');
    if (!main || main.querySelector('.editorial-home')) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let dispose = () => {};

    const setup = () => {
      dispose();
      if (preference.matches) return;
      document.documentElement.dataset.revealReady = '';
      const stops: (() => void)[] = [];
      const running = new Map<HTMLElement, { complete: () => void }>();
      let batch: HTMLElement[] = [];
      let frame = 0;
      let instant = false;

      const settle = (element: HTMLElement) => {
        element.dataset.revealed = '';
        element.style.opacity = '';
        element.style.transform = '';
      };
      // Elements entering view in the same frame rise as one staggered group, in reading order.
      const flush = () => {
        frame = 0;
        batch.sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
        batch.forEach((element, index) => {
          // `y` settles to `transform: none`, so finished elements keep no compositing layer.
          const travel = element.dataset.reveal === 'line' ? '0.5em' : 48;
          const animation = animate(element, { opacity: [0, 1], y: [travel, 0] }, { duration: 0.9, delay: Math.min(index, 8) * 0.08, ease });
          running.set(element, animation);
          animation.then(() => { running.delete(element); settle(element); });
        });
        batch = [];
      };
      const observe = (element: HTMLElement) => {
        if (instant) return settle(element);
        delete element.dataset.revealed;
        stops.push(inView(element, () => {
          batch.push(element);
          if (!frame) frame = requestAnimationFrame(flush);
        }, { margin: '0px 0px -12% 0px' }));
      };
      const collect = (root: ParentNode) => root.querySelectorAll<HTMLElement>(targets).forEach(observe);
      collect(main);
      // Content rendered later on the same page (e.g. a filtered project list) joins the system.
      const mutations = new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches(targets)) observe(node);
        collect(node);
      })));
      mutations.observe(main, { childList: true, subtree: true });

      const stop = () => {
        stops.splice(0).forEach(stopObserving => stopObserving());
        cancelAnimationFrame(frame);
        frame = 0;
        batch = [];
        running.forEach((animation, element) => { animation.complete(); settle(element); });
        running.clear();
      };
      // Keyboard users get the finished page straight away.
      const finish = () => {
        stop();
        instant = true;
        main.querySelectorAll<HTMLElement>(targets).forEach(settle);
      };
      const onFocus = (event: FocusEvent) => {
        if (!instant && event.target instanceof HTMLElement && event.target.matches(':focus-visible')) finish();
      };
      main.addEventListener('focusin', onFocus);
      dispose = () => {
        stop();
        mutations.disconnect();
        main.removeEventListener('focusin', onFocus);
      };
    };

    setup();
    preference.addEventListener('change', setup);
    return () => {
      dispose();
      preference.removeEventListener('change', setup);
    };
  }, [pathname]);

  return null;
}
