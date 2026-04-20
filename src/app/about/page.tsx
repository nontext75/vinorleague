// src/app/about/page.tsx
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-mesh font-sans selection:bg-[#FD2F79]/10 selection:text-[#FD2F79]">
      {/* Background Marquee Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center overflow-hidden z-0">
        <div className="whitespace-nowrap font-outfit font-black text-[25vw] uppercase tracking-tighter leading-none animate-[marquee_60s_linear_infinite]">
          Vinor league Vinor league Vinor league
        </div>
      </div>

      <div className="container mx-auto px-8 pt-40 pb-24 relative z-10 text-[#5a4838]">
        {/* Editorial Header */}
        <div className="max-w-5xl mb-32 relative">
          <div className="flex items-center gap-4 mb-4">
             <span className="w-12 h-[1px] bg-[#FD2F79]"></span>
             <h4 className="font-outfit text-[10px] font-black tracking-[0.6em] text-[#FD2F79] uppercase">The Anthology</h4>
          </div>
          <h1 className="font-outfit font-black text-6xl md:text-[11rem] leading-[0.8] tracking-tighter uppercase mb-16 text-[#5a4838]">
            Vinor<br/>league.
          </h1>
          <p className="font-outfit text-sm md:text-lg leading-relaxed opacity-80 max-w-2xl text-[#5a4838]">
            바이너리그는 평범한 모든 순간들을 하나의 아름다운 &apos;장막(League)&apos; 아래 기록하고자 합니다. 
            단순한 캐릭터 브랜드를 넘어, 당신의 일상에 스며드는 에너제틱한 감각과 기하학적인 즐거움을 제안합니다.
          </p>
        </div>

        {/* Brand Spirit Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mb-40">
          <div className="relative aspect-[4/5] md:aspect-[16/10] anthology-card soft-shadow overflow-hidden group">
            <Image 
              src="/brand_spirit.png" 
              alt="Vinor league Brand Spirit" 
              fill 
              className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#5a4838]/20 to-transparent"></div>
          </div>
          <div className="flex flex-col gap-12 pb-8">
            <div className="flex flex-col gap-4">
              <span className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#FD2F79] uppercase">Vision 01</span>
              <h2 className="font-outfit font-black text-5xl md:text-7xl leading-none tracking-tighter uppercase text-[#5a4838]">
                Bold Styles,<br/>Infinite<br/>Stories.
              </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed opacity-70 text-[#5a4838] max-w-sm">
              우리는 강렬한 컬러와 기하학적인 타이포그래피를 통해 일상의 매너리즘을 타파합니다. 
              바이너리그의 모든 제품은 당신의 매일을 특별한 리그의 한 장면으로 만들어줄 거예요.
            </p>
          </div>
        </div>

        {/* Brand Philosophy Visual (Unified) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mb-40">
          <div className="flex flex-col gap-12 pb-8 order-2 lg:order-1">
            <div className="flex flex-col gap-4">
              <span className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#FD2F79] uppercase">Vision 02</span>
              <h2 className="font-outfit font-black text-5xl md:text-7xl leading-none tracking-tighter uppercase text-[#5a4838]">
                Beyond the<br/>Ordinary.
              </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed opacity-70 text-[#5a4838] max-w-sm">
              바이너리그는 당신의 책상 위, 가방 속, 그리고 모든 생활 공간에 
              에너제틱한 영감을 불어넣습니다. 작은 디테일의 변화가 가져오는 
              커다란 즐거움을 믿으세요.
            </p>
          </div>
          <div className="relative aspect-[4/5] md:aspect-[16/10] anthology-card soft-shadow overflow-hidden group order-1 lg:order-2">
            <Image 
              src="/scene1.jpg" 
              alt="Vinor Scene" 
              fill 
              className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#5a4838]/20 to-transparent"></div>
          </div>
        </div>

        {/* Panoramic Brand Banner (Approx 1400px) - Moved Above Contact */}
        <div className="w-full max-w-[1400px] mx-auto mb-40 relative group">
          <div className="relative aspect-[21/9] md:aspect-[3/1] anthology-card soft-shadow overflow-hidden rim-light">
             <Image 
               src="/banner.png" 
               alt="Vinor league Panorama" 
               fill 
               className="object-cover transition-transform duration-[3000ms] group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-[#5a4838]/5"></div>
          </div>
          {/* Subtle Label */}
          <div className="absolute -bottom-8 right-0">
             <span className="font-outfit text-[8px] font-black tracking-[0.6em] text-[#5a4838]/20 uppercase">Seasonal Archive / Showroom View</span>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="mt-40 pt-24 border-t border-[#5a4838]/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
           <div className="flex flex-col gap-6">
              <h4 className="font-outfit text-[10px] font-black tracking-[0.6em] text-[#5a4838]/40 uppercase">Connection</h4>
              <p className="font-outfit text-3xl md:text-5xl font-black text-[#FD2F79] hover:opacity-80 transition-all cursor-pointer">hello@vinorleague.com</p>
           </div>
           <div className="flex gap-8">
              <a href="#" className="font-outfit text-[10px] font-black tracking-[0.3em] uppercase opacity-40 hover:opacity-100 transition-all border-b border-[#5a4838]/20 pb-2">Instagram</a>
              <a href="#" className="font-outfit text-[10px] font-black tracking-[0.3em] uppercase opacity-40 hover:opacity-100 transition-all border-b border-[#5a4838]/20 pb-2">Archive</a>
           </div>
        </div>
      </div>
    </div>
  );
}
