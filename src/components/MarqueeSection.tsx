"use client";

import Image from "next/image";

const items = [
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

function Card({ src, tag, label, offset }: { src: string; tag: string; label: string; offset: boolean }) {
  return (
    <div
      className="relative shrink-0 w-[360px] mx-4 rounded-[32px] overflow-hidden bg-white border-[10px] border-white shadow-[0_16px_48px_-10px_rgba(90,72,56,0.20)] group cursor-pointer"
      style={{ transform: offset ? "translateY(32px)" : "translateY(-32px)" }}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="font-outfit text-[8px] font-black tracking-[0.25em] bg-white/90 backdrop-blur-sm text-[#FD2F79] px-3 py-1.5 rounded-full uppercase shadow-sm">
            {tag}
          </span>
        </div>
      </div>
      <div className="px-5 py-4">
        <p className="font-outfit text-xs font-black tracking-[0.2em] text-[#5a4838] uppercase truncate">{label}</p>
      </div>
    </div>
  );
}

export default function MarqueeSection() {
  const doubled = [...items, ...items];

  return (
    <section className="relative py-32 overflow-hidden bg-white/30 backdrop-blur-sm">
      <div
        className="flex items-center"
        style={{ animation: "marquee 36s linear infinite" }}
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
