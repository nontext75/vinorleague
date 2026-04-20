export default function AboutPage() {
 return (
 <div className="min-h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ebd8c5] via-[#d3bca8] to-[#ab927e] relative">
 <div className="container mx-auto px-4 pt-28 pb-16 max-w-3xl text-center relative z-10 text-[#5a4838]">
 <h1 className="text-4xl font-black mb-8 text-[#FD2F79] tracking-widest uppercase">About Us</h1>
 
 <div className="mb-12">
 <h2 className="text-2xl font-bold mb-4 ">Wani Family Story</h2>
 <p className="text-lg leading-relaxed font-medium">
 너무 특별할 것 없지만, 그래서 더욱 소중한 일상 속의 작은 즐거움.<br />
 와니 패밀리는 평범한 매일매일에 귀여운 스파크를 일으키기 위해 탄생했습니다.
 </p>
 </div>

 <div className="bg-white/40 backdrop-blur-md p-10 rounded-3xl border border-white/50 mb-12">
 <h2 className="text-2xl font-bold mb-4 text-[#FD2F79]">Brand Vision</h2>
 <p className="text-lg leading-relaxed font-medium">
 카카오프렌즈처럼 남녀노소 누구에게나 사랑받는 캐릭터 브랜드를 꿈꿉니다.<br />
 스티커 하나, 엽서 한 장에도 정성을 담아 당신의 책상 위를 환하게 밝혀줄게요.
 </p>
 </div>

 <div>
 <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2 ">
 <span>✉️</span> Contact Us
 </h2>
 <p className="text-lg font-bold">hello@wanifamily.com</p>
 <div className="mt-6 flex justify-center gap-4">
 <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle bg-[#FD2F79] hover:bg-pink-600 text-white border-none flex items-center justify-center font-bold">IG</a>
 <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle bg-[#FD2F79] hover:bg-pink-600 text-white border-none flex items-center justify-center font-bold">TW</a>
 <a href="https://github.com/nontext75/vinorleague" target="_blank" rel="noopener noreferrer" className="btn btn-circle bg-[#FD2F79] hover:bg-pink-600 text-white border-none flex items-center justify-center font-bold">GH</a>
 </div>
 </div>
 </div>
 </div>
 );
}
