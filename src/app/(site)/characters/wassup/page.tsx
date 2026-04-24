"use client";
 
 import Image from "next/image";
 import Link from "next/link";
 
 const RHYTHM = [
   "썹이 사고를 침",
   "와니가 수습",
   "와니가 한마디 함",
   "썹이 삐짐",
   "썹이 통으로 들어감",
   "와니가 기다림",
   "썹이 슬금슬금 나옴",
   "아무 일 없었던 것처럼 다시 시작",
 ];
 
 export default function WassupPage() {
   const characters = [
     {
       name: "와니",
       engName: "WANI",
       role: "Freelance Designer · 🐰 Rabbit",
       desc: (
         <>
           무던해 보이지만 은근히 고집이 세고 자기 주장이 강하다. <br/>
           항상 자기가 원하는 방향으로 상황이 흘러가 있다. <br/>
           조용히, 끝까지, 자기 방식대로 일상을 디자인하는 파란 토끼.
         </>
       ),
       img: "/wani_profile.png",
       reverse: false
     },
     {
       name: "썹",
       engName: "SUP",
       role: "Trouble Maker · 🐸 Frog · 대나무통 출신",
       desc: (
         <>
           대나무통 속에서 나온 지 얼마 안 됐다. <br/>
           세상 경험이 적어서 겁 없이 뛰어드는 타입. <br/>
           사고를 치고도 크게 반성하진 않는다. 다음에 또 한다.
         </>
       ),
       img: "/sup_profile.png",
       reverse: true
     }
   ];
 
   return (
     <div className="page-wrapper">
       <div className="mesh-overlay bg-mesh"></div>

       <main className="page-main">
         {/* Editorial Header System */}
         <header className="editorial-header">
            <h1 className="relative w-full max-w-[400px] aspect-[1.45/1] mx-auto mb-12 animate-float">
             <Image 
               src="/logo-wassup.png" 
               alt="Wassup Logo" 
               fill 
               priority 
               className="object-contain"
             />
           </h1>
 
           <div className="editorial-banner group mb-16">
              <div className="absolute inset-0 bg-[#5a4838]/5 animate-pulse"></div>
              <Image 
                src="/hero-wassup.png"
                alt="Wassup 3D Preview"
                fill
                className="object-cover"
              />
           </div>

           <div className="flex flex-col gap-4 mb-16">
             <p className="text-[#5a4838]/80 font-outfit text-lg md:text-xl font-black tracking-tight italic">
               "작은 하루의 발견이 전부인 세계."
             </p>
             <p className="text-[#5a4838]/60 leading-relaxed font-outfit text-sm md:text-base max-w-2xl mx-auto font-medium tracking-tight">
               서울 도심 어딘가, 낡고 아늑한 빌라 골목. <br/>
               와니와 썹의 따뜻하고 느긋한 일상이 시작됩니다.
             </p>
           </div>
         </header>
 
         {/* Character Display System */}
         <section className="flex flex-col gap-12 md:gap-16">
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
                    className="object-contain relative z-10" 
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
 
         {/* ── 관계 & 에피소드 ── */}
        <section className="section-wrap py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

            <div>
              <span className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#FD2F79] uppercase mb-6 block">Relationship</span>
              <h2 className="font-cafe font-black text-5xl md:text-6xl text-[#5a4838] tracking-[-0.04em] leading-[0.85] uppercase mb-10">
                대등한 사이.
              </h2>
              <div className="flex flex-col gap-8">
                <div>
                  <span className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#FD2F79] uppercase block mb-2">썹 → 와니</span>
                  <p className="font-outfit text-xl font-black text-[#5a4838]/60 leading-snug">말 없이 옆에 와서 그냥 앉는다.</p>
                </div>
                <div>
                  <span className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#FD2F79] uppercase block mb-2">와니 → 썹</span>
                  <p className="font-outfit text-xl font-black text-[#5a4838]/60 leading-snug">좋아하는 걸 통 근처에 슬쩍 갖다 놓는다.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#5a4838]/5 p-8 md:p-10 rounded-[32px]">
              <span className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#FD2F79] uppercase mb-6 block">Episode Rhythm</span>
              <div className="flex flex-col">
                {RHYTHM.map((step, i) => (
                  <div key={i} className="flex items-center gap-5 py-3.5 border-b border-[#5a4838]/6 group">
                    <span className="font-outfit font-black text-[10px] text-[#5a4838]/15 tracking-widest w-7 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`font-outfit font-black text-base tracking-tight transition-colors duration-300 ${
                      i === 0 || i === 7 ? "text-[#FD2F79]" : "text-[#5a4838]/40 group-hover:text-[#5a4838]"
                    }`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
              <p className="font-outfit text-xs text-[#5a4838]/20 italic mt-5">그 반복이 따뜻하다.</p>
            </div>

          </div>
        </section>

        {/* ── Application ── */}
        <section className="section-wrap pb-24">
          <span className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#FD2F79] uppercase mb-6 block">Application</span>
          <div className="grid grid-cols-4 gap-4 md:gap-6" style={{ gridTemplateRows: "280px 220px" }}>
            <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden soft-shadow">
              <Image src="/temp/Blue_bunny_chick_202604221543.jpeg" alt="" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="col-span-1 relative rounded-2xl overflow-hidden soft-shadow">
              <Image src="/temp/Bunny_chick_frog_202604221543.jpeg" alt="" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="col-span-1 relative rounded-2xl overflow-hidden soft-shadow">
              <Image src="/temp/Chibi_bunny_chick_202604221543.jpeg" alt="" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="col-span-1 relative rounded-2xl overflow-hidden soft-shadow">
              <Image src="/temp/토끼와_개구리_숲속_202604221543.jpeg" alt="" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="col-span-1 relative rounded-2xl overflow-hidden soft-shadow">
              <Image src="/temp/캐릭터와_토끼_걸어가는_202604221543.jpeg" alt="" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </section>

        {/* ── 클로징 + Back ── */}
        <section className="text-center py-24 md:py-32 px-8 border-t border-[#5a4838]/8">
          <p className="font-cafe font-black text-4xl md:text-7xl text-[#5a4838] tracking-[-0.03em] leading-[1.1] max-w-3xl mx-auto mb-16">
            오늘 하루가 <span className="text-[#FD2F79]">조금 괜찮아지는</span> 이야기.
          </p>
          <Link href="/characters" className="back-link">BACK TO INDEX →</Link>
        </section>
       </main>
 
       {/* Footer System Label */}
       <div className="watermark">
         <span className="font-outfit text-[7px] font-black tracking-[1em] uppercase text-[#5a4838]">Vinorleague Digital Anthology v2.0</span>
       </div>
     </div>
   );
 }
