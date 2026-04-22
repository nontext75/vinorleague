"use client";

import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
  {
    title: "Vinus Memo",
    sub: "Chrome Extension · Tooling",
    desc: "직관적인 드래그 앤 드롭과 다이나믹한 타이머 기능을 갖춘 생산성 도구.",
    img: "/scene4.jpg", // Using placeholder for now
    tag: "Product Development",
  },
  {
    title: "Web Design System",
    sub: "Documentation · Framework",
    desc: "일관된 디자인 언어를 위한 고해상도 디자인 시스템 구축 및 배포.",
    img: "/scene2.jpg",
    tag: "Design System",
  }
];

export default function DevPortfolio() {
  return (
    <section className="py-24 px-6 md:px-8 bg-[#5a4838] relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 font-outfit font-black text-[200px] md:text-[400px] text-white/[0.02] leading-none pointer-events-none select-none">
        WORKS
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-20">
          <span className="font-outfit text-[10px] font-black tracking-[0.6em] text-[#FD2F79] uppercase">Professional Services</span>
          <h3 className="font-outfit font-black text-4xl md:text-7xl text-white mt-6 tracking-tighter uppercase leading-[0.9]">
            Beyond the<br/>Characters.
          </h3>
          <p className="text-white/40 font-outfit text-sm mt-8 max-w-sm leading-relaxed">
            바이너리그는 캐릭터 IP뿐만 아니라 디자인 시스템 구축, 웹 서비스 개발 등 차세대 디지털 경험을 설계하는 Vinuspread의 기술력을 공유합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PROJECTS.map((project, i) => (
            <div key={i} className="group cursor-default">
              <div className="relative aspect-[16/10] anthology-card !rounded-[32px] md:!rounded-[48px] bg-white/5 border-white/10 mb-8 soft-shadow overflow-hidden">
                <Image 
                  src={project.img} 
                  alt={project.title} 
                  fill 
                  className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute top-8 left-8">
                   <span className="font-outfit text-[9px] font-black tracking-[0.3em] bg-[#FD2F79] text-white px-4 py-2 rounded-full uppercase">
                     {project.tag}
                   </span>
                </div>
              </div>
              <h4 className="font-outfit font-black text-2xl text-white uppercase tracking-tight mb-2">{project.title}</h4>
              <p className="font-outfit text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">{project.sub}</p>
              <p className="text-white/60 text-sm leading-relaxed max-w-md">{project.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
           <p className="font-outfit text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Integrated Digital Solution by Vinuspread</p>
           <a href="mailto:vinus@vinus.co.kr" className="font-outfit text-[10px] font-black tracking-[0.4em] text-white uppercase border-b border-white/20 pb-2 hover:text-[#FD2F79] hover:border-[#FD2F79] transition-all">
             Start a Project →
           </a>
        </div>
      </div>
    </section>
  );
}
