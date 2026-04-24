// src/app/(site)/characters/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function CharactersPage() {
  const families = [
    {
      slug: 'wassup',
      name: '와썹',
      engName: 'WASSUP',
      desc: '와니와 썹의 따뜻하고 느긋한 일상 이야기. 작은 대나무통 속에서 발견한 커다란 세계.',
      img: '/wani_profile.png'
    },
    {
      slug: 'oh-daeri',
      name: '오덕상사 오대리',
      engName: 'OH DAERI',
      desc: '포기를 모르는 5년차 대리님의 눈물겨운 오피스 생존기. 오늘도 맥주 한 캔으로 버팁니다.',
      img: '/odaeri_profile.png'
    },
    {
      slug: 'kkakdugi-pa',
      name: '깍두기파',
      engName: 'KKAKDUGI MAFIA',
      desc: '반찬가게를 탈출한 깍두기와 파의 조폭 누아르 패러디. 상온의 세계에서 살아남아라!',
      img: '/hero-kkaktugi.png'
    }
  ];

  return (
    <div className="page-wrapper">
      <div className="mesh-overlay bg-mesh"></div>

      <main className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 pt-32 pb-60">
        
        {/* Header - Perfect Sync with Main Page Hierarchy */}
        <header className="flex flex-col items-center text-center mb-24 md:mb-32">
          <span className="text-label text-[#FD2F79] mb-4 block">Characters Archive</span>
          <h1 className="text-h1 !text-5xl sm:!text-7xl md:!text-[120px] mb-8 leading-[0.8] tracking-[-0.05em] text-[#5a4838]">
            Beyond<br/>Characters.
          </h1>
          <p className="text-[#5a4838]/60 leading-relaxed font-outfit text-sm md:text-base max-w-2xl mx-auto font-medium tracking-tight">
            바이너리그의 세 가지 독창적인 세계관과 그 속의 주인공들을 만나보세요.
          </p>
        </header>

        {/* Character Grid - High Density Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          {families.map((family) => (
            <Link 
              key={family.slug} 
              href={`/characters/${family.slug}`}
              className="group flex flex-col items-center text-center focus:outline-none"
            >
              {/* Image Area - Zero Distortion */}
              <div className="relative w-full aspect-square mb-6 md:mb-10">
                 <Image 
                   src={family.img} 
                   alt={family.name} 
                   fill 
                   priority
                   className="object-contain transition-transform duration-700 group-hover:scale-105" 
                 />
              </div>

              {/* Typography Block - Maximum Density (Tracking & Leading) */}
              <div className="flex flex-col items-center">
                <h3 className="font-sans font-black text-3xl md:text-[44px] text-[#5a4838] tracking-[-0.07em] leading-none mb-3 group-hover:text-[#FD2F79] transition-colors duration-500">
                  {family.name}
                </h3>
                <p className="text-label !text-[11px] !opacity-20 mb-6 tracking-[0.3em] font-black">
                  Vinorleague
                </p>
                <div className="max-w-[260px]">
                  <p className="text-[#5a4838]/50 text-xs md:text-[13px] leading-snug font-bold tracking-tighter break-keep">
                    {family.desc}
                  </p>
                </div>
                
                {/* Minimal Accent */}
                <div className="mt-8 w-8 h-[1.5px] bg-[#5a4838]/10 group-hover:w-16 group-hover:bg-[#FD2F79] transition-all duration-700"></div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer System Label */}
      <div className="fixed bottom-10 left-10 pointer-events-none opacity-5">
         <span className="font-outfit text-[7px] font-black tracking-[1em] uppercase text-[#5a4838]">
           Vinorleague Digital Anthology v2.0
         </span>
      </div>
    </div>
  );
}
