'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { animate, inView } from 'motion';

const ease = [0.22, 1, 0.36, 1] as const;

/** Each group finishes its entrance even when the visitor stops scrolling. */
export function FooterMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const footer = document.querySelector<HTMLElement>('.home-footer');
    if (!footer) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const invitation = footer.querySelector<HTMLElement>('.home-footer-invitation');
    const bottom = footer.querySelector<HTMLElement>('.footer-bottom');
    if (!invitation || !bottom) return;
    const titleLines = [...footer.querySelectorAll<HTMLElement>('.footer-title-line')];
    const letters = [...footer.querySelectorAll<HTMLElement>('.footer-letter')];
    const link = footer.querySelector<HTMLElement>('.footer-project-link');
    const rule = footer.querySelector<HTMLElement>('.footer-rule');
    const details = [...bottom.querySelectorAll<HTMLElement>(':scope > p, .back-top')];
    const elements = [...titleLines, ...letters, link, rule, ...details];
    let dispose = () => {};

    const setup = () => {
      dispose();
      if (preference.matches) return;
      const animations: { stop: () => void }[] = [];
      footer.dataset.footerMotion = 'ready';
      const rise = (element: HTMLElement | null, delay: number, travel: string, duration = 0.85) => {
        if (!element) return;
        animations.push(animate(element, {
          opacity: [0, 1],
          transform: [`translate3d(0, ${travel}, 0)`, 'translate3d(0, 0, 0)'],
        }, { duration, delay, ease }));
      };
      // Independent visibility thresholds also work on a footer taller than the screen.
      const stopInvitation = inView(invitation, () => {
        titleLines.forEach((line, index) => rise(line, index * 0.11, '110%'));
        rise(link, 0.28, '16px', 0.6);
      }, { amount: 0.25 });
      const stopBottom = inView(bottom, () => {
        if (rule) animations.push(animate(rule, { transform: ['scaleX(0)', 'scaleX(1)'] }, { duration: 0.9, ease }));
        letters.forEach((letter, index) => rise(letter, 0.08 + index * 0.035, '110%', 0.95));
        details.forEach((element, index) => rise(element, 0.42 + index * 0.08, '10px', 0.5));
      }, { amount: 0.2 });
      const finish = () => {
        stopInvitation();
        stopBottom();
        animations.forEach(animation => animation.stop());
        delete footer.dataset.footerMotion;
        elements.forEach(element => {
          if (element) { element.style.opacity = ''; element.style.transform = ''; }
        });
      };
      const onFocus = (event: FocusEvent) => {
        if (event.target instanceof HTMLElement && event.target.matches(':focus-visible')) finish();
      };
      footer.addEventListener('focusin', onFocus);
      dispose = () => {
        finish();
        footer.removeEventListener('focusin', onFocus);
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
