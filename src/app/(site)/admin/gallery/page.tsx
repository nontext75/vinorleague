"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface GalleryItem {
  id: string;
  src: string;
  tag: string;
  label: string;
}

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ src: "", tag: "", label: "" });

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    if (!supabase) { setLoading(false); return; }
    const { data } = await supabase.from("gallery_items").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
    setLoading(false);
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    const { error } = await supabase.from("gallery_items").insert([newItem]);
    if (!error) {
      setIsAdding(false);
      setNewItem({ src: "", tag: "", label: "" });
      fetchGallery();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!supabase || !confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("gallery_items").delete().eq("id", id);
    if (!error) fetchGallery();
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-end">
        <div>
          <h4 className="font-outfit text-[10px] font-black tracking-[0.6em] text-[#FD2F79] mb-4 uppercase">Content Curator</h4>
          <h1 className="font-outfit font-black text-5xl tracking-tighter uppercase text-[#5a4838]">Gallery</h1>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="font-outfit text-[10px] font-black tracking-[0.4em] bg-[#5a4838] text-white px-10 py-5 rounded-full uppercase hover:bg-[#FD2F79] transition-all shadow-lg"
        >
          {isAdding ? "Cancel" : "Add Image"}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-[40px] p-10 soft-shadow border border-[#5a4838]/5">
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="font-outfit text-[10px] font-black tracking-[0.3em] uppercase text-[#5a4838]/40">Image URL</label>
              <input type="text" required value={newItem.src} onChange={e => setNewItem({...newItem, src: e.target.value})} className="w-full bg-[#5a4838]/5 border border-[#5a4838]/10 rounded-2xl px-5 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="font-outfit text-[10px] font-black tracking-[0.3em] uppercase text-[#5a4838]/40">Tag (e.g. Vol.01)</label>
              <input type="text" required value={newItem.tag} onChange={e => setNewItem({...newItem, tag: e.target.value})} className="w-full bg-[#5a4838]/5 border border-[#5a4838]/10 rounded-2xl px-5 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="font-outfit text-[10px] font-black tracking-[0.3em] uppercase text-[#5a4838]/40">Label (e.g. Office Life)</label>
              <input type="text" required value={newItem.label} onChange={e => setNewItem({...newItem, label: e.target.value})} className="w-full bg-[#5a4838]/5 border border-[#5a4838]/10 rounded-2xl px-5 py-3 text-sm" />
            </div>
            <div className="md:col-span-3">
              <button type="submit" disabled={loading} className="w-full bg-[#FD2F79] text-white py-5 rounded-full font-outfit text-xs font-black uppercase tracking-widest hover:bg-[#5a4838] transition-all shadow-2xl">
                {loading ? "Adding..." : "Add to Gallery Marquee"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((item) => (
          <div key={item.id} className="group relative">
            <div className="aspect-[3/4] bg-white rounded-[32px] soft-shadow overflow-hidden border border-[#5a4838]/5">
              <Image src={item.src} alt={item.label} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <button onClick={() => handleDelete(item.id)} className="bg-white text-red-500 font-bold px-6 py-2 rounded-full uppercase text-[10px] tracking-widest shadow-xl hover:bg-red-500 hover:text-white transition-all">
                   Delete
                 </button>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="font-outfit text-[8px] font-black tracking-widest bg-[#FD2F79]/10 text-[#FD2F79] px-3 py-1 rounded-full uppercase">{item.tag}</span>
              <p className="font-outfit text-xs font-bold text-[#5a4838] mt-2 truncate px-4">{item.label}</p>
            </div>
          </div>
        ))}
        {loading && [1,2,3,4].map(i => <div key={i} className="aspect-[3/4] bg-[#5a4838]/5 animate-pulse rounded-[32px]"></div>)}
      </div>
    </div>
  );
}
