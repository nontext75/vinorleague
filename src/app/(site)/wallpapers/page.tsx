"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type DeviceType = "Mobile" | "PC";

interface Wallpaper {
  id: string;
  title: string;
  character: string;
  desc: string;
  type: DeviceType;
  url: string;
  thumbnail: string;
}

const WALLPAPERS: Wallpaper[] = [
  {
    id: "1",
    title: "와니의 아침",
    character: "WASSUP",
    desc: "Wani · Morning Edition",
    type: "Mobile",
    url: "/hero-wassup.png",
    thumbnail: "/hero-wassup.png",
  },
  {
    id: "2",
    title: "오대리 오피스",
    character: "OH-DAERI",
    desc: "Oh-Daeri · Daily Edition",
    type: "Mobile",
    url: "/hero-odaeri.png",
    thumbnail: "/hero-odaeri.png",
  },
  {
    id: "3",
    title: "마피아 레드",
    character: "KKAKDUGI",
    desc: "Kkakdugi · Signature Edition",
    type: "Mobile",
    url: "/hero-kkaktugi.png",
    thumbnail: "/hero-kkaktugi.png",
  },
  {
    id: "4",
    title: "패밀리 콜렉티브",
    character: "COLLECTIVE",
    desc: "All Characters · Family Edition",
    type: "Mobile",
    url: "/characters_collage.png",
    thumbnail: "/characters_collage.png",
  },
];

export default function WallpapersPage() {
  const [device, setDevice] = useState<DeviceType>("Mobile");
  const visible = WALLPAPERS.filter((w) => w.type === device);

  return (
    <div className="min-h-screen bg-white relative font-sans selection:bg-[#FD2F79]/10 selection:text-[#FD2F79] overflow-hidden">
      <div className="fixed inset-0 bg-mesh opacity-30 pointer-events-none z-0" />
      <main className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-40 pb-80">

        {/* Header */}
        <header className="mb-16 md:mb-20 text-center">
          <span className="text-label text-[#FD2F79] mb-4 block tracking-[0.4em]">Download</span>
          <h1 className="text-h1 !text-[64px] md:!text-[120px] leading-[0.85] mb-8">
            Wallpaper.
          </h1>
          <p className="font-outfit text-sm text-[#5a4838]/50 leading-relaxed font-medium max-w-md mx-auto">
            바이너리그의 세계관을 내 화면에 담아보세요.
            모든 디바이스에 최적화된 고해상도 이미지를 무료로 제공합니다.
          </p>

          {/* Device filter */}
          <div className="flex justify-center gap-2 mt-10">
            {(["Mobile", "PC"] as DeviceType[]).map((d) => {
              const isPC = d === "PC";
              return (
                <button
                  key={d}
                  onClick={() => !isPC && setDevice(d)}
                  disabled={isPC}
                  className={`font-outfit text-[11px] font-black tracking-[0.2em] uppercase px-5 py-2.5 rounded-full border transition-all duration-300 ${
                    isPC
                      ? "border-[#5a4838]/10 text-[#5a4838]/20 cursor-not-allowed"
                      : device === d
                      ? "bg-[#FD2F79] text-white border-[#FD2F79] shadow-[0_4px_20px_rgba(253,47,121,0.25)]"
                      : "border-[#5a4838]/15 text-[#5a4838]/40 hover:border-[#5a4838]/40 hover:text-[#5a4838]"
                  }`}
                >
                  {d === "PC" ? "PC — 준비 중" : d}
                </button>
              );
            })}
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
          {visible.map((wp, idx) => (
            <div
              key={wp.id}
              className={`group flex flex-col ${idx % 4 === 1 ? "lg:translate-y-10" : idx % 4 === 3 ? "lg:translate-y-5" : ""}`}
            >
              {/* Phone card */}
              <div className="relative aspect-[9/16] rounded-[28px] md:rounded-[36px] overflow-hidden bg-[#5a4838]/5 soft-shadow border border-[#5a4838]/5 group-hover:-translate-y-3 group-hover:shadow-[0_48px_100px_-16px_rgba(253,47,121,0.18)] transition-all duration-700">
                <Image
                  src={wp.thumbnail}
                  alt={wp.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[2500ms] group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#5a4838]/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-5 p-6 text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="font-outfit text-[9px] font-black tracking-[0.5em] text-white/30 uppercase">Free</span>
                    <h3 className="font-outfit font-black text-white text-lg tracking-tight leading-none">{wp.title}</h3>
                    <span className="font-outfit text-[9px] font-black tracking-[0.2em] text-white/40 uppercase">{wp.character}</span>
                  </div>
                  <a
                    href={wp.url}
                    download
                    className="font-outfit text-[10px] font-black tracking-[0.15em] uppercase bg-[#FD2F79] text-white px-6 py-3 rounded-full hover:bg-white hover:text-[#FD2F79] transition-all shadow-lg"
                  >
                    저장하기 ↓
                  </a>
                </div>
              </div>

              {/* Info + download */}
              <div className="mt-4 flex items-center justify-between px-0.5">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <h3 className="font-outfit font-black text-base text-[#5a4838] tracking-tight leading-snug truncate">
                    {wp.title}
                  </h3>
                  <span className="font-outfit text-[10px] font-medium text-[#5a4838]/35 tracking-wider truncate">
                    {wp.desc}
                  </span>
                </div>
                <a
                  href={wp.url}
                  download
                  title={`${wp.title} 저장`}
                  className="shrink-0 ml-3 w-8 h-8 rounded-full border border-[#5a4838]/15 flex items-center justify-center hover:bg-[#FD2F79] hover:border-[#FD2F79] transition-all group/dl"
                >
                  <svg
                    className="w-3 h-3 text-[#5a4838]/40 group-hover/dl:text-white transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <section className="mt-28">
          <div className="bg-[#5a4838] rounded-[40px] md:rounded-[56px] p-10 md:p-16 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <span className="text-label text-[#FD2F79] mb-3 block tracking-[0.4em]">Custom Request</span>
                <h2 className="text-h2 !text-white !text-3xl md:!text-5xl leading-[1]">
                  나만의 월페이퍼,<br />맞춤 제작해드립니다.
                </h2>
              </div>
              <Link
                href="/commission"
                className="shrink-0 font-outfit text-[12px] font-black tracking-[0.2em] uppercase bg-[#FD2F79] text-white px-9 py-4 rounded-full hover:bg-white hover:text-[#5a4838] transition-all shadow-xl whitespace-nowrap"
              >
                커스텀 의뢰하기 →
              </Link>
            </div>
            <div className="absolute -right-4 -bottom-4 font-outfit font-black text-[140px] text-white/[0.04] leading-none select-none pointer-events-none">
              WP
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
