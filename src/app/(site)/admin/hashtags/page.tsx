"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const PAGES = [
  { path: "/", label: "메인 (홈)" },
  { path: "/characters", label: "캐릭터 소개" },
  { path: "/about", label: "브랜드 스토리" },
  { path: "/contact", label: "연락처" },
  { path: "/commission", label: "제작의뢰" },
  { path: "/wallpapers", label: "배경화면" },
];

export default function HashtagsPage() {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [metaData, setMetaData] = useState<Record<string, any>>({});
  const [selectedPage, setSelectedPage] = useState("/");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch from Supabase
  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("seo_config").select("*");
      if (data) {
        const hTags = data.find(item => item.key === "hashtags")?.value || [];
        const mData = data.find(item => item.key === "page_meta")?.value || {};
        setHashtags(hTags);
        setMetaData(mData);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const addTag = () => {
    const tag = newTag.trim();
    if (!tag || hashtags.includes(tag)) return;
    setHashtags([...hashtags, tag]);
    setNewTag("");
  };

  const removeTag = (tag: string) => setHashtags(hashtags.filter((t) => t !== tag));

  const updateMeta = (field: string, value: string) =>
    setMetaData((prev) => ({ ...prev, [selectedPage]: { ...prev[selectedPage], [field]: value } }));

  const handleSave = async () => {
    setLoading(true);
    await Promise.all([
      supabase.from("seo_config").upsert({ key: "hashtags", value: hashtags }),
      supabase.from("seo_config").upsert({ key: "page_meta", value: metaData }),
    ]);
    setSaved(true);
    setLoading(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const meta = metaData[selectedPage];

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-end">
        <div>
          <h4 className="font-outfit text-[10px] font-black tracking-[0.6em] text-[#FD2F79] mb-4 uppercase">SEO Management</h4>
          <h1 className="font-outfit font-black text-5xl tracking-tighter uppercase text-[#5a4838]">Tags & Meta</h1>
        </div>
        <button
          onClick={handleSave}
          className={`font-outfit text-[10px] font-black tracking-[0.4em] px-10 py-5 rounded-full uppercase transition-all shadow-lg ${saved ? "bg-green-500 text-white" : "bg-[#5a4838] text-white hover:bg-[#FD2F79]"}`}
        >
          {saved ? "저장됨 ✓" : "변경사항 저장"}
        </button>
      </div>

      {/* Hashtag Section */}
      <div className="bg-white rounded-[40px] soft-shadow border border-[#5a4838]/5 p-10">
        <h2 className="font-outfit font-black text-2xl tracking-tighter text-[#5a4838] mb-2 uppercase">Hashtags</h2>
        <p className="font-outfit text-xs text-[#5a4838]/40 mb-8">사이트 전체에 적용되는 키워드 목록입니다. SEO 메타 keywords 태그에 사용됩니다.</p>

        <div className="flex flex-wrap gap-3 mb-8">
          {hashtags.map((tag) => (
            <span key={tag} className="group flex items-center gap-2 font-outfit text-xs font-black bg-[#5a4838]/5 text-[#5a4838] px-4 py-2 rounded-full border border-[#5a4838]/10 hover:border-[#FD2F79]/30 transition-all">
              #{tag}
              <button onClick={() => removeTag(tag)} className="text-[#5a4838]/20 hover:text-[#FD2F79] transition-colors font-bold text-base leading-none">×</button>
            </span>
          ))}
        </div>

        <div className="flex gap-3 max-w-md">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            placeholder="새 해시태그 입력..."
            className="flex-1 bg-[#5a4838]/5 border border-[#5a4838]/10 rounded-2xl px-5 py-3 font-outfit text-sm text-[#5a4838] placeholder:text-[#5a4838]/30 focus:outline-none focus:border-[#FD2F79] transition-all"
          />
          <button
            onClick={addTag}
            className="font-outfit text-[10px] font-black tracking-[0.3em] uppercase bg-[#FD2F79] text-white px-6 py-3 rounded-2xl hover:bg-[#5a4838] transition-all"
          >
            추가
          </button>
        </div>
      </div>

      {/* Meta Tags Section */}
      <div className="bg-white rounded-[40px] soft-shadow border border-[#5a4838]/5 p-10">
        <h2 className="font-outfit font-black text-2xl tracking-tighter text-[#5a4838] mb-2 uppercase">Page Meta Tags</h2>
        <p className="font-outfit text-xs text-[#5a4838]/40 mb-8">페이지별 title, description, OG 태그를 관리합니다.</p>

        {/* Page Selector */}
        <div className="flex flex-wrap gap-2 mb-10">
          {PAGES.map((p) => (
            <button
              key={p.path}
              onClick={() => setSelectedPage(p.path)}
              className={`font-outfit text-[10px] font-black tracking-[0.2em] uppercase px-5 py-2.5 rounded-full transition-all border ${selectedPage === p.path ? "bg-[#5a4838] text-white border-[#5a4838]" : "border-[#5a4838]/10 text-[#5a4838]/50 hover:border-[#5a4838]/30"}`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Meta Fields */}
        <div className="grid grid-cols-1 gap-6 max-w-2xl">
          {[
            { field: "title", label: "Title Tag" },
            { field: "description", label: "Meta Description" },
            { field: "ogTitle", label: "OG Title" },
            { field: "ogDescription", label: "OG Description" },
          ].map(({ field, label }) => (
            <div key={field} className="flex flex-col gap-2">
              <label className="font-outfit text-[10px] font-black tracking-[0.3em] uppercase text-[#5a4838]/50">{label}</label>
              <input
                type="text"
                value={meta?.[field as keyof typeof meta] ?? ""}
                onChange={(e) => updateMeta(field, e.target.value)}
                className="bg-[#5a4838]/5 border border-[#5a4838]/10 rounded-2xl px-5 py-3 font-outfit text-sm text-[#5a4838] focus:outline-none focus:border-[#FD2F79] transition-all"
              />
              <span className="font-outfit text-[9px] text-[#5a4838]/30 px-1">
                {(meta?.[field as keyof typeof meta] ?? "").length}자
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
