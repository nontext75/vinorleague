// src/app/(site)/admin/inquiries/page.tsx
import { supabaseAdmin } from "@/lib/supabase";

const format = (date: string | Date) =>
  new Date(date).toLocaleString("ko-KR", { dateStyle: "short", timeStyle: "short" });

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  const { data: commissions } = await supabaseAdmin
    .from("commissions")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: generalInquiries } = await supabaseAdmin
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Precision Header */}
      <div className="flex justify-between items-end border-b border-[#5a4838]/10 pb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <span className="en-label !text-[#FD2F79] !opacity-100 tracking-[0.6em]">LINKAGE_LOG</span>
             <div className="w-12 h-[1px] bg-[#FD2F79]/20"></div>
          </div>
          <h1 className="kr-title !text-6xl md:!text-8xl tracking-tighter uppercase text-[#5a4838]">Inquiries</h1>
        </div>
        <div className="text-right">
           <p className="en-label !text-[10px] opacity-40 mb-2">LAST UPDATED</p>
           <p className="font-outfit font-black text-sm">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Commissions - Project Level Data */}
      <section>
        <div className="flex items-center gap-6 mb-10">
          <h3 className="kr-title !text-3xl uppercase tracking-tighter text-[#5a4838]">01 / Project Commissions</h3>
          <div className="flex-1 h-[1px] bg-[#5a4838]/5"></div>
          <span className="en-label !text-[10px] bg-[#5a4838] text-white px-6 py-2 rounded-full">UNIT_{commissions?.length || 0}</span>
        </div>

        <div className="bg-white/40 backdrop-blur-2xl rounded-[40px] border border-white/60 soft-shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#5a4838]/5 border-b border-[#5a4838]/5">
                <th className="p-8 en-label !text-[10px] !opacity-40 uppercase tracking-widest">Client & Credentials</th>
                <th className="p-8 en-label !text-[10px] !opacity-40 uppercase tracking-widest">Spec & Budget</th>
                <th className="p-8 en-label !text-[10px] !opacity-40 uppercase tracking-widest">Timestamp</th>
                <th className="p-8 en-label !text-[10px] !opacity-40 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5a4838]/5">
              {commissions?.map((item) => (
                <tr key={item.id} className="hover:bg-white transition-all group">
                  <td className="p-8">
                    <div className="flex flex-col gap-1">
                      <p className="font-outfit font-black text-lg text-[#5a4838]">{item.name}</p>
                      <p className="font-outfit text-xs text-[#5a4838]/40 tracking-tight">{item.email}</p>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex flex-col gap-1">
                      <p className="font-outfit text-xs font-black text-[#5a4838] uppercase tracking-[0.1em]">{item.service_type}</p>
                      <p className="en-label !text-[10px] !text-[#FD2F79] !opacity-100">{item.budget || "TBD"}</p>
                    </div>
                  </td>
                  <td className="p-8 font-outfit text-[11px] text-[#5a4838]/40 font-bold">
                    {item.created_at ? format(item.created_at) : "-"}
                  </td>
                  <td className="p-8 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <span className="en-label !text-[9px] !opacity-100 text-[#5a4838]/40 uppercase tracking-tighter">
                        {item.status === 'completed' ? 'Archived' : 'Active'}
                      </span>
                      <div className={`w-2.5 h-2.5 rounded-full ${item.status === 'completed' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-[#FD2F79] animate-pulse shadow-[0_0_10px_rgba(253,47,121,0.5)]'}`}></div>
                    </div>
                  </td>
                </tr>
              ))}
              {!commissions?.length && (
                <tr>
                  <td colSpan={4} className="p-20 text-center en-label !opacity-20 uppercase tracking-[0.4em]">NO_DATA_UNIT_01</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* General Inquiries - Partnership Level Data */}
      <section>
        <div className="flex items-center gap-6 mb-10">
          <h3 className="kr-title !text-3xl uppercase tracking-tighter text-[#5a4838]">02 / Global Partnership</h3>
          <div className="flex-1 h-[1px] bg-[#5a4838]/5"></div>
          <span className="en-label !text-[10px] bg-[#5a4838] text-white px-6 py-2 rounded-full">UNIT_{generalInquiries?.length || 0}</span>
        </div>

        <div className="bg-white/40 backdrop-blur-2xl rounded-[40px] border border-white/60 soft-shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#5a4838]/5 border-b border-[#5a4838]/5">
                <th className="p-8 en-label !text-[10px] !opacity-40 uppercase tracking-widest">Organization & Manager</th>
                <th className="p-8 en-label !text-[10px] !opacity-40 uppercase tracking-widest">Vector Type</th>
                <th className="p-8 en-label !text-[10px] !opacity-40 uppercase tracking-widest">Timestamp</th>
                <th className="p-8 en-label !text-[10px] !opacity-40 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5a4838]/5">
              {generalInquiries?.map((item) => (
                <tr key={item.id} className="hover:bg-white transition-all group">
                  <td className="p-8">
                    <div className="flex flex-col gap-1">
                      <p className="font-outfit font-black text-lg text-[#5a4838]">{item.name}</p>
                      {item.company && <p className="en-label !text-[9px] !text-[#FD2F79] !opacity-100 tracking-[0.2em]">{item.company}</p>}
                      <p className="font-outfit text-xs text-[#5a4838]/40 tracking-tight">{item.email}</p>
                    </div>
                  </td>
                  <td className="p-8">
                    <span className="font-outfit text-[10px] font-black px-4 py-2 rounded-lg bg-[#5a4838] text-white uppercase tracking-widest">
                      {item.type}
                    </span>
                  </td>
                  <td className="p-8 font-outfit text-[11px] text-[#5a4838]/40 font-bold">
                    {item.created_at ? format(item.created_at) : "-"}
                  </td>
                  <td className="p-8 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <span className="en-label !text-[9px] !opacity-100 text-[#5a4838]/40 uppercase tracking-tighter">
                        {item.status === 'completed' ? 'Handled' : 'Unread'}
                      </span>
                      <div className={`w-2.5 h-2.5 rounded-full ${item.status === 'completed' ? 'bg-green-500' : 'bg-[#FD2F79] animate-pulse shadow-[0_0_10px_rgba(253,47,121,0.5)]'}`}></div>
                    </div>
                  </td>
                </tr>
              ))}
              {!generalInquiries?.length && (
                <tr>
                  <td colSpan={4} className="p-20 text-center en-label !opacity-20 uppercase tracking-[0.4em]">NO_DATA_UNIT_02</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
