// src/app/contact/page.tsx
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-mesh relative font-sans selection:bg-[#FD2F79]/10 selection:text-[#FD2F79]">
      <div className="container mx-auto px-8 pt-40 pb-24 relative z-10 text-[#5a4838]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Header & Info */}
          <div>
            <h4 className="font-outfit text-[10px] font-black tracking-[0.6em] text-[#FD2F79] mb-4 uppercase">Direct Line</h4>
            <h1 className="font-outfit font-black text-6xl md:text-9xl leading-[0.85] tracking-tighter uppercase text-[#5a4838] mb-12">
              Let&apos;s<br/>Talk.
            </h1>
            <p className="font-outfit text-sm md:text-base leading-relaxed opacity-70 max-w-md text-[#5a4838] mb-16">
              바이너리그에 대한 궁금증이나 제안, 협업 문의가 있으신가요? 
              우리는 언제나 새로운 이야기를 기다리고 있습니다. 아래 폼을 통해 메시지를 남겨주시거나 직접 이메일로 연락주세요.
            </p>

            <div className="flex flex-col gap-8">
              <div>
                <p className="font-outfit text-[9px] font-black tracking-[0.4em] text-[#5a4838]/40 uppercase mb-2">Email</p>
                <a href="mailto:hello@vinorleague.com" className="font-outfit text-lg md:text-xl font-black text-[#FD2F79] hover:underline underline-offset-8 decoration-2">hello@vinorleague.com</a>
              </div>
              <div>
                <p className="font-outfit text-[9px] font-black tracking-[0.4em] text-[#5a4838]/40 uppercase mb-2">Location</p>
                <p className="font-outfit text-sm font-bold opacity-60">Seoul, South Korea</p>
              </div>
            </div>
          </div>

          {/* Contact Form - Minimalist & Styled */}
          <div className="relative">
             <div className="sticker-card bg-white/40 backdrop-blur-xl p-12 soft-shadow rotate-[1deg]">
                <form className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="font-outfit text-[10px] font-black tracking-[0.2em] uppercase opacity-40 px-2">Your Name</label>
                    <input type="text" placeholder="Vinor Lover" className="bg-transparent border-b border-[#5a4838]/10 py-3 px-2 font-outfit font-bold outline-none focus:border-[#FD2F79] transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-outfit text-[10px] font-black tracking-[0.2em] uppercase opacity-40 px-2">Email Address</label>
                    <input type="email" placeholder="hello@example.com" className="bg-transparent border-b border-[#5a4838]/10 py-3 px-2 font-outfit font-bold outline-none focus:border-[#FD2F79] transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-outfit text-[10px] font-black tracking-[0.2em] uppercase opacity-40 px-2">Message</label>
                    <textarea rows={4} placeholder="I love your archive!" className="bg-transparent border-b border-[#5a4838]/10 py-3 px-2 font-outfit font-bold outline-none focus:border-[#FD2F79] transition-colors resize-none"></textarea>
                  </div>
                  <button className="mt-8 bg-[#5a4838] text-white font-outfit font-black text-[10px] tracking-[0.6em] uppercase py-6 rounded-full hover:bg-[#FD2F79] transition-all transform active:scale-95 shadow-lg">
                    Send Message
                  </button>
                </form>
             </div>

             {/* Small Decoration Sticker */}
             <div className="absolute -bottom-10 -right-10 w-32 h-32 rotate-[-5deg] anthology-card soft-shadow overflow-hidden bg-white z-20">
                <Image src="/thumb2.png" alt="Vinor Sticker" fill className="object-contain p-4" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
