import Link from "next/link";
import Image from "next/image";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-mesh relative font-sans selection:bg-[#FD2F79]/10 selection:text-[#FD2F79]">
      <div className="container mx-auto px-8 pt-40 pb-24 relative z-10 text-[#5a4838]">
        {/* Clean Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <h4 className="font-outfit text-[10px] font-black tracking-[0.6em] text-[#FD2F79] mb-4 uppercase">The Archive</h4>
            <h1 className="font-outfit font-black text-6xl md:text-8xl leading-none tracking-tighter uppercase">Curated Collection</h1>
          </div>
          
          {/* Minimalist Filter Pills */}
          <div className="flex gap-4">
             <button className="font-outfit text-[10px] font-black tracking-[0.4em] bg-white border border-[#5a4838]/5 soft-shadow px-8 py-3 rounded-full uppercase hover:text-[#FD2F79] transition-all">All</button>
             <button className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#5a4838]/40 px-8 py-3 rounded-full uppercase hover:text-[#FD2F79] transition-all">Stickers</button>
             <button className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#5a4838]/40 px-8 py-3 rounded-full uppercase hover:text-[#FD2F79] transition-all">Goods</button>
          </div>
        </div>

        {/* Airy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16">
          {[1, 2, 3, 4, 1, 2, 3, 4].map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative aspect-square overflow-hidden rounded-[40px] transition-all duration-1000 ease-in-out shadow-sm group-hover:shadow-2xl">
                <Image 
                  src={`/thumb${(idx % 4) + 1}.png`} 
                  alt={`Product ${idx}`} 
                  fill 
                  className="object-cover transition-transform duration-[1500ms] ease-in-out group-hover:scale-110" 
                />
                
                {/* Info Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 pt-16 bg-gradient-to-t from-[#5a4838]/60 via-[#5a4838]/20 to-transparent flex flex-col justify-end items-start text-left h-full group">
                  <div className="flex justify-between w-full items-baseline mb-3 opacity-80 group-hover:opacity-100 transition-opacity duration-1000">
                    <p className="font-outfit text-[8px] tracking-[0.4em] text-white/80 font-black uppercase">Season 01</p>
                    <span className="font-outfit text-[10px] font-bold text-white/60">₩4,500</span>
                  </div>
                  <h3 className="font-outfit text-xl md:text-2xl font-bold text-white leading-tight group-hover:translate-x-2 transition-transform duration-1000 ease-out">와니 패밀리 아카이브 상품 0{idx + 1}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center mt-32">
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#5a4838] text-white font-outfit text-xs font-black soft-shadow">1</button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white font-outfit text-xs font-bold transition-all border border-transparent hover:border-[#5a4838]/10">2</button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full font-outfit text-[10px] font-black uppercase tracking-widest text-[#5a4838]/40">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
