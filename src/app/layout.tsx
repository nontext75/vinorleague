// src/app/layout.tsx
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Vinorleague",
    default: "바이너리그 공식 사이트 | Vinorleague Official",
  },
  description: "귀여움을 넘어 일상이 되는 당신만의 브랜드 허브, 바이너리그. 다양한 캐릭터 패밀리와 굿즈, 디지털 자산 및 제작의뢰 정보를 확인하세요.",
  keywords: ["바이너리그", "Vinorleague", "캐릭터 디자인", "이모티콘 제작", "굿즈 제작", "캐릭터 브랜드", "Vinuspread", "디자인 시스템"],
  authors: [{ name: "Vinuspread", url: "https://vinus.co.kr" }],
  creator: "바이너리그 Team",
  publisher: "Vinuspread",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "바이너리그 공식 사이트 | Vinorleague Official",
    description: "브랜드 캐릭터, 굿즈, 이모티콘 제작의 모든 것. 바이너리그 허브에서 확인하세요.",
    url: "https://vinorleague.com",
    siteName: "Vinorleague",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vinorleague Brand Hub",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "바이너리그 공식 사이트 | Vinorleague",
    description: "당신의 아이디어를 캐릭터로, 바이너리그.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-theme="cupcake" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans font-medium">
        {children}
      </body>
    </html>
  );
}
