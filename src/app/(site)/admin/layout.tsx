// src/app/(site)/admin/layout.tsx
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f8f5f2] font-sans selection:bg-[#FD2F79]/10 selection:text-[#FD2F79] relative overflow-hidden">
      {/* Precision Grid Overlay (Admin Only) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0">
        <div className="grid grid-cols-[repeat(60,minmax(0,1fr))] h-full border-l border-[#5a4838]">
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="border-r border-[#5a4838]"></div>
          ))}
        </div>
      </div>

      {/* Admin Sidebar - Technical Interface */}
      <aside className="w-80 bg-white/80 backdrop-blur-3xl border-r border-[#5a4838]/10 flex flex-col fixed h-full z-50">
        <div className="p-12 border-b border-[#5a4838]/5">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-3 h-3 rounded-full bg-[#FD2F79] animate-pulse"></div>
             <Link href="/" className="font-outfit font-black tracking-[0.4em] text-[#FD2F79] text-xs uppercase">
               Vinorleague
             </Link>
          </div>
          <div className="font-outfit text-[10px] font-black tracking-[0.2em] text-[#5a4838]/40 uppercase">
            Vinorleague Internal Console v1.01 / Auth OK
          </div>
        </div>

        <nav className="flex-1 px-8 space-y-3 py-12">
          {[
            { href: "/admin", label: "Dashboard", code: "DSH-00" },
            { href: "/admin/products", label: "Collections", code: "COL-01" },
            { href: "/admin/inquiries", label: "Inquiries", code: "INQ-02" },
            { href: "/admin/hashtags", label: "Tags & Meta", code: "TAG-03" },
          ].map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className="group flex flex-col gap-1 px-8 py-5 rounded-[24px] text-[#5a4838]/40 hover:bg-[#5a4838] hover:text-white transition-all duration-500"
            >
              <span className="font-outfit text-[8px] font-black tracking-widest opacity-40 group-hover:opacity-100">{item.code}</span>
              <span className="font-outfit text-[11px] font-black tracking-[0.3em] uppercase">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-12 border-t border-[#5a4838]/5">
           <button className="en-label !text-[#FD2F79] !opacity-100 hover:scale-105 transition-all">TERMINATE SESSION</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-80 p-20 relative z-10">
        {children}
      </main>
    </div>
  );
}
