import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
});

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
 title: "Wani Family Shop",
 description: "Official Character Goods Shop for Wani Family",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      data-theme="cupcake"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased`}
    >
 <body className="min-h-full flex flex-col font-sans font-medium">
 <Header />
 <main className="flex-grow">
 {children}
 </main>
 <Footer />
 </body>
 </html>
 );
}
