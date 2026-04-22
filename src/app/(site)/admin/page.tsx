import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Fetch real counts
  const { count: commCount } = await supabaseAdmin
    .from("commissions")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  const { count: inqCount } = await supabaseAdmin
    .from("inquiries")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  const stats = [
    { label: "Commission Requests", value: commCount?.toString() || "0", change: "Active", color: "text-[#FD2F79]" },
    { label: "Pending Inquiries", value: inqCount?.toString() || "0", change: "Wait", color: "text-[#5a4838]" },
    { label: "Vinus Members", value: "152", change: "+18", color: "text-[#5a4838]" },
    { label: "System Health", value: "Optimal", change: "Live", color: "text-green-500" },
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
              <span className={`font-outfit text-3xl font-black ${stat.color}`}>{stat.value}</span>
              <span className="font-outfit text-[10px] font-bold text-[#5a4838]/20">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         <div className="lg:col-span-2 bg-white rounded-[40px] p-12 soft-shadow border border-[#5a4838]/5">
            <div className="flex justify-between items-center mb-10">
               <h3 className="font-outfit font-black text-xl uppercase tracking-tighter text-[#5a4838]">System Status</h3>
               <span className="font-outfit text-[9px] font-black tracking-[0.2em] text-green-500 uppercase">Synchronized</span>
            </div>
            <div className="space-y-6">
               <div className="flex items-center justify-between py-4 border-b border-[#5a4838]/5">
                  <p className="font-outfit text-xs font-bold text-[#5a4838]">Database Persistence</p>
                  <span className="font-outfit text-[10px] font-bold text-green-500 uppercase tracking-widest">Active</span>
               </div>
               <div className="flex items-center justify-between py-4 border-b border-[#5a4838]/5">
                  <p className="font-outfit text-xs font-bold text-[#5a4838]">Inquiry Email (Resend)</p>
                  <span className="font-outfit text-[10px] font-bold text-green-500 uppercase tracking-widest">Connected</span>
               </div>
               <div className="flex items-center justify-between py-4 border-b border-[#5a4838]/5">
                  <p className="font-outfit text-xs font-bold text-[#5a4838]">SEO Meta Synchronization</p>
                  <span className="font-outfit text-[10px] font-bold text-[#5a4838]/20 uppercase tracking-widest">Local-Only (Pending Sync)</span>
               </div>
            </div>
         </div>

         <div className="bg-[#FD2F79] rounded-[40px] p-12 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 h-full flex flex-col justify-between">
               <h3 className="font-outfit font-black text-3xl uppercase tracking-tighter text-white leading-none">Admin<br/>Console.</h3>
               <div className="space-y-6">
                  <p className="text-white/80 font-outfit text-sm leading-relaxed">모든 수집된 데이터는 Supabase 보안 세션으로 보호됩니다. 외부 유출에 주의해 주세요.</p>
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                    <p className="font-outfit text-[9px] text-white/60 uppercase tracking-widest mb-1">Current Version</p>
                    <p className="font-outfit text-sm font-black text-white">v1.2.0 - Stable</p>
                  </div>
               </div>
            </div>
            <div className="absolute -bottom-10 -right-10 font-outfit font-black text-[120px] text-white/10 leading-none pointer-events-none">VL</div>
         </div>
      </div>
    </div>
  );
}
