// src/app/shop/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/constants";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-mesh font-sans selection:bg-[#FD2F79]/10 selection:text-[#FD2F79]">
      <div className="container mx-auto px-8 pt-40 pb-24 relative z-10 text-[#5a4838]">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex justify-between items-center mb-20">
          <Link href="/shop" className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#5a4838] opacity-40 hover:opacity-100 hover:text-[#FD2F79] uppercase transition-all">
            ← Back to Archive
          </Link>
          <div className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#FD2F79] uppercase">
            Object {product.id}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          
          {/* Main Visual: Premium Sticker Card */}
          <div className="relative w-full aspect-square sticker-card bg-white p-4 md:p-8 soft-shadow overflow-visible group">
            <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-[#5a4838]/5">
              <Image 
                src={product.thumb} 
                alt={product.name} 
                fill 
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                priority
              />
            </div>
            {/* Visual Decorative Badge (Refined) */}
            <div className="absolute top-8 right-8 z-20">
               <div className="bg-[#FD2F79] text-white font-outfit text-[8px] font-black px-6 py-2.5 rounded-full shadow-lg uppercase tracking-[0.4em] rotate-12 group-hover:rotate-0 transition-transform duration-700">
                 Original Archive
               </div>
            </div>
          </div>

          {/* Product Information: Editorial Column */}
          <div className="flex flex-col">
            <span className="font-outfit text-[10px] font-black tracking-[0.6em] text-[#FD2F79] uppercase mb-4">New Release</span>
            <h1 className="font-outfit font-black text-5xl md:text-7xl leading-[0.9] tracking-tighter uppercase text-[#5a4838] mb-10">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-6 mb-12">
               <span className="font-outfit text-2xl font-bold text-[#5a4838]">{product.price}</span>
               <span className="w-1 h-1 rounded-full bg-[#5a4838]/20"></span>
               <span className="font-outfit text-[10px] font-black tracking-widest text-[#5a4838]/40 uppercase">Tax Included</span>
            </div>

            <div className="space-y-8 mb-16 max-w-md">
              <p className="text-base md:text-lg leading-relaxed text-[#5a4838] opacity-80">
                {product.description}
              </p>
              
              <div className="border-t border-[#5a4838]/10 pt-8">
                <h6 className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#FD2F79] uppercase mb-6">Specification</h6>
                <ul className="space-y-4">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-xs font-bold text-[#5a4838]/60 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FD2F79]/30"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button className="flex-1 bg-[#5a4838] text-white font-outfit text-[10px] font-black tracking-[0.4em] py-5 rounded-full uppercase hover:bg-[#FD2F79] hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                Add to Cart
              </button>
              <button className="flex-1 border border-[#5a4838]/20 text-[#5a4838] font-outfit text-[10px] font-black tracking-[0.4em] py-5 rounded-full uppercase hover:border-[#FD2F79] hover:text-[#FD2F79] transition-all">
                Wishlist
              </button>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-12 flex items-center gap-8 opacity-30 grayscale transition-all hover:grayscale-0 hover:opacity-100">
               <span className="font-outfit text-[8px] font-black tracking-widest uppercase">Safe Shipping</span>
               <span className="font-outfit text-[8px] font-black tracking-widest uppercase">Premium Quality</span>
               <span className="font-outfit text-[8px] font-black tracking-widest uppercase">2026 Archive</span>
            </div>
          </div>
        </div>

        {/* Product Cuts: Detailed Gallery */}
        <div className="mt-40 border-t border-[#5a4838]/5 pt-40">
           <div className="flex flex-col items-center text-center mb-24">
              <h4 className="font-outfit text-[10px] font-black tracking-[0.6em] text-[#FD2F79] mb-4 uppercase">Detailed Archive</h4>
              <h2 className="font-outfit font-black text-4xl md:text-6xl text-[#5a4838] leading-tight tracking-tighter uppercase mb-8">Product Cuts</h2>
              <p className="font-outfit text-sm opacity-50 uppercase tracking-widest">A closer look at the craft</p>
           </div>
           
           <div className="flex flex-col gap-12 max-w-5xl mx-auto">
              {product.gallery.map((img, idx) => (
                <div key={idx} className="relative w-full aspect-[16/10] anthology-card soft-shadow overflow-hidden group">
                   <Image 
                     src={img} 
                     alt={`${product.name} Detail ${idx + 1}`} 
                     fill 
                     className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-[#5a4838]/5"></div>
                   <div className="absolute bottom-8 left-8">
                      <span className="font-outfit text-[8px] font-black tracking-[0.4em] text-white/40 uppercase">Vinor league / Detailed Cut {String(idx + 1).padStart(2, '0')}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Brand Section: The League Spirit */}
        <div className="mt-40 border-t border-[#5a4838]/5 pt-40 text-center">
           <h4 className="font-outfit text-[10px] font-black tracking-[0.6em] text-[#FD2F79] uppercase mb-8">Part of the League</h4>
           <h2 className="font-outfit font-black text-4xl md:text-[5rem] text-[#5a4838] leading-[0.95] tracking-tighter uppercase mb-20 max-w-5xl mx-auto">
             Every product tells a part of<br className="hidden md:block" /> the <span className="whitespace-nowrap text-[#FD2F79]">Vinor league</span> anthology.
           </h2>
           <div className="relative w-full h-[50vh] anthology-card soft-shadow overflow-hidden">
              <Image 
                src="/banner.png" 
                alt="Banner" 
                fill 
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <Link href="/about" className="bg-white/90 backdrop-blur-md text-[#5a4838] font-outfit text-[10px] font-black px-12 py-6 rounded-full uppercase tracking-[0.4em] hover:bg-[#FD2F79] hover:text-white transition-all shadow-2xl">Discover Our Story</Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
