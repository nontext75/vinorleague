// src/app/admin/layout.tsx
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f8f5f2] font-sans selection:bg-[#FD2F79]/10 selection:text-[#FD2F79]">
      {/* Admin Sidebar */}
      <aside className="w-72 bg-white border-r border-[#5a4838]/10 flex flex-col fixed h-full z-50">
        <div className="p-10">
          <Link href="/" className="font-outfit font-black tracking-[0.4em] text-[#FD2F79] text-sm uppercase">
            Vinor League
          </Link>
          <div className="mt-2 font-outfit text-[8px] font-black tracking-[0.2em] text-[#5a4838]/40 uppercase">
            Internal Console v1.0
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-2 py-10">
          <Link href="/admin" className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-[#5a4838] text-white font-outfit text-[10px] font-black tracking-[0.3em] uppercase">
             Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-[#5a4838]/60 hover:bg-[#5a4838]/5 hover:text-[#5a4838] font-outfit text-[10px] font-black tracking-[0.3em] uppercase transition-all">
             Collections
          </Link>
          <Link href="/admin/inquiries" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-[#5a4838]/60 hover:bg-[#5a4838]/5 hover:text-[#5a4838] font-outfit text-[10px] font-black tracking-[0.3em] uppercase transition-all">
             Inquiries
          </Link>
        </nav>

        <div className="p-10 border-t border-[#5a4838]/5">
           <button className="font-outfit text-[9px] font-black tracking-[0.4em] text-[#FD2F79] uppercase hover:underline">Sign Out</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-16">
        {children}
      </main>
    </div>
  );
}
