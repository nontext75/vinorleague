// src/app/(site)/characters/kkakdugi-pa/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function KkakdugiPaPage() {
  return (
    <div className="page-wrapper">
      <div className="mesh-overlay bg-mesh"></div>

      <main className="page-main">
        {/* Editorial Header System */}
        <header className="editorial-header">
          <span className="text-label text-[#FD2F79] mb-4 block tracking-[0.4em] uppercase">Characters</span>
          <h1 className="text-h1 !text-6xl md:!text-[140px] tracking-[-0.05em] leading-[0.8] mb-12 uppercase">
            Coming <br/> Soon.
          </h1>

          <div className="flex flex-col gap-4 mb-16">
            <p className="text-[#5a4838]/80 font-outfit text-lg md:text-xl font-black tracking-tight italic">
              "잠시만 기다려주세요."
            </p>
            <p className="text-[#5a4838]/60 leading-relaxed font-outfit text-sm md:text-base max-w-2xl mx-auto font-medium tracking-tight">
              깍두기파 패밀리의 이야기는 현재 열심히 준비 중입니다. <br/>
              곧 더 멋진 비주얼과 스토리로 찾아뵙겠습니다.
            </p>
          </div>

          {/* Editorial Banner System - Placeholder */}
          <div className="editorial-banner">
             <div className="absolute inset-0 bg-[#5a4838]/5 animate-pulse flex items-center justify-center">
                <span className="font-outfit font-black text-4xl text-[#5a4838]/10 tracking-[0.5em] uppercase">Under Construction</span>
             </div>
          </div>
        </header>

        <section className="max-w-[1400px] mx-auto px-8 md:px-12 mt-80 flex flex-col items-center">
           <Link href="/characters" className="back-link">
             BACK TO INDEX →
           </Link>
        </section>
      </main>

      {/* Footer System Label */}
      <div className="watermark">
        <span className="font-outfit text-[7px] font-black tracking-[1em] uppercase text-[#5a4838]">Vinorleague Digital Anthology v2.0</span>
      </div>
    </div>
  );
}
