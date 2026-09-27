'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from '@phosphor-icons/react';
import styles from '@/app/home-editorial.module.css';

export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string>();
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduce, setReduce] = useState(true);
  const manuallyPaused = useRef(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setReduce(motion.matches);
      if (motion.matches) { video.current?.pause(); setSource(undefined); }
      else setSource(window.matchMedia('(max-width: 767px)').matches ? '/videos/cinematic-mobile.mp4' : '/videos/cinematic-desktop.mp4');
    };
    update();
    motion.addEventListener('change', update);
    return () => motion.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element || !source) return;
    let visible = true;
    const sync = () => {
      if (!visible || document.hidden || manuallyPaused.current) element.pause();
      else void element.play().catch(() => setPlaying(false));
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .05 });
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, [source]);

  async function toggle() {
    if (!video.current) return;
    if (playing) { manuallyPaused.current = true; video.current.pause(); }
    else { manuallyPaused.current = false; try { await video.current.play(); } catch { setPlaying(false); } }
  }

  return <><video ref={video} src={source} className={styles.heroVideo} data-ready={ready} muted loop playsInline preload="none" poster="/images/cinematic-hero.webp" aria-hidden="true" onCanPlay={() => { setReady(true); if (!manuallyPaused.current && !document.hidden) void video.current?.play().catch(() => setPlaying(false)); }} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setReady(false); setPlaying(false); }} />{!reduce && source && <button className={styles.videoToggle} onClick={toggle} aria-label={playing ? '배경 영상 일시정지' : '배경 영상 재생'}>{playing ? <Pause size={17} weight="fill" /> : <Play size={17} weight="fill" />}</button>}</>;
}
