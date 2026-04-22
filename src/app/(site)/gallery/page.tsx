"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

type Tag = "전체" | "와썹" | "오대리" | "깍두기파" | "컬렉티브";

interface GalleryItem {
  id: string;
  src: string;
  tag: Exclude<Tag, "전체">;
  label: string;
  no: string;
  w: number;
  h: number;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: "1",  src: "/temp/Characters_in_family_202604221543.jpeg",      tag: "컬렉티브", label: "패밀리 아카이브",      no: "001", w: 400, h: 480 },
  { id: "2",  src: "/temp/Blue_bunny_chick_202604221543.jpeg",           tag: "와썹",     label: "와니의 고요한 아침",   no: "002", w: 400, h: 560 },
  { id: "3",  src: "/temp/Chibi_character_soju_202604221543.jpeg",       tag: "깍두기파", label: "마피아의 밤",          no: "003", w: 400, h: 500 },
  { id: "4",  src: "/temp/Bunny_chick_frog_202604221543.jpeg",           tag: "와썹",     label: "썹의 소란스러운 하루", no: "004", w: 400, h: 440 },
  { id: "5",  src: "/temp/Chibi_characters_in_202604221543.jpeg",        tag: "컬렉티브", label: "함께하는 순간",        no: "005", w: 400, h: 520 },
  { id: "6",  src: "/temp/토끼와_개구리_숲속_202604221543.jpeg",         tag: "와썹",     label: "숲속의 나들이",        no: "006", w: 400, h: 580 },
  { id: "7",  src: "/temp/Characters_in_family_202604221543_2.jpeg",     tag: "컬렉티브", label: "세계관 전집",          no: "007", w: 400, h: 460 },
  { id: "8",  src: "/temp/Chibi_character_soju_202604221543_2.jpeg",     tag: "깍두기파", label: "조직의 파티",          no: "008", w: 400, h: 540 },
  { id: "9",  src: "/temp/Chibi_bunny_chick_202604221543.jpeg",          tag: "와썹",     label: "치비 시리즈 I",       no: "009", w: 400, h: 500 },
  { id: "10", src: "/temp/Collectible_toy_set_202604221543.jpeg",        tag: "컬렉티브", label: "콜렉터블 세트",        no: "010", w: 400, h: 460 },
  { id: "11", src: "/temp/캐릭터와_토끼_걸어가는_202604221543.jpeg",     tag: "와썹",     label: "산책의 시간",          no: "011", w: 400, h: 560 },
  { id: "12", src: "/temp/첨부_이미지_3D_202604221543.jpeg",             tag: "컬렉티브", label: "3D 아카이브",          no: "012", w: 400, h: 480 },
  { id: "13", src: "/temp/Bunny_chick_frog_202604221543_2.jpeg",         tag: "와썹",     label: "와니와 친구들",        no: "013", w: 400, h: 520 },
  { id: "14", src: "/temp/Chibi_bunny_chick_202604221543_2.jpeg",        tag: "와썹",     label: "치비 시리즈 II",      no: "014", w: 400, h: 440 },
  { id: "15", src: "/temp/Chibi_characters_in_202604221543_2.jpeg",      tag: "컬렉티브", label: "콜렉티브 Ep.2",       no: "015", w: 400, h: 500 },
  { id: "16", src: "/temp/Blue_bunny_holding_202604221543.jpeg",         tag: "와썹",     label: "와니의 하루",          no: "016", w: 400, h: 580 },
  { id: "17", src: "/temp/토끼와_개구리_숲속_202604221543_2.jpeg",       tag: "와썹",     label: "숲속의 아침 II",      no: "017", w: 400, h: 460 },
  { id: "18", src: "/temp/Chibi_characters_in_202604221543_3.jpeg",      tag: "컬렉티브", label: "콜렉티브 Ep.3",       no: "018", w: 400, h: 540 },
];

const FILTERS: Tag[] = ["전체", "와썹", "오대리", "깍두기파", "컬렉티브"];
const PER_PAGE = 12;

