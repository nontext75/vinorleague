"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    id: 1,
    label: "Volume. 01",
    title: "Simple Days,\nBeautiful Memories.",
    sub: "Vinor league Collection",
    image: "/hero.png",
    cta: { text: "Explore Collection", href: "/shop" },
    accent: "from-transparent via-[#5a4838]/5 to-[#5a4838]/30",
  },
  {
    id: 2,
    label: "Volume. 02",
    title: "Coming\nSoon.",
    sub: "New Character Family",
    image: "/scene1.jpg",
    cta: null,
    accent: "from-transparent via-[#1a2a3a]/10 to-[#1a2a3a]/40",
    overlay: true,
  },
  {
    id: 3,
    label: "Volume. 03",
    title: "Coming\nSoon.",
    sub: "New Character Family",
    image: "/scene3.jpg",
    cta: null,
    accent: "from-transparent via-[#2a1a3a]/10 to-[#2a1a3a]/40",
    overlay: true,
  },
  {
    id: 4,
    label: "Special",
    title: "Spring\nArchive Sale.",
    sub: "Limited Time Campaign · 2026",
    image: "/scene4.jpg",
    cta: { text: "Shop the Sale", href: "/shop" },
    accent: "from-transparent via-[#FD2F79]/10 to-[#FD2F79]/30",
    badge: "SALE",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (transitioning || idx === current) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrent(idx);
        setTransitioning(false);
      }, 400);
    },
    [current, transitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative w-full h-[70vh] flex items-center justify-center mt-[88px] pt-4 px-8">
      <div className="relative w-full h-full anthology-card soft-shadow overflow-hidden">

        {/* Slide Images */}
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={s.image}
              alt={s.sub}
              fill
              className={`object-cover ${s.overlay ? "brightness-75" : "opacity-95"}`}
              priority={i === 0}
              quality={100}
            />
          </div>
        ))}

        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${slide.accent} transition-all duration-700`}
        />

        {/* Badge (Sale etc.) */}
        {slide.badge && (
          <div className="absolute top-8 right-8 z-20">
            <span className="font-outfit text-[10px] font-black tracking-[0.4em] bg-[#FD2F79] text-white px-5 py-2.5 rounded-full uppercase shadow-lg">
              {slide.badge}
            </span>
          </div>
        )}

        {/* Content */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-end pb-28 z-10 transition-all duration-500 ${
            transitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          <h4 className="font-outfit text-[10px] font-black tracking-[0.6em] text-white/60 uppercase mb-4">
            {slide.label}
          </h4>
          <h1 className="font-outfit font-black text-6xl md:text-9xl text-white text-center leading-[0.85] tracking-tighter uppercase whitespace-pre-line">
            {slide.title}
          </h1>
          <p className="mt-5 font-outfit text-[10px] font-black tracking-[0.4em] text-white/50 uppercase">
            {slide.sub}
          </p>
          {slide.cta && (
            <Link
              href={slide.cta.href}
              className="mt-8 font-outfit text-[10px] font-black tracking-[0.4em] text-white uppercase border border-white/30 px-8 py-3 rounded-full hover:bg-white hover:text-[#5a4838] transition-all"
            >
              {slide.cta.text}
            </Link>
          )}
        </div>

        {/* Dot Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-500 ${
                i === current
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-8 right-8 z-20">
          <span className="font-outfit text-[9px] font-black tracking-[0.3em] text-white/30 uppercase">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
