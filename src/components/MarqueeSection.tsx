"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface GalleryItem {
  src: string;
  tag: string;
  label: string;
}

const FALLBACK_ITEMS: GalleryItem[] = [
  { src: "/scene1.jpg",  tag: "Vol.01", label: "Daily Mood"      },
  { src: "/thumb1.jpg",  tag: "Obj.01", label: "Collectible Box" },
  { src: "/scene2.jpg",  tag: "Vol.02", label: "Cafe Scene"      },
  { src: "/thumb3.jpg",  tag: "Obj.03", label: "Phone Case"      },
  { src: "/thumb6.jpg",  tag: "Obj.06", label: "Travel Map"      },
  { src: "/scene4.jpg",  tag: "Vol.04", label: "Interview"       },
  { src: "/thumb7.jpg",  tag: "Obj.07", label: "Good Sports"     },
  { src: "/thumb2.jpg",  tag: "Obj.02", label: "Digital Clock"   },
  { src: "/thumb5.png",  tag: "Obj.05", label: "Duck Toy"        },
  { src: "/scene3.jpg",  tag: "Vol.03", label: "Office Life"     },
  { src: "/thumb8.png",  tag: "Obj.08", label: "Forest Spirit"   },
  { src: "/thumb4.jpg",  tag: "Obj.04", label: "Emb. Pouch"      },
];

function Card({ src, tag, label, offset }: GalleryItem & { offset: boolean }) {
  return (
    <div
      className="relative shrink-0 w-[240px] md:w-[360px] mx-4 md:mx-6 rounded-[24px] overflow-hidden soft-shadow bg-white group cursor-pointer aspect-[3/4] z-0 transition-transform duration-700"
      style={{ transform: offset ? "translateY(40px)" : "translateY(-40px)" }}
    >
      <Image
        src={src}
        alt={label}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
      />
      
      {/* Tag Overlay */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        <span className="text-label !text-[10px] !tracking-widest bg-white/90 backdrop-blur-md text-[#FD2F79] px-4 py-2 rounded-full uppercase shadow-xl group-hover:bg-[#FD2F79] group-hover:text-white transition-all duration-500">
          {tag}
        </span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-2 group-hover:translate-y-0">
          <p className="text-label text-white !normal-case drop-shadow-lg font-bold">{label}</p>
        </div>
      </div>
      
      {/* Interactive Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </div>
  );
}

export default function MarqueeSection() {
  const [items, setItems] = useState<GalleryItem[]>(FALLBACK_ITEMS);

  useEffect(() => {
    async function fetchItems() {
      if (!supabase) return;
      const { data } = await supabase
        .from("gallery_items")
        .select("src, tag, label")
        .order("created_at", { ascending: false });
      if (data && data.length > 0) setItems(data);
    }
    fetchItems();
  }, []);

  const doubled = [...items, ...items];

  return (
    <section className="relative py-16 md:py-28 overflow-hidden bg-white/20 backdrop-blur-sm">
      <div className="max-w-[1500px] mx-auto px-8 mb-24 md:mb-40 flex flex-col items-center text-center gap-4">
        <span className="text-label text-[#FD2F79]">Exhibition</span>
        <h3 className="text-h2 !text-4xl md:!text-8xl">
          Brand Gallery
        </h3>
      </div>

      <div
        className="flex items-center py-10"
        style={{ animation: "marquee 60s linear infinite" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "running")}
      >
        {doubled.map((item, i) => (
          <Card key={i} {...item} offset={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
