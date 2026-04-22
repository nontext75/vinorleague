"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const SLIDES = [
  {
    index: "01",
    name: "와썹",
    sub: "와니 + 서비",
    tag: "일상 · 귀여움",
    copy: "오늘도 편의점.",
    desc: "편의점 삼각김밥과 함께하는 소소하고 확실한 행복.",
    bg: "#FD2F79",
    textColor: "text-white",
    img: "/hero-wassup.png",
  },
  {
    index: "02",
    name: "오대리",
    sub: "오덕상사 오대리",
    tag: "직장인 공감",
    copy: "이번 주도 살아남았다.",
    desc: "월요병, 야근, 퇴근 후 치맥. 공감 100%.",
    bg: "#5a4838",
    textColor: "text-white",
    img: "/hero-odaeri.png",
  },
  {
    index: "03",
    name: "깍두기파",
    sub: "패밀리 군단",
    tag: "의리 · 따뜻함",
    copy: "우리가 남이가.",
    desc: "언제나 함께하는 따뜻한 우리. 끈끈한 패밀리.",
    bg: "#1a2e1a",
    textColor: "text-white",
    img: "/scene1.jpg",
  },
];

const COLLAGE = [
  { src: "/thumb1.jpg", w: 260, h: 260, top: "5%",  left: "8%",  rotate: -6 },
  { src: "/thumb2.jpg", w: 200, h: 200, top: "0%",  left: "36%", rotate: 3 },
  { src: "/thumb3.jpg", w: 240, h: 300, top: "18%", left: "58%", rotate: -4 },
  { src: "/thumb4.jpg", w: 220, h: 220, top: "38%", left: "12%", rotate: 5 },
  { src: "/thumb6.jpg", w: 280, h: 200, top: "28%", left: "40%", rotate: -2 },
  { src: "/thumb7.jpg", w: 200, h: 180, top: "52%", left: "65%", rotate: 7 },
  { src: "/thumb5.png", w: 160, h: 200, top: "55%", left: "28%", rotate: -8, png: true },
  { src: "/thumb8.png", w: 200, h: 240, top: "42%", left: "80%", rotate: 4,  png: true },
];

const FAQ_ITEMS = [
  { q: "이모티콘은 어디서 받나요?", a: "카카오 이모티콘샵에 출시 예정입니다. 이메일 알림을 신청하시면 가장 먼저 알려드려요!" },
  { q: "굿즈는 어떻게 구매하나요?", a: "네이버 스마트스토어에 오픈 예정입니다. 출시 즉시 이메일로 안내드립니다." },
  { q: "캐릭터 제작의뢰는 어떻게 하나요?", a: "제작의뢰 페이지에서 의뢰서를 작성해 주시면 영업일 2~3일 내에 연락드립니다." },
  { q: "납기는 얼마나 걸리나요?", a: "캐릭터 디자인 2~4주, 이모티콘 3~6주, 굿즈 제작 4~8주. 상담 후 정확히 안내드려요." },
];

