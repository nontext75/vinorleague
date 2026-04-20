// src/app/characters/page.tsx
import Image from "next/image";

export default function CharactersPage() {
  const family = [
    {
      id: 'Main',
      name: '바이너 (Vinor)',
      engName: 'Vinor',
      role: 'Leader',
      desc: '밝고 친근한 성격의 파란 토끼. 늘 긍정적인 에너지로 주변을 즐겁게 만들지만 가끔 엉뚱한 행동을 하기도 합니다. 바이너리그의 중심이자 모두의 친구입니다.',
      tags: ['Optimistic', 'Clumsy', 'Kind'],
      img: '/thumb3.png',
      rotate: '-2deg'
    },
    {
      id: 'Sub',
      name: '핍 (PIP)',
      engName: 'Pip',
      role: 'Supporter',
      desc: '노란 병아리. 항상 투덜거리는 괴팍한 성격을 지녔으나 은근 정이 많아 바이너를 가장 잘 챙겨줍니다. 츤데레 매력이 가득한 바이너의 단짝입니다.',
      tags: ['Grumpy', 'Warm-hearted', 'Protective'],
      img: '/thumb1.png',
      rotate: '3deg'
    },
    {
      id: 'Sub',
      name: '팝 (POP)',
      engName: 'Pop',
      role: 'Trouble Maker',
      desc: '아주 작은 사이즈의 민트 개구리. 가만히 있지 못하고 늘 어딘가로 튀어나가는 습성이 있어 요주의 인물입니다. 예측 불가한 행동으로 모두를 놀래키곤 하죠.',
      tags: ['Energetic', 'Tiny', 'Fast'],
      img: '/thumb2.png',
      rotate: '-4deg'
    }
  ];

  return (
    <div className="min-h-screen bg-mesh relative font-sans selection:bg-[#FD2F79]/10 selection:text-[#FD2F79]">
      <div className="container mx-auto px-8 pt-40 pb-24 relative z-10 text-[#5a4838]">
        {/* Editorial Header */}
        <div className="flex flex-col items-center text-center mb-32">
          <h4 className="font-outfit text-[10px] font-black tracking-[0.6em] text-[#FD2F79] mb-4 uppercase">The Family</h4>
          <h1 className="font-outfit font-black text-6xl md:text-8xl leading-none tracking-tighter uppercase text-[#5a4838]">Meet the<br/>Characters</h1>
          <p className="mt-8 font-outfit text-sm opacity-60 tracking-widest uppercase">Scroll to see the chemistry</p>
        </div>

        {/* Dynamic Character Scenes */}
        <div className="flex flex-col gap-40 max-w-6xl mx-auto">
          {family.map((char, idx) => (
            <div key={char.engName} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-32`}>
              {/* Character Card (Sticker Style) */}
              <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center">
                <div 
                  className="relative w-full h-full sticker-card bg-white p-8 soft-shadow transition-transform duration-1000 group-hover:scale-105"
                  style={{ transform: `rotate(${char.rotate})` }}
                >
                  <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-[#5a4838]/5">
                    <Image 
                      src={char.img} 
                      alt={char.name} 
                      fill 
                      className="object-contain p-8 transition-transform duration-1000 hover:scale-110" 
                    />
                  </div>
                  {/* Floating ID Tag */}
                  <div className="absolute -top-6 -right-6">
                    <div className="bg-[#FD2F79] text-white font-outfit text-[10px] font-black px-6 py-3 rounded-full shadow-lg uppercase tracking-widest">{char.id}</div>
                  </div>
                </div>
              </div>

              {/* Character Info */}
              <div className={`flex flex-col ${idx % 2 === 0 ? 'items-start text-left' : 'items-end text-right'} flex-1`}>
                <span className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#FD2F79] uppercase mb-4">{char.role}</span>
                <h2 className="font-outfit font-black text-5xl md:text-7xl leading-none tracking-tighter uppercase text-[#5a4838] mb-8">
                  {char.engName}<br/>
                  <span className="text-3xl md:text-4xl opacity-40 font-bold">{char.name}</span>
                </h2>
                <p className="text-sm md:text-base leading-relaxed opacity-70 mb-12 max-w-md">
                  {char.desc}
                </p>
                <div className={`flex flex-wrap gap-3 ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {char.tags.map(tag => (
                    <span key={tag} className="font-outfit text-[9px] font-black tracking-[0.2em] border border-[#5a4838]/10 px-6 py-2 rounded-full uppercase text-[#5a4838]/50">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-60 border-t border-[#5a4838]/5 pt-24 text-center">
          <h3 className="font-outfit font-black text-xl uppercase tracking-[0.4em] text-[#5a4838]/20">New Stories Coming Soon</h3>
          <p className="mt-4 font-outfit text-[10px] font-black tracking-[0.2em] text-[#FD2F79]/40 uppercase">Season 02 Archive Prep</p>
        </div>
      </div>
    </div>
  );
}
