'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, List, X } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import { Logo } from './logo';

const links = [['/work', 'Experience'], ['/studio', 'Studio'], ['/news', 'Story']] as const;
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (!open) return; const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } }; document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey); }, [open]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 48);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);
  return <header className={`site-header editorial-header ${pathname === '/' ? 'concept-header' : ''} ${scrolled ? 'is-scrolled' : ''}`}><div className="header-inner">
    <Link href="/" className="wordmark" aria-label="vinorleague 홈" onClick={() => setOpen(false)}><Logo/></Link>
    <nav className="desktop-nav" aria-label="주 메뉴">{links.map(([href, label]) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? 'page' : undefined}>{label}</Link>)}</nav>
    <Link className="header-contact" href="/contact">Contact <ArrowUpRight size={18} /></Link>
    <button ref={toggle} className="menu-toggle btn btn-ghost" aria-label={open ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X size={25} /> : <List size={25} />}</button>
  </div>{open && <motion.nav id="mobile-menu" className="mobile-nav" aria-label="모바일 메뉴" initial={reduce ? false : { opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .24, ease: [.22, 1, .36, 1] }}>{[...links, ['/contact', 'Contact']].map(([href, label], index) => <motion.div key={href} initial={reduce ? false : { opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .2, delay: index * .035 }}><Link href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={24} /></Link></motion.div>)}</motion.nav>}</header>;
}
