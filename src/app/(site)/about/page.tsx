// src/app/(site)/about/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      <div className="mesh-overlay bg-mesh"></div>

      <main className="page-main">
        {/* Editorial Header System */}
        <header className="editorial-header">
          <span className="text-label text-[#FD2F79] mb-4 block tracking-[0.4em] uppercase">Our Story</span>
          <h1 className="text-h1 !text-6xl md:!text-[140px] tracking-[-0.05em] leading-[0.8] mb-12 uppercase">
            Story.
          </h1>

          <p className="font-outfit text-sm md:text-lg leading-relaxed text-[#5a4838]/60 font-medium max-w-xl mx-auto mt-4">
            바이너리그(Vinorleague)는 파편화된 모든 순간들을 하나의 정교한 &apos;장막(League)&apos; 아래 기록합니다.
            캐릭터와 서사, 그리고 당신의 일상이 만나는 지점을 정밀하게 설계합니다.
          </p>

          {/* Editorial Banner System */}
          <div className="editorial-banner group mt-32">
             <div className="absolute inset-0 bg-[#5a4838]/5 animate-pulse"></div>
             <Image 
               src="/hero.png"
               alt="Vinorleague Spirit"
               fill
               className="object-cover transition-transform duration-1000 group-hover:scale-105"
             />
          </div>
        </header>

        {/* Narrative Sections */}
        <section className="flex flex-col gap-60 md:gap-80 mt-60">
          {/* Section 01 */}
          <div className="editorial-character-row">
            <div className="relative flex-1 w-full aspect-square bg-white p-12 shadow-[0_40px_100px_-20px_rgba(90,72,56,0.15)] rounded-[60px] overflow-hidden">
               <Image 
                 src="/brand_spirit.png" 
                 alt="Visual Core" 
                 fill 
                 className="object-cover transition-transform duration-[3000ms] hover:scale-110" 
               />
            </div>

            <div className="flex-1 flex flex-col gap-6 md:gap-8">
              <span className="text-label text-[#FD2F79] !opacity-100 tracking-[0.5em] !text-[12px]">Component 01</span>
              <h2 className="font-outfit font-black text-4xl md:text-8xl text-[#5a4838] tracking-[-0.04em] leading-[0.9] uppercase break-keep">
                Bold Styles,<br/>Infinite<br/>Stories.
              </h2>
              <p className="font-outfit text-sm md:text-lg text-[#5a4838]/60 leading-relaxed font-medium max-w-md break-keep">
                우리는 강렬한 컬러와 기하학적인 타이포그래피를 통해 일상의 매너리즘을 타파합니다.
                바이너리그의 모든 아카이브는 당신의 매일을 특별한 리그의 한 장면으로 조립할 것입니다.
              </p>
            </div>
          </div>

          {/* Section 02 */}
          <div className="editorial-character-row-reverse">
            <div className="relative flex-1 w-full aspect-square bg-white p-12 shadow-[0_40px_100px_-20px_rgba(90,72,56,0.15)] rounded-[60px] overflow-hidden">
               <Image 
                 src="/scene1.jpg" 
                 alt="Sensory Injection" 
                 fill 
                 className="object-cover transition-transform duration-[3000ms] hover:scale-110" 
               />
            </div>

            <div className="flex-1 flex flex-col gap-6 md:gap-8 text-right items-end">
              <span className="text-label text-[#FD2F79] !opacity-100 tracking-[0.5em] !text-[12px]">Component 02</span>
              <h2 className="font-outfit font-black text-4xl md:text-8xl text-[#5a4838] tracking-[-0.04em] leading-[0.9] uppercase break-keep">
                Beyond the<br/>Ordinary<br/>Sensory.
              </h2>
              <p className="font-outfit text-sm md:text-lg text-[#5a4838]/60 leading-relaxed font-medium max-w-md break-keep">
                바이너리그는 당신의 책상 위, 가방 속, 그리고 모든 생활 공간에
                에너제틱한 영감을 주입합니다. 작은 디테일의 분할과 결합이 가져오는
                커다란 시각적 즐거움을 경험하세요.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Strip */}
        <footer className="max-w-[1400px] mx-auto px-8 md:px-12 mt-80 flex flex-col items-center gap-12">
           <div className="w-[1px] h-32 bg-[#5a4838]/10"></div>
           <p className="font-outfit text-4xl md:text-[64px] font-black text-[#FD2F79] hover:text-[#5a4838] transition-all cursor-pointer tracking-tighter leading-none lowercase">
             hello@vinorleague.com
           </p>
           <Link href="/" className="back-link">
             BACK TO INDEX →
           </Link>
        </footer>
      </main>

      {/* Footer System Label */}
      <div className="watermark">
        <span className="font-outfit text-[7px] font-black tracking-[1em] uppercase text-[#5a4838]">Vinorleague Digital Anthology v2.0</span>
      </div>
    </div>
  );
}
