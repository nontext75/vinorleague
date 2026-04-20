import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-mesh font-sans selection:bg-[#FD2F79]/10 selection:text-[#FD2F79]">
      
      {/* 
      SECTION 1: THE ANTHOLOGY HERO
      "Everyday objects, unforgettable stories."
      */}
      <section className="relative w-full h-[70vh] flex items-center justify-center pt-28 px-8">
        <div className="relative w-full h-full anthology-card soft-shadow">
          <Image 
            src="/hero.png" 
            alt="Wani Family Collection" 
            fill 
            className="object-cover opacity-95"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#5a4838]/5 to-[#5a4838]/20 flex flex-col items-center justify-end pb-28">
            <h4 className="font-outfit text-[10px] font-black tracking-[0.6em] text-white/60 uppercase mb-4">Volume. 01</h4>
            <h1 className="font-outfit font-black text-6xl md:text-9xl text-white text-center leading-[0.85] tracking-tighter uppercase">
              Simple Days,<br/>
              Beautiful Memories.
            </h1>
            <p className="mt-8 font-outfit text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">Scroll to Explore</p>
          </div>
        </div>
      </section>

      {/* 
      SECTION 2: SCENE 02 - THE CAFE (Lifestyle)
      "A Moment of Peace"
      */}
      <section className="relative py-16 px-8 flex flex-col items-center">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-[4/5] anthology-card soft-shadow">
            <Image 
              src="/scene2.jpg" 
              alt="Wani in Cafe" 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <span className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#FD2F79] uppercase">Chapter 01</span>
            <h2 className="font-outfit font-black text-5xl md:text-7xl text-[#5a4838] mt-6 mb-8 leading-[0.95] tracking-tighter uppercase">
              오후의 공기,<br/>
              달콤한 휴식.
            </h2>
            <p className="text-[#5a4838]/70 leading-relaxed font-outfit text-sm mb-12 max-w-sm">
              따뜻한 커피 한 잔과 좋아하는 플레이리스트.<br/>
              와니와 함께 당신의 오후에 부드러운 쉼표를 찍어보세요.
            </p>
            <Link href="/shop" className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#5a4838] uppercase border-b border-[#5a4838]/20 pb-2 hover:text-[#FD2F79] hover:border-[#FD2F79] transition-all">
              EXPLORE LIFESTYLE
            </Link>
          </div>
        </div>
      </section>

      {/* 
      SECTION 3: SCENE 03 - THE OFFICE (Monologue)
      "Small Joy in Workspace"
      */}
      <section className="relative py-24 md:py-32 px-4 flex justify-center bg-white/30 backdrop-blur-sm overflow-hidden">
        <div className="max-w-5xl w-full flex flex-col relative min-h-[400px] md:min-h-[700px]">
          
          {/* Layer 1: The Main Box (Center) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] max-w-[550px] aspect-video z-20 rotate-[-1deg] sticker-card group hover:z-50 cursor-pointer">
            <div className="relative w-full h-full overflow-hidden rounded-[32px]">
              <Image 
                src="/scene1.jpg" 
                alt="Launch Box" 
                fill 
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Layer 2: Office Chaos (Bottom Right) */}
          <div className="absolute bottom-0 right-[5%] w-[45%] max-w-[380px] aspect-square z-30 rotate-[4deg] sticker-card group hover:z-50 cursor-pointer">
            <div className="relative w-full h-full overflow-hidden rounded-[32px]">
              <Image 
                src="/scene3.jpg" 
                alt="Office Life" 
                fill 
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#FD2F79]/5 group-hover:opacity-0 transition-opacity duration-1000"></div>
            </div>
          </div>

          {/* Layer 3: Cafe Break (Top Left) */}
          <div className="absolute top-[5%] left-[5%] w-[40%] max-w-[340px] aspect-square z-10 rotate-[-6deg] sticker-card group hover:z-50 cursor-pointer">
            <div className="relative w-full h-full overflow-hidden rounded-[32px]">
              <Image 
                src="/scene2.jpg" 
                alt="Cafe Wani" 
                fill 
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Layer 4: The Interview (Top Right) */}
          <div className="absolute top-[0%] right-[10%] w-[35%] max-w-[320px] aspect-[4/5] z-10 rotate-[8deg] sticker-card group hover:z-50 bg-[#e7cdb8] cursor-pointer">
            <div className="relative w-full h-full overflow-hidden rounded-[32px]">
              <Image 
                src="/scene4.jpg" 
                alt="The Interview" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 
      SECTION 4: SCENE 04 - THE INTERVIEW (About)
      "Our Heart"
      */}
      <section className="relative py-24 px-8 flex flex-col items-center bg-white/40">
        <div className="max-w-5xl w-full text-center">
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
          <Link href="/about" className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#5a4838] uppercase border border-[#5a4838]/20 px-10 py-5 rounded-full hover:bg-[#5a4838] hover:text-white transition-all">
            READ THE ANTHOLOGY
          </Link>
        </div>
      </section>

      {/* Modern Horizontal Goods Slider Sneak Peek */}
      <section className="py-16 border-t border-[#5a4838]/5">
        <div className="px-8 mb-16 flex flex-col items-center text-center gap-4">
          <h3 className="font-outfit font-black text-xl uppercase tracking-[0.4em] text-[#5a4838]">Curated Archive</h3>
          <Link href="/shop" className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#FD2F79] uppercase border-b border-[#FD2F79]/20 pb-1">View All</Link>
        </div>
        <div className="flex flex-wrap justify-center gap-10 px-8 pb-10">
          {[1,2,3,4,1,2].map((i, idx) => (
            <div key={idx} className="w-[280px] group cursor-pointer transition-all duration-1000 ease-in-out hover:-translate-y-3">
              <div className="relative aspect-square overflow-hidden rounded-[40px] transition-all duration-1000 ease-in-out shadow-sm group-hover:shadow-2xl">
                <Image 
                  src={`/thumb${(idx % 4) + 1}.png`} 
                  alt="Goods" 
                  fill 
                  className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110" 
                />
                {/* Text Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 pt-12 bg-gradient-to-t from-[#5a4838]/40 to-transparent flex flex-col items-start text-left opacity-90 group-hover:opacity-100 transition-opacity duration-700">
                  <p className="font-outfit text-[10px] font-black tracking-[0.4em] text-white/90 uppercase mb-2">Object 0{idx+1}</p>
                  <h4 className="font-outfit font-bold text-white text-lg">Archive Item Title</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
