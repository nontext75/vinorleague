"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface Wallpaper {
  id: string;
  created_at: string;
  title: string;
  type: "mobile" | "pc";
  url: string;
  thumbnail: string;
}

export default function WallpapersAdminPage() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newWallpaper, setNewWallpaper] = useState({ title: "", type: "mobile", url: "", thumbnail: "" });

  useEffect(() => {
    fetchWallpapers();
  }, []);

  async function fetchWallpapers() {
    const { data } = await supabase.from("wallpapers").select("*").order("created_at", { ascending: false });
    if (data) setWallpapers(data);
    setLoading(false);
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("wallpapers").insert([newWallpaper]);
    if (!error) {
      setIsAdding(false);
      setNewWallpaper({ title: "", type: "mobile", url: "", thumbnail: "" });
      fetchWallpapers();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("wallpapers").delete().eq("id", id);
    if (!error) fetchWallpapers();
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-end">
        <div>
          <h4 className="font-outfit text-[10px] font-black tracking-[0.6em] text-[#FD2F79] mb-4 uppercase">Asset Library</h4>
          <h1 className="font-outfit font-black text-5xl tracking-tighter uppercase text-[#5a4838]">Wallpapers</h1>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="font-outfit text-[10px] font-black tracking-[0.4em] bg-[#5a4838] text-white px-10 py-5 rounded-full uppercase hover:bg-[#FD2F79] transition-all shadow-lg"
        >
          {isAdding ? "Close Form" : "Add New Wallpaper"}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-[40px] p-10 soft-shadow border border-[#5a4838]/5">
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
               <div className="space-y-2">
                 <label className="font-outfit text-[10px] font-black tracking-[0.3em] uppercase text-[#5a4838]/40">Title</label>
                 <input 
                   type="text" required 
                   value={newWallpaper.title}
                   onChange={e => setNewWallpaper({...newWallpaper, title: e.target.value})}
                   className="w-full bg-[#5a4838]/5 border border-[#5a4838]/10 rounded-2xl px-5 py-3 text-sm" 
                 />
               </div>
               <div className="space-y-2">
                 <label className="font-outfit text-[10px] font-black tracking-[0.3em] uppercase text-[#5a4838]/40">Device Type</label>
                 <select 
                   value={newWallpaper.type}
                   onChange={e => setNewWallpaper({...newWallpaper, type: e.target.value as any})}
                   className="w-full bg-[#5a4838]/5 border border-[#5a4838]/10 rounded-2xl px-5 py-3 text-sm"
                 >
                   <option value="mobile">Mobile</option>
                   <option value="pc">PC / Desktop</option>
                 </select>
               </div>
            </div>
            <div className="space-y-6">
               <div className="space-y-2">
                 <label className="font-outfit text-[10px] font-black tracking-[0.3em] uppercase text-[#5a4838]/40">Asset URL (High-Res)</label>
                 <input 
                   type="text" required 
                   value={newWallpaper.url}
                   onChange={e => setNewWallpaper({...newWallpaper, url: e.target.value})}
                   className="w-full bg-[#5a4838]/5 border border-[#5a4838]/10 rounded-2xl px-5 py-3 text-sm" 
                 />
               </div>
               <div className="space-y-2">
                 <label className="font-outfit text-[10px] font-black tracking-[0.3em] uppercase text-[#5a4838]/40">Thumbnail URL</label>
                 <input 
                   type="text" required 
                   value={newWallpaper.thumbnail}
                   onChange={e => setNewWallpaper({...newWallpaper, thumbnail: e.target.value})}
                   className="w-full bg-[#5a4838]/5 border border-[#5a4838]/10 rounded-2xl px-5 py-3 text-sm" 
                 />
               </div>
            </div>
            <div className="md:col-span-2">
              <button type="submit" disabled={loading} className="w-full bg-[#FD2F79] text-white py-5 rounded-full font-outfit text-xs font-black uppercase tracking-widest hover:bg-[#5a4838] transition-all">
                {loading ? "Processing..." : "Save Wallpaper Asset"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {wallpapers.map((wp) => (
          <div key={wp.id} className="group relative">
            <div className="aspect-[3/4] bg-white rounded-[32px] soft-shadow overflow-hidden border border-[#5a4838]/5">
              <Image 
                src={wp.thumbnail} 
                alt={wp.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end h-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button 
                   onClick={() => handleDelete(wp.id)}
                   className="bg-white/20 hover:bg-red-500 text-white p-2 rounded-full backdrop-blur-md transition-all self-end"
                 >
                   <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                     <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                   </svg>
                 </button>
              </div>
            </div>
            <div className="mt-4 px-2">
               <p className="font-outfit text-[10px] font-black text-[#FD2F79] uppercase tracking-widest mb-1">{wp.type}</p>
               <h3 className="font-outfit text-xs font-bold text-[#5a4838] truncate">{wp.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
