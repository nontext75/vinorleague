import Link from "next/link";
import Image from "next/image";

export default function CharactersPage() {
 return (
 <div className="min-h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ebd8c5] via-[#d3bca8] to-[#ab927e] relative">
 <div className="container mx-auto px-4 pt-28 pb-12 relative z-10 text-[#5a4838]">
 <h1 className="text-4xl font-bold text-center mb-10 text-[#5a4838] tracking-widest uppercase">Characters</h1>
 
 <div role="tablist" className="tabs tabs-boxed bg-white/30 backdrop-blur-md max-w-md mx-auto mb-12 border border-white/40">
 <a role="tab" className="tab tab-active font-bold text-lg bg-white/60 text-[#FD2F79]">Wani Family</a>
 <a role="tab" className="tab opacity-50 cursor-not-allowed font-medium text-[#5a4838]">Family 2 (Soon)</a>
 <a role="tab" className="tab opacity-50 cursor-not-allowed font-medium text-[#5a4838]">Family 3 (Soon)</a>
 </div>

 <section id="wani" className="max-w-4xl mx-auto">
 <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 mb-12 text-center border-2 border-white/50 ">
 <h2 className="text-3xl font-black text-[#FD2F79] mb-4 tracking-wide">Wani Family</h2>
 <p className="text-lg font-medium">파란 토끼 와니와 괴팍한 병아리 핍, 그리고 작고 귀여운 민트 개구리 팝의 유쾌한 일상!</p>
 </div>

 <div className="flex flex-col gap-12">
 {/* Character 1 */}
 <div className="md:flex gap-8 items-center bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/50 transition-transform hover:-translate-y-1">
 <div className="w-48 h-48 bg-white/60 rounded-full shrink-0 flex items-center justify-center mx-auto md:mx-0 mb-4 md:mb-0 relative overflow-hidden border-[6px] border-white/50">
 <Image src="/thumb3.png" alt="Wani Picture" fill className="object-cover scale-110" />
 </div>
 <div>
 <h3 className="text-4xl font-bold mb-4 flex items-center gap-3">
 와니 (Wani) 
 <span className="badge badge-lg bg-[#FD2F79] border-none text-white font-bold">Main</span>
 </h3>
 <p className="mb-4 text-lg font-medium leading-relaxed">
 밝고 친근한 성격의 파란 토끼. 늘 긍정적인 에너지로 주변을 즐겁게 만들지만 가끔 엉뚱한 행동을 하기도 합니다.
 </p>
 <div className="flex gap-2">
 <span className="badge font-semibold bg-white/50 border-white/80">친근함</span>
 <span className="badge font-semibold bg-white/50 border-white/80">엉뚱함</span>
 </div>
 </div>
 </div>

 {/* Character 2 */}
 <div className="md:flex flex-row-reverse gap-8 items-center bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/50 transition-transform hover:-translate-y-1">
 <div className="w-48 h-48 bg-white/60 rounded-full shrink-0 flex items-center justify-center mx-auto md:mx-0 mb-4 md:mb-0 relative overflow-hidden border-[6px] border-white/50">
 <Image src="/thumb1.png" alt="PIP Picture" fill className="object-cover scale-110 pt-2" />
 </div>
 <div className="text-right flex flex-col items-end">
 <h3 className="text-4xl font-bold mb-4 flex flex-row-reverse items-center gap-3">
 핍 (PIP) 
 <span className="badge badge-lg bg-base-100 text-[#5a4838] border-none font-bold">Sub</span>
 </h3>
 <p className="mb-4 text-lg font-medium leading-relaxed max-w-lg">
 노란 병아리. 항상 투덜거리는 괴팍한 성격을 지녔으나 은근 정이 많아 와니를 가장 잘 챙겨줍니다.
 </p>
 <div className="flex gap-2 justify-end">
 <span className="badge font-semibold bg-white/50 border-white/80">투덜이</span>
 <span className="badge font-semibold bg-white/50 border-white/80">츤데레</span>
 </div>
 </div>
 </div>

 {/* Character 3 */}
 <div className="md:flex gap-8 items-center bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/50 transition-transform hover:-translate-y-1">
 <div className="w-48 h-48 bg-white/60 rounded-full shrink-0 flex items-center justify-center mx-auto md:mx-0 mb-4 md:mb-0 relative overflow-hidden border-[6px] border-white/50">
 <Image src="/thumb2.png" alt="POP Picture" fill className="object-cover scale-110 pl-2" />
 </div>
 <div>
 <h3 className="text-4xl font-bold mb-4 flex items-center gap-3">
 팝 (POP) 
 <span className="badge badge-lg bg-base-100 text-[#5a4838] border-none font-bold">Sub</span>
 </h3>
 <p className="mb-4 text-lg font-medium leading-relaxed">
 아주 작은 사이즈의 민트 개구리. 가만히 있지 못하고 늘 어딘가로 튀어나가는 습성이 있어 요주의 인물입니다.
 </p>
 <div className="flex gap-2">
 <span className="badge font-semibold bg-white/50 border-white/80">날쌘돌이</span>
 <span className="badge font-semibold bg-white/50 border-white/80">에너자이저</span>
 </div>
 </div>
 </div>
 </div>
 </section>
 </div>
 </div>
 );
}
