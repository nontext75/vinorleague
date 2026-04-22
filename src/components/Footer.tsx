import Link from "next/link";
import { EXTERNAL_LINKS } from "@/lib/links";

const NAV_LINKS = [
  {
    href: "/about",
    label: "Our Story",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    href: "/characters",
    label: "Characters",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    href: "/gallery",
    label: "Gallery",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
      </svg>
    ),
  },
  {
    href: "/wallpapers",
    label: "Download",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
  },
  {
    href: "/commission",
    label: "Commission",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    href: "/contact",
    label: "Contact",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#5a4838] text-white font-sans">
      <div className="max-w-[1400px] mx-auto px-8 pt-16 pb-12">

        {/* Nav Links */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-12">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 font-outfit text-[16px] font-medium tracking-normal text-white/40 hover:text-[#FD2F79] transition-all"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex gap-8">
            <a
              href={EXTERNAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-outfit text-[16px] font-medium tracking-normal text-white/30 hover:text-[#FD2F79] transition-all"
            >
              Instagram
            </a>
            <a
              href={EXTERNAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="font-outfit text-[16px] font-medium tracking-normal text-white/30 hover:text-[#FD2F79] transition-all"
            >
              Twitter
            </a>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
            <p className="font-outfit text-[12px] font-medium tracking-normal text-white/20">
              by <a href="https://vinus.co.kr" target="_blank" rel="noopener noreferrer" className="hover:text-[#FD2F79] transition-all">Vinuspread</a>
            </p>
            <p className="font-outfit text-[12px] font-medium tracking-normal text-white/20">
              © 2026 Vinorleague. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
