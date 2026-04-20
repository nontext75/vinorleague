import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import MarqueeSection from "@/components/MarqueeSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-mesh font-sans selection:bg-[#FD2F79]/10 selection:text-[#FD2F79]">

      {/*
      SECTION 1: THE ANTHOLOGY HERO — Rolling 4-slide carousel
      */}
      <HeroCarousel />

      {/* 
      SECTION 2: SCENE 02 - THE CAFE (Lifestyle)
      "A Moment of Peace"
      */}
      <section className="relative py-16 px-8 flex flex-col items-center">
        <div className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-[4/5] anthology-card soft-shadow">
            <Image 
              src="/scene2.jpg" 
              alt="Vinor league in Cafe" 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <span className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#FD2F79] uppercase">Chapter 01</span>
            <h2 className="font-outfit font-black text-5xl md:text-7xl text-[#5a4838] mt-6 mb-8 leading-[0.95] tracking-tighter uppercase">
              오후의 나른한 공기,<br/>
              달콤한 휴식.
            </h2>
            <p className="text-[#5a4838]/70 leading-relaxed font-outfit text-sm mb-12 max-w-sm">
              따뜻한 커피 한 잔과 좋아하는 플레이리스트.<br/>
              바이너리그와 함께 당신의 오후에 부드러운 쉼표를 찍어보세요.
            </p>
            <Link href="/shop" className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#5a4838] uppercase border-b border-[#5a4838]/20 pb-2 hover:text-[#FD2F79] hover:border-[#FD2F79] transition-all">
              EXPLORE LIFESTYLE
            </Link>
          </div>
        </div>
      </section>

      {/*
      SECTION 3: MARQUEE GALLERY — 2-row staggered infinite scroll
      */}
      <MarqueeSection />

      {/* 
      SECTION 4: SCENE 04 - THE INTERVIEW (About)
      "Our Heart"
      */}
      <section className="relative py-24 flex flex-col items-center bg-white/40">
        <div className="w-[1400px] max-w-full text-center px-8">
          <div className="relative w-full aspect-[16/9] anthology-card soft-shadow mb-20 overflow-hidden">
            <Image 
              src="/scene4.jpg" 
              alt="Team Interview" 
              fill 
              className="object-cover opacity-90"
            />
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>
          </div>
          
          <span className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#FD2F79] uppercase">Final Chapter</span>
          <h2 className="font-outfit font-black text-5xl md:text-7xl text-[#5a4838] mt-8 mb-12 tracking-tighter uppercase">Beyond Characters.</h2>
          <p className="text-[#5a4838]/60 leading-relaxed font-outfit text-sm max-w-lg mx-auto mb-16">
            우리는 단순히 귀여운 캐릭터를 만드는 것을 넘어,<br/>
            당신의 일상에 스며드는 따뜻한 감각의 조각들을 제안합니다.
          </p>
          <Link href="/about" className="font-outfit text-[10px] font-black tracking-[0.4em] bg-[#FD2F79] text-white uppercase px-10 py-5 rounded-full hover:bg-[#5a4838] transition-all">
            READ THE ANTHOLOGY
          </Link>
        </div>
      </section>

      {/* Modern Horizontal Goods Slider Sneak Peek */}
      <section className="py-16 border-t border-[#5a4838]/5">
        <div className="px-8 mb-16 flex flex-col items-center text-center gap-4">
          <h3 className="font-outfit font-black text-5xl md:text-6xl uppercase tracking-tighter text-[#5a4838]">Curated Archive</h3>
          <Link href="/shop" className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#FD2F79] uppercase border-b border-[#FD2F79]/20 pb-1">View All Collection</Link>
        </div>
        <div className="grid grid-cols-8 gap-6 px-8 pb-10">
          {[
            { id: '01', name: 'Vinor league Collectible Box', price: '₩42,000', thumb: '/thumb1.jpg' },
            { id: '02', name: 'Vinor league Digital Clock', price: '₩35,000', thumb: '/thumb2.jpg' },
            { id: '03', name: 'Vinor league Pattern Phone Case', price: '₩18,000', thumb: '/thumb3.jpg' },
            { id: '04', name: 'Vinor league Embroidered Pouch', price: '₩12,000', thumb: '/thumb4.jpg' },
            { id: '05', name: 'Vinor league Family Duck Toy', price: '₩24,000', thumb: '/thumb5.png' },
            { id: '06', name: 'Travel with Vinor league (Map)', price: '₩48,000', thumb: '/thumb6.jpg' },
            { id: '07', name: 'Good Sports Talk (Car)', price: '₩39,000', thumb: '/thumb7.jpg' },
            { id: '08', name: 'Vinus: The Forest Spirit', price: '₩55,000', thumb: '/thumb8.png' },
          ].map((item) => (
            <div key={item.id} className="group cursor-pointer min-w-0">
              <div className="relative aspect-square overflow-hidden rounded-[40px] transition-all duration-1000 ease-in-out shadow-sm group-hover:shadow-2xl mb-8 bg-[#f0ece8]">
                <Image
                  src={item.thumb}
                  alt={item.name}
                  fill
                  className="object-contain p-4 transition-transform duration-1000 ease-in-out group-hover:scale-110"
                  unoptimized={item.thumb.endsWith('.png')}
                />
              </div>
              <div className="flex flex-col items-start px-2 pt-4 gap-2">
                <span className="font-outfit text-[10px] font-black tracking-normal text-[#FD2F79] uppercase bg-[#FD2F79]/10 px-3 py-1.5 rounded-full">Object {item.id}</span>
                <h4 className="font-outfit font-black text-[#5a4838] text-lg leading-tight group-hover:text-[#FD2F79] transition-colors">{item.name}</h4>
                <p className="font-outfit text-base font-bold text-[#5a4838]/50">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
