"use client";

import Image from "next/image";
import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import MarqueeSection from "@/components/MarqueeSection";

const FAQ_ITEMS = [
  {
    q: "바이너리그는 어떤 브랜드인가요?",
    a: "바이너리그(Vinorleague)는 정형화된 틀에서 벗어나 파편화된 감각을 모으고 연결하여 새로운 브랜드 서사를 구축하는 디지털 콜라주 아카이브 프로젝트입니다."
  },
  {
    q: "캐릭터 제작 의뢰가 가능한가요?",
    a: "네, 기업 및 개인의 브랜드 아이덴티티를 투영한 맞춤형 캐릭터 기획 및 제작 서비스를 제공합니다. COMMISSION 메뉴를 통해 상세 내용을 확인하실 수 있습니다."
  },
  {
    q: "굿즈는 어디서 구매할 수 있나요?",
    a: "공식 스마트스토어와 카카오톡 선물하기 등을 통해 정기적으로 새로운 굿즈 아카이브를 선보이고 있습니다. DISTRIBUTION 섹션의 링크를 확인해주세요."
  },
  {
    q: "상업적 이용이 가능한 캐릭터인가요?",
    a: "바이너리그의 모든 캐릭터와 아트워크의 저작권은 비너스프레드에 귀속되어 있으며, 별도의 라이선스 계약 없이는 상업적 이용이 불가능합니다."
  },
  {
    q: "제작 기간은 어느 정도 소요되나요?",
    a: "프로젝트의 복잡도와 범위에 따라 다르지만, 통상적으로 캐릭터 기획부터 최종 가이드 전달까지 4-6주 정도의 기간이 소요됩니다."
  },
  {
    q: "오프라인에서도 만날 수 있나요?",
    a: "시즌별 팝업 스토어와 전시회를 통해 오프라인 공간에서의 경험을 제안하고 있습니다. 상세 일정은 인스타그램(@vinorleague)을 통해 공지됩니다."
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-mesh font-sans selection:bg-[#FD2F79]/10 selection:text-[#FD2F79]">

      {/* SECTION 1: Hero */}
      <HeroCarousel />

      {/* SECTION 2: Scene 02 — Lifestyle */}
      <section className="relative py-16 md:py-28 px-6 md:px-8 flex flex-col items-center">
        <div className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-32 items-center">
          <div className="relative aspect-square overflow-hidden rounded-[36px] md:rounded-[60px] soft-shadow">
            <Image src="/scene2.jpg" alt="Vinorleague in Cafe" fill className="object-cover" />
          </div>
          <div className="text-center md:text-left">
            <span className="text-label text-[#FD2F79] mb-4 md:mb-8 block">Chapter 01</span>
            <h2 className="text-h2 !text-3xl sm:!text-5xl md:!text-[4.5rem] !leading-[1.05] mb-12 break-keep">
              오후의 나른한 공기,<br/>
              달콤한 휴식.
            </h2>
            <p className="text-[#5a4838]/70 leading-relaxed font-outfit text-sm mb-12 max-w-sm mx-auto md:mx-0 font-medium">
              따뜻한 커피 한 잔과 좋아하는 플레이리스트.<br/>
              바이너리그와 함께 당신의 오후에 부드러운 쉼표를 찍어보세요.
            </p>
            <Link href="/characters" className="text-label text-[#5a4838] border-b border-[#5a4838]/20 pb-2 hover:text-[#FD2F79] hover:border-[#FD2F79] transition-all">
              MEET THE CHARACTERS →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: Marquee Gallery */}
      <MarqueeSection />

      {/* SECTION 4: Scene 04 — About */}
      <section className="relative py-16 md:py-28 flex flex-col items-center bg-white/40">
        <div className="w-[1400px] max-w-full text-center px-6 md:px-8">
          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] anthology-card !rounded-[36px] md:!rounded-[60px] soft-shadow mb-16 md:mb-24 overflow-hidden">
            <Image src="/character.png" alt="Team Interview" fill className="object-cover" />
            <div className="absolute inset-0 bg-white/10 pointer-events-none" />
          </div>
          <span className="text-label text-[#FD2F79] mb-4 block">Final Chapter</span>
          <h2 className="text-h2 !text-4xl sm:!text-5xl md:!text-8xl mb-12">Beyond Characters.</h2>
          <p className="text-[#5a4838]/60 leading-relaxed font-outfit text-sm max-w-lg mx-auto mb-16 font-medium">
            우리는 단순히 귀여운 캐릭터를 만드는 것을 넘어,<br/>
            당신의 일상에 스며드는 따뜻한 감각의 조각들을 제안합니다.
          </p>
          <Link href="/about" className="text-label bg-[#FD2F79] text-white px-10 py-5 rounded-full hover:bg-[#5a4838] transition-all shadow-xl">
            READ THE ANTHOLOGY
          </Link>
        </div>
      </section>

      {/* SECTION 6: THE REQUEST — Commission Banner */}
      <section className="bg-[#5a4838] relative overflow-hidden py-16 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 relative z-10">

          {/* Top: Main commission content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-32 mb-20 md:mb-28">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <span className="text-label text-[#FD2F79] mb-8 block">Inquiry Management</span>
              <h3 className="text-h1 !text-white !text-4xl sm:!text-6xl md:!text-9xl mb-12">
                Character<br/>Production.
              </h3>
              <p className="text-white/40 font-outfit text-sm max-w-sm leading-relaxed mx-auto lg:mx-0 font-medium mb-16">
                브랜드 캐릭터, 기업 이모티콘, 굿즈 아트워크 등<br/>당신의 아이디어를 실체화하는 모든 과정.
              </p>
              <Link href="/commission" className="text-label bg-[#FD2F79] text-white px-10 py-5 rounded-full hover:bg-white hover:text-[#5a4838] transition-all shadow-xl">
                START PROJECT →
              </Link>
            </div>

            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative aspect-square lg:aspect-[4/3] w-full max-w-2xl group/img">
                <Image
                  src="/characters_collage.png"
                  alt="Vinor Characters Family"
                  fill
                  className="object-contain scale-110 group-hover:scale-115 transition-transform duration-1000 drop-shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
                />
              </div>
            </div>
          </div>

          {/* Bottom: Channel + CTA cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Naver Card */}
            <div className="bg-[#03C75A] hover:bg-[#02a84a] rounded-[32px] p-8 transition-all duration-700 relative overflow-hidden">
              <span className="font-outfit text-[12px] font-medium text-white/60 mb-3 block">Naver Store</span>
              <h4 className="text-h2 !text-xl md:!text-2xl !text-white mb-3">Goods Collectible Arv.</h4>
              <p className="text-white/60 text-xs md:text-sm font-outfit max-w-xs leading-relaxed font-medium">
                바이너리그 패밀리의 정수가 담긴 실물 굿즈를<br/>네이버 공식 스마트스토어에서 만나보세요.
              </p>
              <div className="absolute -bottom-4 -right-4 font-outfit font-black text-[100px] md:text-[140px] text-white/10 leading-none pointer-events-none">N</div>
            </div>

            {/* Kakao Card */}
            <div className="bg-[#F9C000] hover:bg-[#e0ac00] rounded-[32px] p-8 transition-all duration-700 relative overflow-hidden">
              <span className="font-outfit text-[12px] font-medium text-[#5a4838]/60 mb-3 block">Kakao Emoticon</span>
              <h4 className="text-h2 !text-xl md:!text-2xl !text-[#5a4838] mb-3">Daily Emotion Talk</h4>
              <p className="text-[#5a4838]/60 text-xs md:text-sm font-outfit max-w-xs leading-relaxed font-medium">
                당신의 일상적인 대화에 위트를 더해줄<br/>바이너리그 이모티콘을 지금 바로 입양하세요.
              </p>
              <div className="absolute -bottom-4 -right-4 font-outfit font-black text-[100px] md:text-[140px] text-[#5a4838]/10 leading-none pointer-events-none">K</div>
            </div>
          </div>


        </div>

      </section>

      {/* SECTION 7: THE ANSWERS — FAQ */}
      <section id="faq" className="py-16 md:py-28 px-6 md:px-8 bg-mesh">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 md:mb-32 text-center">
            <span className="text-label text-[#FD2F79]">Assistance</span>
            <h3 className="text-h2 !text-3xl sm:!text-5xl md:!text-8xl mt-4">FAQ</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="group border-b border-[#5a4838]/5 pb-12 flex flex-col gap-8">
                <h4 className="font-outfit font-black text-lg md:text-xl text-[#5a4838] tracking-tight group-hover:text-[#FD2F79] transition-colors leading-tight">
                  {item.q}
                </h4>
                <p className="text-label !normal-case !font-medium opacity-40 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}

          </div>

          {/* Contact CTA — 하단 */}
          <div className="mt-16 pt-12 border-t border-[#5a4838]/5 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-outfit text-[12px] font-medium text-[#FD2F79] mb-2">Direct Communication</p>
              <h4 className="font-outfit font-black text-xl md:text-2xl text-[#5a4838]">더 궁금한 내용이 있으신가요?</h4>
              <p className="font-outfit text-sm text-[#5a4838]/40 font-medium mt-2">전담 매니저가 1:1 상담을 도와드립니다.</p>
            </div>
            <Link href="/contact" className="shrink-0 font-outfit text-[13px] font-medium text-[#5a4838]/40 hover:text-[#FD2F79] transition-all">
              1:1 문의하기 →
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
