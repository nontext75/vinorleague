// src/app/(site)/contact/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

type Tab = "general" | "partnership";

export default function ContactPage() {
  const [tab, setTab] = useState<Tab>("general");
  const inputCls = "form-input";
  const labelCls = "form-label";

  return (
    <div className="page-wrapper">
      <div className="mesh-overlay bg-mesh"></div>

      <main className="page-main">
        {/* Editorial Header */}
        <header className="editorial-header">
          <span className="text-label text-[#FD2F79] mb-4 block tracking-[0.4em] uppercase">Global Linkage</span>
          <h1 className="text-h1 !text-6xl md:!text-[140px] tracking-[-0.05em] leading-[0.8] mb-12 uppercase">
            Connect.
          </h1>
          <p className="font-outfit text-sm md:text-xl text-[#5a4838]/60 leading-relaxed max-w-xl mx-auto font-bold mt-12">
            바이너리그(Vinorleague)의 정교한 크리에이티브가 귀하의 프로젝트를 위한 완벽한 파츠가 되어 드릴 것입니다. 
            협업 제안과 브랜드 문의를 환영합니다.
          </p>
        </header>

        {/* Contact System Container */}
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* Left: Info Block */}
          <div className="lg:col-span-5 flex flex-col gap-16">
             <div className="bg-white/40 backdrop-blur-xl border border-[#5a4838]/5 p-12 rounded-[60px] soft-shadow">
                <span className="text-label text-[#FD2F79] mb-4 block uppercase tracking-[0.2em] !text-[10px]">Secure Channel</span>
                <p className="font-outfit font-black text-2xl md:text-4xl text-[#5a4838] tracking-tight leading-none mb-8">
                  hello@vinorleague.com
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center py-4 border-t border-[#5a4838]/5">
                    <span className="text-label !text-[10px] opacity-20 uppercase">Location</span>
                    <span className="font-outfit font-bold text-sm text-[#5a4838]">Seoul, KR</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-t border-[#5a4838]/5">
                    <span className="text-label !text-[10px] opacity-20 uppercase">Response Time</span>
                    <span className="font-outfit font-bold text-sm text-[#5a4838]">48 Hours (SLA)</span>
                  </div>
                </div>
             </div>

             <div className="px-12">
                <h3 className="text-label text-[#5a4838] mb-6 uppercase tracking-[0.4em]">Follow Us</h3>
                <div className="flex gap-10">
                   <a href="https://instagram.com" className="font-outfit font-black text-xl text-[#5a4838]/40 hover:text-[#FD2F79] transition-all">Instagram</a>
                   <a href="https://twitter.com" className="font-outfit font-black text-xl text-[#5a4838]/40 hover:text-[#FD2F79] transition-all">Twitter</a>
                </div>
             </div>
          </div>

          {/* Right: Submission Terminal */}
          <div className="lg:col-span-7 bg-white p-12 md:p-20 rounded-[60px] md:rounded-[80px] shadow-[0_60px_120px_-30px_rgba(90,72,56,0.15)]">
             <div className="flex gap-4 mb-16 p-2 bg-[#5a4838]/5 rounded-full">
                <button 
                  onClick={() => setTab("general")}
                  className={`flex-1 text-label py-4 rounded-full transition-all uppercase !text-[10px] tracking-widest ${tab === "general" ? "bg-white text-[#5a4838] shadow-lg" : "text-[#5a4838]/40 hover:text-[#5a4838]"}`}
                >
                  General
                </button>
                <button 
                  onClick={() => setTab("partnership")}
                  className={`flex-1 text-label py-4 rounded-full transition-all uppercase !text-[10px] tracking-widest ${tab === "partnership" ? "bg-[#FD2F79] text-white shadow-lg" : "text-[#5a4838]/40 hover:text-[#FD2F79]"}`}
                >
                  Partnership
                </button>
             </div>

             <form className="flex flex-col gap-10">
                {tab === "general" ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className={labelCls}>Name</label>
                        <input type="text" placeholder="NAME" className={inputCls} />
                      </div>
                      <div className="space-y-2">
                        <label className={labelCls}>Email</label>
                        <input type="email" placeholder="EMAIL" className={inputCls} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className={labelCls}>Message Content</label>
                      <textarea rows={5} placeholder="MESSAGE" className={`${inputCls} resize-none`} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className={labelCls}>Company</label>
                        <input type="text" placeholder="BRAND / ORG" className={inputCls} />
                      </div>
                      <div className="space-y-2">
                        <label className={labelCls}>Email</label>
                        <input type="email" placeholder="OFFICIAL EMAIL" className={inputCls} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className={labelCls}>Inquiry Type</label>
                      <select className={`${inputCls} appearance-none cursor-pointer`}>
                        <option value="">SELECT TYPE</option>
                        <option value="Licensing">IP Licensing</option>
                        <option value="Collaboration">Collaboration</option>
                        <option value="Investment">Investment</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className={labelCls}>Proposal Brief</label>
                      <textarea rows={5} placeholder="PROPOSAL DETAIL" className={`${inputCls} resize-none`} />
                    </div>
                  </>
                )}
                <button type="button" className="bg-[#5a4838] text-white py-8 rounded-full text-label hover:bg-[#FD2F79] transition-all shadow-2xl group uppercase tracking-[0.2em] mt-8">
                  Initialize Transmission <span className="inline-block group-hover:translate-x-2 transition-transform ml-2">→</span>
                </button>
             </form>
          </div>
        </div>
      </main>

      {/* Footer System Label */}
      <div className="fixed bottom-10 left-10 pointer-events-none opacity-5">
         <span className="font-outfit text-[7px] font-black tracking-[1em] uppercase text-[#5a4838]">
           Vinorleague Digital Anthology v2.0
         </span>
      </div>
    </div>
  );
}
