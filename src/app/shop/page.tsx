// src/app/shop/page.tsx
import Image from "next/image";

export default function ShopPage() {
  const products = [
    { id: '01', name: 'Vinor league Collectible Box', price: '₩42,000', thumb: '/thumb1.jpg' },
    { id: '02', name: 'Vinor league Digital Clock', price: '₩35,000', thumb: '/thumb2.jpg' },
    { id: '03', name: 'Vinor league Pattern Phone Case', price: '₩18,000', thumb: '/thumb3.jpg' },
    { id: '04', name: 'Vinor league Embroidered Pouch', price: '₩12,000', thumb: '/thumb4.jpg' },
    { id: '05', name: 'Vinor league Family Duck Toy', price: '₩24,000', thumb: '/thumb5.png' },
    { id: '06', name: 'Travel with Vinor league (Map)', price: '₩48,000', thumb: '/thumb6.jpg' },
    { id: '07', name: 'Good Sports Talk (Car)', price: '₩39,000', thumb: '/thumb7.jpg' },
    { id: '08', name: 'Vinus: The Forest Spirit', price: '₩55,000', thumb: '/thumb8.png' },
  ];

  return (
    <div className="min-h-screen bg-mesh relative font-sans selection:bg-[#FD2F79]/10 selection:text-[#FD2F79]">
      <div className="container mx-auto px-8 pt-40 pb-24 relative z-10 text-[#5a4838]">
        {/* Clean Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <h4 className="font-outfit text-[10px] font-black tracking-[0.6em] text-[#FD2F79] mb-4 uppercase">The Archive</h4>
            <h1 className="font-outfit font-black text-6xl md:text-8xl leading-none tracking-tighter uppercase text-[#5a4838]">Curated<br/>Collection</h1>
          </div>
          
          {/* Minimalist Filter Pills */}
          <div className="flex gap-4">
             <button className="font-outfit text-[10px] font-black tracking-[0.4em] bg-[#5a4838] text-white soft-shadow px-8 py-4 rounded-full uppercase transition-all">All Objects</button>
             <button className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#5a4838]/40 border border-[#5a4838]/10 px-8 py-4 rounded-full uppercase hover:text-[#FD2F79] transition-all">Stickers</button>
             <button className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#5a4838]/40 border border-[#5a4838]/10 px-8 py-4 rounded-full uppercase hover:text-[#FD2F79] transition-all">Lifestyle</button>
          </div>
        </div>

        {/* Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20">
          {products.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative aspect-square overflow-hidden rounded-[48px] transition-all duration-1000 ease-in-out shadow-sm group-hover:shadow-2xl mb-8 sticker-card bg-white/40">
                <Image 
                  src={item.thumb} 
                  alt={item.name} 
                  fill 
                  className="object-cover transition-transform duration-[1500ms] ease-in-out group-hover:scale-110" 
                />
                
                {/* Floating Tag */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="font-outfit text-[8px] font-black tracking-[0.3em] bg-white/90 backdrop-blur-sm text-[#FD2F79] px-4 py-2 rounded-full uppercase shadow-sm">Vol.{item.id}</span>
                </div>
              </div>

              <div className="flex flex-col items-start px-4">
                <h3 className="font-outfit font-black text-[#5a4838] text-lg leading-tight mb-2 group-hover:text-[#FD2F79] transition-colors uppercase tracking-tight">{item.name}</h3>
                <div className="flex items-center gap-3">
                  <p className="font-outfit text-sm font-bold text-[#5a4838]/40">{item.price}</p>
                  <span className="w-1 h-1 rounded-full bg-[#5a4838]/20"></span>
                  <p className="font-outfit text-[9px] font-black tracking-widest text-[#5a4838]/30 uppercase">In Stock</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination - Minimalist */}
        <div className="flex justify-center mt-40">
          <div className="flex items-center gap-12">
            <button className="font-outfit text-[10px] font-black uppercase tracking-[0.4em] text-[#5a4838]/20 cursor-not-allowed">Previous</button>
            <div className="flex gap-4">
              <span className="w-2 h-2 rounded-full bg-[#5a4838]"></span>
              <span className="w-2 h-2 rounded-full bg-[#5a4838]/10 hover:bg-[#FD2F79]/30 transition-all cursor-pointer"></span>
              <span className="w-2 h-2 rounded-full bg-[#5a4838]/10 hover:bg-[#FD2F79]/30 transition-all cursor-pointer"></span>
            </div>
            <button className="font-outfit text-[10px] font-black uppercase tracking-[0.4em] text-[#5a4838] hover:text-[#FD2F79] transition-all">Next Page</button>
          </div>
        </div>
      </div>
    </div>
  );
}
