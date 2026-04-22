// src/app/(site)/characters/kkakdugi-pa/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function KkakdugiPaPage() {
  const characters = [
    {
      name: "깍두기",
      engName: "KKAKDUGI",
      role: "Boss of the Mafia",
      desc: (
        <>
          말이 없고 행동으로 말하는 결단력의 소유자. 빨간 깍둑썰기 정육면체. <br/>
          고춧가루가 덕지덕지 묻은 험악한 인상이지만, 속은 의외로 여립니다. <br/>
          "김치의 곁다리 취급"을 거부하며 상온의 세계에서 독자적인 세력을 구축합니다. <br/>
          가끔 국물이 흘러내릴 땐 왠지 눈물처럼 보이기도 하는 감성 보스.
        </>
      ),
      img: "/thumb2.png",
      reverse: false
    },
    {
      name: "파 (대파)",
      engName: "PA",
      role: "The Brain",
      desc: (
        <>
          겉으론 쿨하고 무심한 척하지만 감수성이 풍부한 전략가. <br/>
          어떤 틈새도 파고드는 유연한 몸체와 특유의 향으로 분위기를 장악합니다. <br/>
          "파는 그냥 들어가는 거잖아"라는 흔한 편견에 지쳐 탈출을 결심했습니다. <br/>
          깍두기가 혼자 무리하는 걸 보면 이유 없이 화를 내는 든든한 파트너.
        </>
      ),
      img: "/thumb4.png",
      reverse: true
    }
  ];

  return (
    <div className="min-h-screen bg-white relative font-sans selection:bg-[#FD2F79]/10 selection:text-[#FD2F79] overflow-hidden">
      <div className="fixed inset-0 bg-mesh opacity-30 pointer-events-none z-0"></div>

      <main className="relative z-10 pt-40 pb-80">
        {/* Editorial Header System */}
        <header className="editorial-header">
          <span className="text-label text-[#FD2F79] mb-4 block tracking-[0.4em] uppercase">Family 03</span>
          <h1 className="text-h1 !text-6xl md:!text-[140px] tracking-[-0.05em] leading-[0.8] mb-12 uppercase">
            The Mafia.
          </h1>

          <div className="flex flex-col gap-4 mb-16">
            <p className="text-[#5a4838]/80 font-outfit text-lg md:text-xl font-black tracking-tight italic">
              "말 안 해도 알잖아."
            </p>
            <p className="text-[#5a4838]/60 leading-relaxed font-outfit text-sm md:text-base max-w-2xl mx-auto font-medium tracking-tight">
              서울 도심 반찬가게, 냉장고 전원이 꺼진 순간 시작된 위대한 탈출. <br/>
              아름답지만 위험한 '상온(常溫)의 세계'에서 살아남기 위한 반찬들의 눈물겨운 생존기.
            </p>
          </div>

          {/* Editorial Banner System - Fixed Build Error: group added here */}
          <div className="editorial-banner group">
             <div className="absolute inset-0 bg-[#5a4838]/5 animate-pulse"></div>
             <Image 
               src="/hero-kkaktugi.png"
               alt="Kkakdugi Mafia 3D Preview"
               fill
               className="object-cover transition-transform duration-1000 group-hover:scale-105"
             />
          </div>
        </header>

        {/* Character Display System */}
        <section className="flex flex-col gap-60 md:gap-80">
          {characters.map((char) => (
            <div 
              key={char.name} 
              className={char.reverse ? "editorial-character-row-reverse" : "editorial-character-row"}
            >
              <div className="relative flex-1 w-full aspect-square">
                 <Image 
                   src={char.img} 
                   alt={char.name} 
                   fill 
                   priority
                   className="object-contain transition-transform duration-1000 hover:scale-105" 
                 />
              </div>

              <div className="flex-1 flex flex-col gap-6 md:gap-8 text-center lg:text-left">
                <div>
                   <h2 className="font-outfit font-black text-4xl md:text-[64px] text-[#5a4838] tracking-[-0.04em] leading-none mb-6 uppercase">
                     {char.engName}
                   </h2>
                   <div className="flex items-center justify-center lg:justify-start gap-3 mb-10">
                      <span className="font-sans font-bold text-xs md:text-sm text-[#5a4838]/40 tracking-[-0.02em]">
                        {char.name}
                      </span>
                      <span className="w-[1px] h-3 bg-[#5a4838]/10"></span>
                      <span className="font-outfit font-bold text-xs md:text-sm text-[#5a4838]/40 tracking-tight">
                        {char.role}
                      </span>
                   </div>
                </div>

                <div className="max-w-md mx-auto lg:mx-0">
                   <div className="font-sans text-xs md:text-sm text-[#5a4838]/70 font-bold leading-relaxed tracking-tighter break-keep">
                     {char.desc}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="max-w-[1400px] mx-auto px-8 md:px-12 mt-80 flex flex-col items-center">
           <Link href="/characters" className="text-label text-[#5a4838]/40 hover:text-[#FD2F79] border-b border-[#5a4838]/10 pb-2 transition-all tracking-[0.4em]">
             BACK TO INDEX →
           </Link>
        </section>
      </main>

      {/* Footer System Label - Fixed Branding */}
      <div className="fixed bottom-10 left-10 pointer-events-none opacity-5">
         <span className="font-outfit text-[7px] font-black tracking-[1em] uppercase text-[#5a4838]">
           Vinorleague Digital Anthology v2.0
         </span>
      </div>
    </div>
  );
}
