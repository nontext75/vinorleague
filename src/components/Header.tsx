import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed w-full bg-white/5 backdrop-blur-md top-0 z-50 py-6 transition-all duration-1000 ease-in-out hover:bg-white/20 border-b border-black/5">
      <div className="navbar max-w-5xl mx-auto px-4">
        <div className="navbar-start">
          <div className="hidden lg:flex">
            <ul className="flex gap-10">
              <li>
                <Link href="/shop" className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#5a4838] opacity-40 hover:opacity-100 hover:text-[#FD2F79] uppercase transition-all">
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/about" className="font-outfit text-[10px] font-black tracking-[0.4em] text-[#5a4838] opacity-40 hover:opacity-100 hover:text-[#FD2F79] uppercase transition-all">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Mobile menu */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
          </div>
        </div>
        
        <div className="navbar-center">
          <Link href="/" className="transition-all hover:scale-105 active:scale-95 text-[#FD2F79]">
            <span className="font-outfit font-black tracking-[0.6em] text-xl uppercase">WANI</span>
          </Link>
        </div>
        
        <div className="navbar-end gap-6">
          <button className="hidden lg:block font-outfit text-[10px] font-black tracking-[0.4em] text-[#5a4838] opacity-40 hover:opacity-100 transition-all uppercase">
            Search
          </button>
          <button className="relative group">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#5a4838] opacity-40 group-hover:opacity-100 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="badge badge-sm bg-[#FD2F79]/20 border-none text-[#FD2F79] font-outfit text-[8px] indicator-item">0</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
