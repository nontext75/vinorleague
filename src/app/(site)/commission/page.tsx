// src/app/(site)/commission/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const SERVICE_TYPES = [
  { id: "character", label: "캐릭터 디자인", desc: "브랜드 전용 캐릭터 IP를 처음부터 디자인합니다.", icon: "✦" },
  { id: "goods", label: "굿즈 제작", desc: "기존 캐릭터를 활용한 다양한 굿즈 아이템을 제작합니다.", icon: "◈" },
  { id: "emoticon", label: "이모티콘 제작", desc: "카카오톡, LINE 등 플랫폼용 이모티콘을 제작합니다.", icon: "◉" },
  { id: "ip", label: "IP 라이선싱", desc: "Vinorleague 캐릭터를 활용한 협업 및 라이선스를 협의합니다.", icon: "◇" },
];

const PROCESS_STEPS = [
  { step: "01", title: "의뢰 접수", desc: "폼을 통해 의뢰 내용을 보내주세요." },
  { step: "02", title: "상담 및 견적", desc: "영업일 2~3일 내 연락드려 요구사항을 확인합니다." },
  { step: "03", title: "계약 및 착수", desc: "견적 확정 후 계약서 작성과 선금 입금으로 작업을 시작합니다." },
  { step: "04", title: "납품 및 피드백", desc: "초안 → 수정 → 최종 납품 순서로 진행합니다." },
];

type FormState = "idle" | "loading" | "success" | "error";

export default function CommissionPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const inputCls = "w-full bg-transparent border-b border-[#5a4838]/10 px-5 py-4 font-outfit text-base text-[#5a4838] placeholder:text-[#5a4838]/20 focus:outline-none focus:border-[#FD2F79] transition-all";
  const labelCls = "text-label !text-[10px] opacity-40 mb-3 block";

  return (
    <div className="min-h-screen bg-white relative font-sans selection:bg-[#FD2F79]/10 selection:text-[#FD2F79] overflow-hidden">
      <div className="fixed inset-0 bg-mesh opacity-30 pointer-events-none z-0"></div>

      <main className="relative z-10 pt-40 pb-80">
        {/* Editorial Header */}
        <header className="editorial-header">
          <span className="text-label text-[#FD2F79] mb-4 block tracking-[0.4em] uppercase">Creative Project</span>
          <h1 className="text-h1 !text-6xl md:!text-[140px] tracking-[-0.05em] leading-[0.8] mb-12 uppercase">
            Builder.
          </h1>
          <p className="font-outfit text-sm md:text-xl text-[#5a4838]/60 leading-relaxed max-w-xl mx-auto font-bold mt-12">
            귀하의 브랜드 가치를 캐릭터라는 새로운 언어로 번역합니다. <br/>
            초기 컨셉 디자인부터 굿즈 제작, 라이선싱까지 올인원 서비스를 제공합니다.
          </p>
        </header>

        {/* Service Grid - Systemized */}
        <section className="max-w-[1400px] mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-60">
          {SERVICE_TYPES.map((s) => (
            <div key={s.id} className="bg-white/40 backdrop-blur-xl border border-[#5a4838]/5 p-12 rounded-[60px] soft-shadow group hover:-translate-y-4 transition-all duration-700">
              <span className="text-4xl text-[#FD2F79] block mb-8 group-hover:scale-125 transition-transform origin-left">{s.icon}</span>
              <h3 className="font-outfit font-black text-2xl text-[#5a4838] mb-4 uppercase tracking-tight leading-none">{s.label}</h3>
              <p className="text-label !text-[11px] opacity-40 leading-relaxed normal-case font-bold">{s.desc}</p>
            </div>
          ))}
        </section>

        {/* Workflow Section - Editorial Style */}
        <section className="bg-[#5a4838] py-40 md:py-60 mb-80 relative overflow-hidden group">
           <div className="max-w-[1400px] mx-auto px-8 md:px-12 relative z-10">
              <div className="mb-32">
                <span className="text-label text-[#FD2F79] mb-6 block uppercase tracking-[0.4em]">Our Workflow</span>
                <h2 className="text-h1 !text-white !text-6xl md:!text-[120px] !leading-[0.85]">Simple.<br/>Efficient.</h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
                {PROCESS_STEPS.map((p) => (
                  <div key={p.step} className="flex flex-col gap-8 group/step">
                    <span className="font-outfit font-black text-white/5 group-hover/step:text-[#FD2F79]/40 text-7xl md:text-9xl transition-colors duration-700 leading-none">{p.step}</span>
                    <h4 className="font-outfit font-black text-white text-xl md:text-2xl uppercase tracking-tight">{p.title}</h4>
                    <p className="text-label !text-[11px] text-white/40 leading-relaxed normal-case font-bold">{p.desc}</p>
                  </div>
                ))}
              </div>
           </div>
           <div className="absolute top-1/2 right-0 -translate-y-1/2 font-outfit font-black text-[30vw] text-white/[0.01] pointer-events-none uppercase select-none group-hover:translate-x-[-10%] transition-transform duration-[5000ms]">
             PROCESS
           </div>
        </section>

        {/* Request Form - Clean System */}
        <section className="max-w-[1400px] mx-auto px-8 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="lg:sticky lg:top-40 h-fit">
            <span className="text-label text-[#FD2F79] mb-6 block tracking-[0.4em]">Inquiry Form</span>
            <h2 className="text-h1 !text-6xl md:!text-8xl mb-12 uppercase leading-[0.9]">Ready<br/>to Deploy?</h2>
            <div className="bg-white/40 backdrop-blur-xl border border-[#5a4838]/5 p-12 rounded-[60px] soft-shadow max-w-md">
              <p className="font-outfit text-sm text-[#5a4838]/60 leading-relaxed mb-10 font-bold">
                영업일 기준 48시간 이내에 첫 번째 상담을 위해 담당 매니저가 직접 연락드립니다.
              </p>
              <Link href="/contact" className="text-label text-[#FD2F79] border-b-2 border-[#FD2F79]/20 pb-1 hover:border-[#FD2F79] transition-all">
                General Inquiry →
              </Link>
            </div>
          </div>

          <div className="bg-white p-12 md:p-20 rounded-[60px] md:rounded-[80px] shadow-[0_60px_120px_-30px_rgba(90,72,56,0.15)]">
             <form className="flex flex-col gap-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className={labelCls}>Name / Brand</label>
                    <input type="text" placeholder="홍길동" className={inputCls} />
                  </div>
                  <div className="space-y-2">
                    <label className={labelCls}>Contact Email</label>
                    <input type="email" placeholder="hello@vinorleague.com" className={inputCls} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Project Category</label>
                  <select className={`${inputCls} appearance-none cursor-pointer`}>
                    <option value="">Select Service</option>
                    <option value="캐릭터 디자인">캐릭터 디자인</option>
                    <option value="굿즈 제작">굿즈 제작</option>
                    <option value="이모티콘 제작">이모티콘 제작</option>
                    <option value="IP 라이선싱">IP 라이선싱</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Project Detail</label>
                  <textarea rows={5} placeholder="원하시는 작업을 자유롭게 설명해 주세요." className={`${inputCls} resize-none`} />
                </div>
                <button type="button" className="bg-[#FD2F79] text-white py-8 rounded-full text-label hover:bg-[#5a4838] transition-all shadow-2xl group uppercase tracking-[0.2em]">
                  Send Request <span className="inline-block group-hover:translate-x-2 transition-transform ml-2">→</span>
                </button>
             </form>
          </div>
        </section>
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
