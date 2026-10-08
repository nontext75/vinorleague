'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { animate, inView } from 'motion';
import { readMotionEase, readMotionToken } from '@/lib/motion-tokens';

/**
 * `data-reveal` marks one element; `data-reveal-children` marks each direct child,
 * unless that child holds its own markers. Text stays visible if motion is delayed.
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
      const stops: (() => void)[] = [];
      const running = new Map<HTMLElement, { complete: () => void }>();
      const ease = readMotionEase();
      const duration = readMotionToken('--motion-reveal-duration', 0.82);
      const distance = Math.min(readMotionToken('--motion-reveal-distance', 64), 24);
      const stagger = Math.min(readMotionToken('--motion-reveal-stagger', 0.075), 0.04);
      let batch: HTMLElement[] = [];
      let frame = 0;
      let instant = false;
      const observed = new WeakSet<HTMLElement>();
      const queued = new Set<HTMLElement>();
      const prepared = new Map<HTMLElement, string>();

      const startTransform = (element: HTMLElement) =>
        `translate3d(0, ${element.dataset.reveal === 'image' ? distance / 2 : distance}px, 0)`;

      const settle = (element: HTMLElement) => {
        element.dataset.revealed = 'true';
        if (prepared.has(element)) {
          element.style.transform = prepared.get(element)!;
          prepared.delete(element);
        }
      };
      // Elements entering view in the same frame rise as one staggered group, in reading order.
      const flush = () => {
        frame = 0;
        batch.sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
        batch.forEach((element, index) => {
          queued.delete(element);
          if (!element.isConnected || element.dataset.revealed) return;
          try {
            const animation = animate(element, {
              transform: [startTransform(element), 'translate3d(0, 0, 0)'],
            }, { duration: Math.min(duration, 0.65), delay: Math.min(index, 3) * stagger, ease });
            running.set(element, animation);
            animation.then(() => { running.delete(element); settle(element); });
          } catch {
            settle(element);
          }
        });
        batch = [];
      };
      const reveal = (element: HTMLElement) => {
        if (instant || !element.isConnected || element.dataset.revealed || running.has(element) || queued.has(element)) return;
        queued.add(element);
        batch.push(element);
        if (!frame) frame = requestAnimationFrame(flush);
      };
      const observe = (element: HTMLElement) => {
        if (instant) return settle(element);
        if (observed.has(element) || element.dataset.revealed) return;
        observed.add(element);
        // Prepare before entry so visible content never jumps down when observed.
        prepared.set(element, element.style.transform);
        element.style.transform = startTransform(element);
        try {
          stops.push(inView(element, () => reveal(element), { margin: '0px 0px 64px 0px' }));
        } catch {
          settle(element);
        }
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
        queued.clear();
        running.forEach((animation, element) => { animation.complete(); settle(element); });
        running.clear();
        prepared.forEach((transform, element) => { element.style.transform = transform; });
        prepared.clear();
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
