'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { animate, inView } from 'motion';
import { readMotionEase, readMotionToken } from '@/lib/motion-tokens';

/** Each group finishes its entrance even when the visitor stops scrolling. */
export function FooterMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const footer = document.querySelector<HTMLElement>('.home-footer');
    if (!footer) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const ease = readMotionEase();
    const enterDuration = readMotionToken('--motion-footer-enter-duration', 0.82);
    const titleStagger = readMotionToken('--motion-footer-title-stagger', 0.11);
    const detailStagger = readMotionToken('--motion-footer-detail-stagger', 0.08);
    const detailDelay = readMotionToken('--motion-footer-detail-delay', 0.32);
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
      const rise = (element: HTMLElement | null, delay: number, travel: string, duration = enterDuration) => {
        if (!element) return;
        animations.push(animate(element, {
          opacity: [0, 1],
          transform: [`translate3d(0, ${travel}, 0)`, 'translate3d(0, 0, 0)'],
        }, { duration, delay, ease }));
      };
      // Independent visibility thresholds also work on a footer taller than the screen.
      const stopInvitation = inView(invitation, () => {
        titleLines.forEach((line, index) => rise(line, index * titleStagger, '115%'));
        rise(link, titleStagger * 2.5, '18px', enterDuration * 0.74);
      }, { amount: 0.25 });
      const stopBottom = inView(bottom, () => {
        if (rule) animations.push(animate(rule, { transform: ['scaleX(0)', 'scaleX(1)'] }, { duration: enterDuration * 1.08, ease }));
        letters.forEach((letter, index) => rise(letter, 0.08 + index * 0.035, '115%', enterDuration * 1.16));
        details.forEach((element, index) => rise(element, detailDelay + index * detailStagger, '12px', enterDuration * 0.68));
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
