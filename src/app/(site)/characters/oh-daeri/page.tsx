// src/app/(site)/characters/oh-daeri/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function OhDaeriPage() {
  const characters = [
    {
      name: "오대리",
      engName: "OH DAERI",
      role: "Sales Deputy",
      desc: (
        <>
          비장함 30% + 억울함 40% + 근거 없는 자신감 30%의 결정체. <br/>
          반쯤 내리깔린 눈과 머리 위 삐죽 솟은 안테나 털 한 가닥이 특징. <br/>
          포기하는 법을 아직 못 배워 매일 아침 결의를 다지고 매일 저녁 털립니다. <br/>
          월요병과 야근 속에서도 내일은 진짜 다를 거라고 믿는 무한 긍정의 상사맨.
        </>
      ),
      img: "/odaeri_profile.png",
      reverse: false
    },
    {
      name: "박매니저",
      engName: "MGR. PARK",
      role: "Team Manager · 🐻 Bear",
      desc: (
        <>
          겉으로는 엄격해 보이지만 속은 누구보다 따뜻한 츤데레 상사. <br/>
          팀원들을 챙기느라 정작 본인은 항상 업무에 치여 산다. <br/>
          퇴근 후 마시는 소주 한 잔이 인생의 유일한 낙이다.
        </>
      ),
      img: "/park_profile.png",
      reverse: true
    }
  ];

  return (
    <div className="min-h-screen bg-white relative font-sans selection:bg-[#FD2F79]/10 selection:text-[#FD2F79] overflow-hidden">
      <div className="fixed inset-0 bg-mesh opacity-30 pointer-events-none z-0"></div>

      <main className="relative z-10 pt-40 pb-80">
        {/* Editorial Header System */}
        <header className="editorial-header">
          <span className="text-label text-[#FD2F79] mb-4 block tracking-[0.4em] uppercase">Family 02</span>
        <h1 className="relative w-full max-w-[400px] aspect-[1.8/1] mx-auto mb-12 animate-float">
          <Image 
            src="/logo-odaeri.png" 
            alt="Oh Daeri Logo" 
            fill 
            priority 
            className="object-contain"
          />
        </h1>

        {/* Editorial Banner System */}
        <div className="editorial-banner group mb-16">
           <div className="absolute inset-0 bg-[#5a4838]/5 animate-pulse"></div>
           <Image 
             src="/hero-odaeri.png"
             alt="Oh Daeri 3D Preview"
             fill
             className="object-cover"
           />
        </div>

        <div className="flex flex-col gap-4 mb-16">
          <p className="text-[#5a4838]/80 font-outfit text-lg md:text-xl font-black tracking-tight italic">
            "나 오늘은 진짜 제대로 해볼 거야..."
          </p>
          <p className="text-[#5a4838]/60 leading-relaxed font-outfit text-sm md:text-base max-w-2xl mx-auto font-medium tracking-tight">
            서울 도심 영업팀, 칸막이 책상 위에서 벌어지는 매일의 전쟁터. <br/>
            직장인 공감 100%, 억울하지만 내일도 다시 출근하는 우리 모두의 이야기.
          </p>
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
                   className="object-contain" 
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
