// src/app/admin/products/page.tsx
import Image from "next/image";
import { PRODUCTS } from "@/lib/constants";

export default function AdminProductsPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-end">
        <div>
          <h4 className="font-outfit text-[10px] font-black tracking-[0.6em] text-[#FD2F79] mb-4 uppercase">Asset Management</h4>
          <h1 className="font-outfit font-black text-5xl tracking-tighter uppercase text-[#5a4838]">Collections</h1>
        </div>
        <button className="bg-[#5a4838] text-white font-outfit text-[10px] font-black tracking-[0.4em] px-10 py-5 rounded-full uppercase hover:bg-[#FD2F79] transition-all shadow-lg">
          Add New Object
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-[40px] soft-shadow border border-[#5a4838]/5 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#5a4838]/5">
              <th className="p-8 font-outfit text-[9px] font-black tracking-[0.3em] text-[#5a4838]/60 uppercase">Object</th>
              <th className="p-8 font-outfit text-[9px] font-black tracking-[0.3em] text-[#5a4838]/60 uppercase">ID</th>
              <th className="p-8 font-outfit text-[9px] font-black tracking-[0.3em] text-[#5a4838]/60 uppercase">Price</th>
              <th className="p-8 font-outfit text-[9px] font-black tracking-[0.3em] text-[#5a4838]/60 uppercase">Status</th>
              <th className="p-8 font-outfit text-[9px] font-black tracking-[0.3em] text-[#5a4838]/60 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((product) => (
              <tr key={product.id} className="border-b border-[#5a4838]/5 hover:bg-[#5a4838]/[0.02] transition-colors">
                <td className="p-8 flex items-center gap-6">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-[#5a4838]/5 border border-[#5a4838]/10">
                    <Image src={product.thumb} alt={product.name} fill className="object-cover" />
                  </div>
                  <span className="font-outfit text-sm font-bold text-[#5a4838]">{product.name}</span>
                </td>
                <td className="p-8">
                  <span className="font-outfit text-[10px] font-black text-[#5a4838]/40 uppercase tracking-widest">#{product.id}</span>
                </td>
                <td className="p-8">
                  <span className="font-outfit text-xs font-bold text-[#5a4838]">{product.price}</span>
                </td>
                <td className="p-8">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    <span className="font-outfit text-[9px] font-black text-[#5a4838] uppercase tracking-widest">Active</span>
                  </div>
                </td>
                <td className="p-8 text-right">
                  <div className="flex justify-end gap-4">
                    <button className="font-outfit text-[9px] font-black text-[#5a4838]/40 uppercase hover:text-[#5a4838] tracking-widest">Edit</button>
                    <button className="font-outfit text-[9px] font-black text-[#FD2F79] uppercase hover:text-red-700 tracking-widest">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
