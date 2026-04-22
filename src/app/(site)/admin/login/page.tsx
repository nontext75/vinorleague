"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would be a server action or API call checking against an ENV variable
    // For this implementation, we'll simulate the check.
    // THE DEFAULT PASSWORD IS 'vinor123' (User can change this in the future)
    if (password === "vinor123") {
      // Set the session cookie (expires in 1 day)
      document.cookie = "admin_session=true; path=/; max-age=86400";
      router.push("/admin");
    } else {
      setError("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-[40px] soft-shadow p-12 border border-[#5a4838]/5 relative overflow-hidden">
        {/* Abstract Decal */}
        <div className="absolute -top-10 -left-10 font-outfit font-black text-[120px] text-[#5a4838]/5 leading-none pointer-events-none select-none">
          VL
        </div>

        <div className="relative z-10">
          <div className="mb-10 text-center">
            <h4 className="font-outfit text-[10px] font-black tracking-[0.6em] text-[#FD2F79] mb-4 uppercase">Identity Verification</h4>
            <h1 className="font-outfit font-black text-4xl tracking-tighter uppercase text-[#5a4838]">Admin Login</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="font-outfit text-[10px] font-black tracking-[0.4em] uppercase text-[#5a4838]/40 px-1">Console Access Key</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-[#5a4838]/5 border border-[#5a4838]/10 rounded-2xl px-6 py-4 font-outfit text-sm text-[#5a4838] focus:outline-none focus:border-[#FD2F79] transition-all"
                autoFocus
              />
            </div>

            {error && (
              <p className="font-outfit text-[10px] font-bold text-[#FD2F79] tracking-tighter text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#FD2F79] text-white font-outfit text-[11px] font-black tracking-[0.4em] uppercase py-5 rounded-full hover:bg-[#5a4838] transition-all shadow-lg active:scale-95"
            >
              Authorize Access →
            </button>
          </form>

          <p className="mt-10 text-center font-outfit text-[9px] text-[#5a4838]/30 uppercase tracking-widest">
            Vinorleague Internal Console v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