export default function GalleryPage() {
  const [filter, setFilter] = useState<Tag>("전체");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => filter === "전체" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.tag === filter),
    [filter]
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleFilter(f: Tag) {
    setFilter(f);
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-white relative font-sans selection:bg-[#FD2F79]/10 selection:text-[#FD2F79] overflow-hidden">
      <div className="fixed inset-0 bg-mesh opacity-30 pointer-events-none z-0" />
      <main className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-40 pb-80">

        {/* Header */}
        <header className="mb-12 md:mb-16 text-center">
          <span className="text-label text-[#FD2F79] mb-4 block tracking-[0.4em]">Gallery</span>
          <h1 className="text-h1 !text-[64px] md:!text-[120px] leading-[0.85] mb-8">
            Anthology.
          </h1>
          <p className="font-outfit text-sm text-[#5a4838]/50 leading-relaxed font-medium max-w-md mx-auto">
            바이너리그를 구성하는 세 가지 세계의 아트워크 아카이브.
            단순한 이미지를 넘어 하나의 서사가 됩니다.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                className={`font-outfit text-[13px] font-black tracking-[0.15em] uppercase px-6 py-3 rounded-full border transition-all duration-300 ${
                  filter === f
                    ? "bg-[#FD2F79] text-white border-[#FD2F79] shadow-[0_4px_20px_rgba(253,47,121,0.25)]"
                    : "border-[#5a4838]/20 text-[#5a4838]/50 hover:border-[#5a4838]/50 hover:text-[#5a4838]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <p className="font-outfit text-xs font-black text-[#5a4838]/20 tracking-widest mt-4 uppercase">
            {filtered.length} Works
          </p>
        </header>

        {/* Masonry grid */}
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <span className="font-outfit font-black text-[#5a4838]/10 text-[64px] leading-none">0</span>
            <span className="font-outfit font-black text-[#5a4838]/30 text-sm uppercase tracking-widest">
              준비 중인 아카이브입니다
            </span>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {visible.map((item) => (
              <div key={item.id} className="break-inside-avoid mb-4 group">
                <div className="relative overflow-hidden rounded-2xl bg-[#5a4838]/5">
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={item.w}
                    height={item.h}
                    className="w-full h-auto block transition-transform duration-[2000ms] group-hover:scale-105"
                  />
                  {/* Tag chip */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="font-outfit text-[10px] font-black tracking-[0.2em] uppercase bg-white/90 backdrop-blur-sm text-[#FD2F79] px-3 py-1.5 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#5a4838]/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center gap-3 p-6 text-center">
                    <span className="font-outfit text-[9px] font-black tracking-[0.5em] text-white/30 uppercase">
                      No. {item.no}
                    </span>
                    <h3 className="font-outfit font-black text-white text-lg tracking-tight leading-none uppercase">
                      {item.label}
                    </h3>
                    <div className="w-8 h-[1px] bg-[#FD2F79]" />
                  </div>
                </div>
                {/* Meta */}
                <div className="flex items-center justify-between mt-2.5 px-0.5">
                  <span className="font-outfit font-black text-sm text-[#5a4838] tracking-tight leading-none">
                    {item.label}
                  </span>
                  <span className="font-outfit text-[10px] font-black text-[#5a4838]/20 tracking-widest">
                    {item.no}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-20">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-10 h-10 rounded-full border border-[#5a4838]/15 font-outfit font-black text-sm text-[#5a4838]/30 hover:border-[#5a4838]/40 hover:text-[#5a4838] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              ←
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-full font-outfit font-black text-sm transition-all ${
                  page === i + 1
                    ? "bg-[#FD2F79] text-white shadow-[0_4px_16px_rgba(253,47,121,0.3)]"
                    : "text-[#5a4838]/30 hover:text-[#5a4838]"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-10 h-10 rounded-full border border-[#5a4838]/15 font-outfit font-black text-sm text-[#5a4838]/30 hover:border-[#5a4838]/40 hover:text-[#5a4838] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              →
            </button>
          </div>
        )}

      </main>
    </div>
  );
}
