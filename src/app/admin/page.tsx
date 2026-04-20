// src/app/admin/page.tsx
export default function AdminDashboard() {
  const stats = [
    { label: "Total Revenue", value: "₩1,240,000", change: "+12.5%", color: "text-[#5a4838]" },
    { label: "Active Orders", value: "24", change: "+5", color: "text-[#FD2F79]" },
    { label: "Unread Inquiries", value: "8", change: "-2", color: "text-[#5a4838]" },
    { label: "Vinus Members", value: "152", change: "+18", color: "text-[#5a4838]" },
  ];

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h4 className="font-outfit text-[10px] font-black tracking-[0.6em] text-[#FD2F79] mb-4 uppercase">Analytics Suite</h4>
        <h1 className="font-outfit font-black text-5xl tracking-tighter uppercase text-[#5a4838]">Executive Overview</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-10 rounded-[32px] soft-shadow border border-[#5a4838]/5 group hover:-translate-y-1 transition-all">
            <p className="font-outfit text-[9px] font-black tracking-[0.3em] text-[#5a4838]/40 uppercase mb-6">{stat.label}</p>
            <div className="flex items-baseline justify-between gap-4">
              <span className={`font-outfit text-2xl font-black ${stat.color}`}>{stat.value}</span>
              <span className="font-outfit text-[10px] font-bold text-green-500">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         <div className="lg:col-span-2 bg-white rounded-[40px] p-12 soft-shadow border border-[#5a4838]/5">
            <div className="flex justify-between items-center mb-10">
               <h3 className="font-outfit font-black text-xl uppercase tracking-tighter text-[#5a4838]">Live Sales Feed</h3>
               <button className="font-outfit text-[9px] font-black tracking-[0.2em] text-[#5a4838]/20 uppercase hover:text-[#FD2F79]">View All Logs</button>
            </div>
            <div className="space-y-6">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="flex items-center justify-between py-4 border-b border-[#5a4838]/5">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-[#5a4838]/5"></div>
                       <div>
                          <p className="font-outfit text-xs font-bold text-[#5a4838]">Order #202{i}954</p>
                          <p className="font-outfit text-[9px] text-[#5a4838]/40 uppercase tracking-widest">2 items · 5 mins ago</p>
                       </div>
                    </div>
                    <span className="font-outfit text-xs font-bold text-[#5a4838]">₩54,000</span>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-[#FD2F79] rounded-[40px] p-12 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 h-full flex flex-col justify-between">
               <h3 className="font-outfit font-black text-3xl uppercase tracking-tighter text-white leading-none">System<br/>Broadcast.</h3>
               <div className="space-y-6">
                  <p className="text-white/80 font-outfit text-sm leading-relaxed">바이너리그 2.0 시스템 동기화가 완료되었습니다. 모든 상품 정보가 아카이브에 백업되었습니다.</p>
                  <button className="w-full bg-white text-[#FD2F79] font-outfit text-[10px] font-black py-4 rounded-full uppercase tracking-widest">Read Patch Notes</button>
               </div>
            </div>
            {/* Decal background */}
            <div className="absolute -bottom-10 -right-10 font-outfit font-black text-[120px] text-white/10 leading-none pointer-events-none">VL</div>
         </div>
      </div>
    </div>
  );
}