export default function TeaserPage() {
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const next = useCallback(() => setCurrent((p) => (p + 1) % SLIDES.length), []);
  const prev = () => setCurrent((p) => (p - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const slide = SLIDES[current];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="font-sans overflow-x-hidden selection:bg-[#FD2F79]/20">

      {/* ── HERO CAROUSEL ── */}
      <section
        className="relative w-full h-screen overflow-hidden transition-colors duration-700"
        style={{ backgroundColor: slide.bg }}
      >
        {/* Minimal Nav */}
        <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 md:px-14 py-5">
          <Link href="/" className="transition-all hover:scale-105 active:scale-95 block">
            <svg width="76" height="51" viewBox="0 0 168 113" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "brightness(0) invert(1)" }}>
              <path d="M27.2469 16.2853C27.2469 17.7512 26.2432 18.7678 24.6525 18.9475C23.0619 19.1272 22.0229 18.3297 22.0229 16.8638V13.6456L23.3319 13.4996V16.7178C23.3319 17.5153 23.8777 17.9366 24.6525 17.8523C25.4273 17.7681 25.9438 17.2289 25.9438 16.4257V13.2076L27.2528 13.0615V16.2797L27.2469 16.2853Z" fill="white"/>
              <path d="M32.4709 18.0266L29.6653 14.7803V18.3355L28.415 18.4759V12.9381L29.6066 12.8089L32.4181 16.0608V12.5L33.6566 12.3652V17.903L32.4651 18.0322L32.4709 18.0266Z" fill="white"/>
              <path d="M37.3895 11.9446C39.1856 11.748 40.43 12.7421 40.43 14.3765C40.43 16.0109 39.1622 17.2858 37.3367 17.488L34.9302 17.7519V12.2142L37.3837 11.9446H37.3895ZM36.245 16.5613L37.4248 16.4321C38.3932 16.3254 39.1035 15.5503 39.1035 14.5394C39.1035 13.5284 38.358 12.8938 37.3661 13.0061L36.2391 13.1296V16.5669L36.245 16.5613Z" fill="white"/>
              <path d="M42.6077 12.4051V13.607L45.4017 13.2981V14.3371L42.6077 14.646V15.8704L45.8008 15.5166V16.5556L41.3047 17.0498V11.5121L45.7128 11.0234V12.0569L42.6136 12.3995L42.6077 12.4051Z" fill="white"/>
              <path d="M49.4636 14.5675L49.3403 14.5787L48.1312 14.7135V16.2973L46.8223 16.4434V10.9056L49.3345 10.6304C50.8488 10.4619 51.7058 11.0629 51.7058 12.2929C51.7058 13.1465 51.3243 13.8093 50.6199 14.2024L51.8525 15.893L50.3734 16.0558L49.4577 14.5731L49.4636 14.5675ZM49.3403 13.5397C50.0623 13.4611 50.4732 13.096 50.4732 12.467C50.4732 11.8379 50.0623 11.5852 49.3403 11.6638L48.1312 11.7986V13.6745L49.3403 13.5397Z" fill="white"/>
              <path d="M57.8337 12.433V14.5617C57.2232 15.0559 56.2841 15.4547 55.4858 15.5389C53.7308 15.7299 52.4043 14.6628 52.4043 13.0565C52.4043 11.4502 53.7602 10.0966 55.5622 9.90006C56.425 9.80458 57.2996 10.0236 57.8865 10.4505L57.1528 11.4277C56.7243 11.0963 56.1256 10.9222 55.5622 10.984C54.535 11.0963 53.7426 11.9388 53.7426 12.9104C53.7426 13.8821 54.5467 14.556 55.568 14.4437C55.9143 14.4044 56.3311 14.2415 56.7008 14.0169V12.5622L57.8337 12.4387V12.433Z" fill="white"/>
              <path d="M61.6135 13.2247L61.4902 13.2359L60.2811 13.3707V14.9546L58.9722 15.1006V9.56283L61.4844 9.28762C62.9987 9.11913 63.8557 9.72009 63.8557 10.9501C63.8557 11.8038 63.4742 12.4665 62.7757 12.8597L64.0083 14.5502L62.5292 14.7131L61.6076 13.2303L61.6135 13.2247ZM61.4902 12.1969C62.2122 12.1183 62.6231 11.7532 62.6231 11.1242C62.6231 10.4952 62.2122 10.2424 61.4902 10.321L60.2811 10.4558V12.3317L61.4902 12.1969Z" fill="white"/>
              <path d="M70.7701 11.029C70.7701 12.6296 69.4319 14 67.6592 14.1966C65.8866 14.3932 64.5483 13.3205 64.5483 11.7142C64.5483 10.1079 65.8866 8.75433 67.6592 8.56337C69.4319 8.37241 70.7701 9.42268 70.7701 11.029ZM65.8925 11.5681C65.8925 12.5398 66.7142 13.2081 67.6768 13.1014C68.6453 12.9947 69.4319 12.1466 69.4319 11.175C69.4319 10.2034 68.6453 9.54624 67.6768 9.65295C66.7025 9.75966 65.8925 10.5965 65.8925 11.5681Z" fill="white"/>
              <path d="M76.7513 10.8205C76.7513 12.2864 75.7476 13.3029 74.1569 13.4827C72.5663 13.6624 71.5273 12.8649 71.5273 11.399V8.18078L72.8363 8.03476V11.2529C72.8363 12.0505 73.3821 12.4717 74.1569 12.3875C74.9317 12.3032 75.4482 11.764 75.4482 10.9609V7.7427L76.7572 7.59668V10.8149L76.7513 10.8205Z" fill="white"/>
              <path d="M81.9753 12.5617L79.1697 9.31544V12.8706L77.9194 13.011V7.47327L79.111 7.34409L81.9225 10.596V7.03519L83.161 6.90039V12.4382L81.9695 12.5673L81.9753 12.5617Z" fill="white"/>
              <path d="M86.8998 6.47974C88.6959 6.28316 89.9403 7.27727 89.9403 8.91164C89.9403 10.546 88.6724 11.8209 86.847 12.0231L84.4404 12.2871V6.74933L86.8939 6.47974H86.8998ZM85.7494 11.0908L86.9291 10.9616C87.8976 10.8549 88.6078 10.0798 88.6078 9.06889C88.6078 8.05794 87.8624 7.42329 86.8704 7.53562L85.7435 7.65918V11.0964L85.7494 11.0908Z" fill="white"/>
              <path d="M94.4366 11.1855L92.1592 5.90052L93.5679 5.74326L95.1468 9.74775L96.7375 5.39505L98.0875 5.24902L95.7866 11.0395L94.4366 11.1855Z" fill="white"/>
              <path d="M98.7212 10.7082V5.17045L100.03 5.02441V10.5622L98.7212 10.7082Z" fill="white"/>
              <path d="M105.63 4.95723L105.125 6.04681C104.515 5.76599 103.787 5.62558 103.323 5.67613C102.883 5.72668 102.589 5.9064 102.589 6.20968C102.589 7.23187 105.677 6.32201 105.665 8.31583C105.665 9.39979 104.679 10.0962 103.399 10.2366C102.449 10.3433 101.498 10.0962 100.846 9.6413L101.369 8.56295C101.961 9.00103 102.807 9.23692 103.417 9.16953C103.957 9.10774 104.28 8.88309 104.28 8.54611C104.28 7.50146 101.192 8.45062 101.192 6.4905C101.192 5.48517 102.096 4.75504 103.435 4.60339C104.245 4.51353 105.055 4.65956 105.636 4.96284L105.63 4.95723Z" fill="white"/>
              <path d="M106.581 9.84394V4.30618L107.889 4.16016V9.69792L106.581 9.84394Z" fill="white"/>
              <path d="M114.974 6.14811C114.974 7.74878 113.636 9.11918 111.863 9.31575C110.091 9.51233 108.752 8.4396 108.752 6.83331C108.752 5.22702 110.091 3.87347 111.863 3.68251C113.636 3.49155 114.974 4.54182 114.974 6.14811ZM110.097 6.68729C110.097 7.65892 110.918 8.32727 111.881 8.22056C112.849 8.11385 113.636 7.26578 113.636 6.29414C113.636 5.3225 112.849 4.66538 111.881 4.77209C110.907 4.87881 110.097 5.71565 110.097 6.68729Z" fill="white"/>
              <path d="M119.887 8.37226L117.081 5.12599V8.68117L115.831 8.82158V3.28381L117.023 3.15463L119.834 6.40653V2.84573L121.073 2.71094V8.2487L119.881 8.37788L119.887 8.37226Z" fill="white"/>
              <path d="M123.497 6.90062L123.045 8.02952L121.695 8.18116L124.207 2.36258L125.557 2.21094L128.028 7.47911L126.631 7.63075L126.179 6.60295L123.497 6.90062ZM124.847 3.59257L123.931 5.84474L125.757 5.64255L124.847 3.59257Z" fill="white"/>
              <path d="M131.274 5.53039L131.151 5.54161L129.942 5.67641V7.26023L128.633 7.40626V1.8685L131.145 1.59329C132.659 1.4248 133.516 2.02575 133.516 3.25574C133.516 4.10944 133.135 4.77217 132.43 5.16532L133.663 6.85586L132.184 7.01873L131.268 5.536L131.274 5.53039ZM131.151 4.50259C131.873 4.42396 132.284 4.05889 132.284 3.42985C132.284 2.80082 131.873 2.54807 131.151 2.6267L129.942 2.7615V4.63737L131.151 4.50259Z" fill="white"/>
              <path d="M134.625 6.74336V1.20559L135.934 1.05957V6.59733L134.625 6.74336Z" fill="white"/>
              <path d="M138.523 1.81229V3.0142L141.317 2.7053V3.74433L138.523 4.05324V5.27761L141.716 4.92378V5.96281L137.22 6.45705V0.919288L141.628 0.430664V1.46408L138.529 1.80668L138.523 1.81229Z" fill="white"/>
              <path d="M147.057 0.380073L146.552 1.46965C145.942 1.18884 145.214 1.04843 144.75 1.09898C144.31 1.14953 144.017 1.32925 144.017 1.63253C144.017 2.65472 147.098 1.74486 147.092 3.73868C147.092 4.82265 146.106 5.51908 144.827 5.65949C143.876 5.7662 142.925 5.51908 142.273 5.06415L142.796 3.98581C143.389 4.42388 144.234 4.65976 144.844 4.59237C145.378 4.53059 145.707 4.30593 145.707 3.96895C145.707 2.9243 142.62 3.87348 142.62 1.91335C142.62 0.90802 143.524 0.177889 144.862 0.026246C145.672 -0.0636163 146.482 0.0824096 147.063 0.385695L147.057 0.380073Z" fill="white"/>
              <path d="M119.247 90.4722L111.576 83.9965V56.7233L123.608 55.3922V78.4475L126.367 78.1442V55.0889L138.4 53.7578V88.3548L119.247 90.4722Z" fill="white"/>
              <path d="M0 95.6056V69.0401L13.6762 67.5293V89.5455L20.0506 88.8435V101.419L8.41115 102.705L0 95.6V95.6056Z" fill="white"/>
              <path d="M128.85 49.4114V14.8144L138.153 13.7866L140.847 16.6903L147.092 12.8037V24.9744L140.882 29.7484V48.0859L128.85 49.417V49.4114Z" fill="white"/>
              <path d="M52.1282 49.8378V23.2891L38.4579 24.7999V44.2045L35.6933 44.5078V25.1032L22.0229 26.614V53.1795L30.4341 60.2786L43.7346 58.8127L52.1282 49.8378Z" fill="white"/>
              <path d="M55.7143 22.8909L54.8926 22.9864V23.7727V56.797V57.5833L55.7143 57.4879L66.0977 56.3421L66.9194 56.2522V55.466V22.4416V21.6553L66.0977 21.7451L55.7143 22.8909Z" fill="white"/>
              <path d="M96.4789 26.4231L88.0678 19.3184L75.6711 20.6888L70.4765 21.2616L69.6548 21.3515V55.9485L70.4765 55.8586L75.6711 55.2857L80.8657 54.7129L81.6875 54.623V53.8423V31.5733L83.0669 31.4217L84.4403 31.27V53.5391C84.4403 53.5391 84.4462 53.5671 84.4462 53.584V54.3253L85.2621 54.2355L90.4567 53.6626H90.4626L95.6513 53.0897L96.473 52.9999V26.4343L96.4789 26.4231Z" fill="white"/>
              <path d="M126.073 23.1545L117.656 16.0498L107.666 17.1506L99.249 26.1144V44.6429L107.66 51.7476L117.674 50.6412L126.067 41.6662V23.1489L126.073 23.1545ZM114.046 28.243V40.571L112.667 40.7226H112.602L111.288 40.8743V27.2264L112.567 27.086L112.667 27.0748L114.046 26.9231V28.243Z" fill="white"/>
              <path d="M100.564 105.653L108.805 96.8805V57.0322L89.6408 59.1496L81.9868 67.3215V87.2653L89.6232 93.7466L94.5889 93.1962L96.7782 92.9547V93.5837L94.0841 96.4649L91.1904 99.5652L100.57 105.659L100.564 105.653ZM96.7724 81.1602V82.4801L95.4576 82.6261L95.3284 82.643L94.0137 82.789V69.1412L95.393 68.9895L96.7724 68.8379V81.1659V81.1602Z" fill="white"/>
              <path d="M167.994 68.1026V58.5266L159.583 51.4219L149.587 52.5283L141.176 61.4921V82.1323L154.588 86.5749L167.994 77.9369L153.666 74.2525V73.0562L168 68.1026H167.994ZM153.22 66.9231V58.302L155.979 57.9987V66.6198L153.22 66.9231Z" fill="white"/>
              <path d="M49.6156 81.1719V71.5959L41.2045 64.4912L31.2085 65.5976L22.7974 74.5614V95.2016L36.2094 99.6442L49.6215 91.0062L35.2938 87.3218V86.1256L49.6274 81.1719H49.6156ZM34.8418 79.9981V71.3769L37.6005 71.0736V79.6948L34.8418 79.9981Z" fill="white"/>
              <path d="M60.7974 62.3293L52.3862 71.293V89.8215L60.7974 96.9263L64.9648 96.4657L65.5283 95.8704L67.1718 94.1181L69.3788 95.9827L79.1986 94.8987V60.3018L60.7915 62.3349L60.7974 62.3293ZM67.1776 84.4298V85.7496L65.8629 85.8956L65.7337 85.9125L64.4189 86.0585V72.4107L65.7983 72.259L67.1776 72.1074V84.4354V84.4298Z" fill="white"/>
              <path d="M86.0544 103.497L0 113V109.63L86.0544 100.127V103.497Z" fill="white"/>
              <path d="M167.994 94.4489L114.046 100.408V97.0381L167.994 91.0791V94.4489Z" fill="white"/>
            </svg>
          </Link>
          <div className="flex items-center gap-4">
            <span className="font-outfit text-[10px] font-black tracking-[0.3em] text-white/40 uppercase hidden md:block">Coming Soon 2026</span>
            <Link href="/commission" className="font-outfit text-[10px] font-black tracking-[0.4em] bg-white/15 border border-white/20 text-white uppercase px-5 py-2.5 rounded-full hover:bg-white hover:text-[#FD2F79] transition-all">
              제작의뢰
            </Link>
          </div>
        </nav>

        {/* Full-screen character image */}
        <div className="absolute inset-0 pointer-events-none">
          {SLIDES.map((s, i) => (
            <div
              key={s.index}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === current ? 1 : 0 }}
            >
              <Image src={s.img} alt={s.name} fill priority={i === 0} className="object-cover object-center" />
            </div>
          ))}
          {/* Dim overlay */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Text Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 px-8 md:px-14 max-w-[680px]">
          <p className="font-outfit italic font-black text-white/30 mb-[-8px]" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>meet</p>
          <h1
            className="font-outfit font-black text-white leading-[0.82] tracking-tighter uppercase mb-6"
            style={{ fontSize: "clamp(80px, 14vw, 180px)" }}
          >
            {slide.name}
          </h1>
          <p className="font-outfit font-black text-white/50 text-xs tracking-[0.4em] uppercase mb-3">{slide.sub} · {slide.tag}</p>
          <p className="font-outfit font-black text-white/90 mb-2" style={{ fontSize: "clamp(18px, 2.5vw, 28px)" }}>"{slide.copy}"</p>
          <p className="font-outfit text-sm text-white/50 mb-10 max-w-xs leading-relaxed">{slide.desc}</p>

          {/* Email CTA */}
          {submitted ? (
            <p className="font-outfit font-black text-xl text-white/80">달려올게요! ✦</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full max-w-sm rounded-full bg-white/10 border border-white/20 p-1.5 backdrop-blur-sm">
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="오픈 알림 받기 — 이메일 입력"
                className="flex-1 bg-transparent border-none outline-none font-outfit text-sm text-white placeholder:text-white/30 px-4"
              />
              <button type="submit" className="shrink-0 font-outfit text-[9px] font-black tracking-[0.3em] bg-white text-[#5a4838] uppercase px-5 py-3 rounded-full hover:bg-[#FD2F79] hover:text-white transition-all">
                →
              </button>
            </form>
          )}
        </div>

        {/* Slide counter + arrows — right edge */}
        <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-6">
          <button onClick={prev} className="text-white/30 hover:text-white transition-all text-xl">↑</button>
          <div className="flex flex-col items-center gap-1">
            <span className="font-outfit font-black text-2xl text-white">{slide.index}</span>
            <div className="w-px h-8 bg-white/20" />
            <span className="font-outfit font-black text-sm text-white/30">0{SLIDES.length}</span>
          </div>
          <button onClick={next} className="text-white/30 hover:text-white transition-all text-xl">↓</button>
        </div>

        {/* Dot indicators — bottom center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${i === current ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/30"}`}
            />
          ))}
        </div>
      </section>

      {/* ── COLLAGE SECTION ── */}
      <section className="relative bg-[#f5ede3] overflow-hidden" style={{ minHeight: "800px" }}>
        {/* Sticker collage */}
        <div className="relative w-full" style={{ height: "680px" }}>
          {COLLAGE.map((img, i) => (
            <div
              key={i}
              className="absolute overflow-hidden rounded-2xl shadow-xl border-4 border-white hover:z-20 hover:scale-105 transition-transform duration-300 cursor-default"
              style={{
                width: img.w,
                height: img.h,
                top: img.top,
                left: img.left,
                transform: `rotate(${img.rotate}deg)`,
                zIndex: i + 1,
              }}
            >
              <Image
                src={img.src} alt="" fill
                className="object-cover"
                unoptimized={!!img.png}
              />
            </div>
          ))}
        </div>

        {/* Big copy below collage */}
        <div className="relative z-10 text-center py-16 px-8">
          <p className="font-outfit font-black text-[#5a4838]/30 text-sm tracking-[0.5em] uppercase mb-4">2026 · Coming Soon</p>
          <h2
            className="font-outfit font-black text-[#5a4838] tracking-tighter leading-[0.82] uppercase"
            style={{ fontSize: "clamp(72px, 14vw, 180px)" }}
          >
            굿즈 · 이모티콘<br/>
            <span className="text-[#FD2F79]">출시 예정!</span>
          </h2>
          <div className="flex flex-wrap gap-6 justify-center mt-12">
            <span className="font-outfit font-black text-sm text-[#03C75A] bg-[#03C75A]/10 px-6 py-3 rounded-full">네이버 스마트스토어 오픈 예정</span>
            <span className="font-outfit font-black text-sm text-[#5a4838] bg-[#FAE100]/40 px-6 py-3 rounded-full">카카오 이모티콘샵 출시 예정</span>
            <Link href="/commission" className="font-outfit font-black text-sm text-white bg-[#FD2F79] px-6 py-3 rounded-full hover:bg-[#5a4838] transition-all">
              제작의뢰 바로가기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 px-8 bg-white border-t border-[#5a4838]/5">
        <div className="max-w-[900px] mx-auto">
          <div className="mb-16">
            <p className="font-outfit font-black text-[10px] tracking-[0.5em] text-[#FD2F79] uppercase mb-4">FAQ</p>
            <h2
              className="font-outfit font-black text-[#5a4838] tracking-tighter uppercase leading-[0.85]"
              style={{ fontSize: "clamp(52px, 8vw, 100px)" }}
            >
              자주 묻는<br/>질문.
            </h2>
          </div>
          <div className="flex flex-col divide-y divide-[#5a4838]/10">
            {FAQ_ITEMS.map((item, i) => (
              <details key={i} className="group py-7">
                <summary className="flex items-center justify-between cursor-pointer list-none gap-6">
                  <span className="font-outfit font-black text-xl text-[#5a4838] group-open:text-[#FD2F79] transition-colors leading-tight">{item.q}</span>
                  <span className="shrink-0 w-10 h-10 rounded-full border-2 border-[#5a4838]/15 flex items-center justify-center text-[#5a4838]/30 group-open:border-[#FD2F79] group-open:text-[#FD2F79] group-open:rotate-45 transition-all text-2xl font-light leading-none">+</span>
                </summary>
                <p className="font-outfit text-sm text-[#5a4838]/60 leading-relaxed mt-5 pr-16">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-20 bg-[#FD2F79] rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-outfit font-black text-white tracking-tighter leading-tight" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
                캐릭터가 필요하신가요?
              </h3>
              <p className="font-outfit text-sm text-white/60 mt-2">지금 바로 제작의뢰를 접수해보세요.</p>
            </div>
            <Link href="/commission" className="shrink-0 font-outfit text-[10px] font-black tracking-[0.4em] bg-white text-[#FD2F79] uppercase px-10 py-5 rounded-full hover:bg-[#5a4838] hover:text-white transition-all">
              제작의뢰 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── EMAIL + FOOTER ── */}
      <section className="py-28 px-8 bg-[#5a4838]">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="font-outfit font-black text-[10px] tracking-[0.5em] text-[#FD2F79] uppercase mb-6">Stay Updated</p>
          <h2
            className="font-outfit font-black text-white tracking-tighter leading-[0.85] mb-6"
            style={{ fontSize: "clamp(52px, 8vw, 100px)" }}
          >
            제일 먼저<br/>알고 싶어?
          </h2>
          <p className="font-outfit text-sm text-white/40 mb-12 leading-relaxed">
            이모티콘 출시, 굿즈 오픈, 새 캐릭터 공개 — 가장 먼저 알려드릴게요.
          </p>

          {submitted ? (
            <div className="mb-12">
              <p className="font-outfit font-black text-4xl text-[#FD2F79] mb-2">달려올게요! ✦</p>
              <p className="font-outfit text-sm text-white/40">오픈 소식을 가장 먼저 전해드릴게요.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full max-w-md mx-auto rounded-full border border-white/10 bg-white/10 p-1.5 mb-12">
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소 입력"
                className="flex-1 bg-transparent border-none outline-none font-outfit text-sm text-white placeholder:text-white/20 px-5"
              />
              <button type="submit" className="shrink-0 font-outfit text-[10px] font-black tracking-[0.3em] bg-[#FD2F79] text-white uppercase px-7 py-4 rounded-full hover:bg-white hover:text-[#FD2F79] transition-all">
                달려올게
              </button>
            </form>
          )}

          <div className="flex gap-10 justify-center">
            {["Instagram", "Kakao", "Naver"].map((sns) => (
              <a key={sns} href="#" className="font-outfit text-[10px] font-black tracking-[0.3em] uppercase text-white/20 hover:text-[#FD2F79] transition-all">{sns}</a>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#3d2e22] px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5">
        <div>
          <p className="font-outfit font-black text-sm text-white/60 tracking-[0.3em] uppercase mb-1">Vinorleague</p>
          <p className="font-outfit text-xs text-white/20">by Vinuspread · vinus@vinus.co.kr</p>
        </div>
        <p className="font-outfit text-xs text-white/15 tracking-[0.2em] uppercase text-center md:text-right">
          우리 캐릭터, 이제 네 거야.<br/>
          © 2026 Vinorleague. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
