import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#ebd8c5] text-[#5a4838] border-t border-white/20 font-sans pt-16 md:pt-20 pb-12 px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {/* Shop Column */}
          <div className="flex flex-col">
            <h6 className="font-outfit text-xs font-black tracking-[0.4em] text-[#FD2F79] mb-6 uppercase">Vinor league</h6>
            <div className="flex flex-col gap-4">
              <Link href="/about" className="link link-hover font-bold text-sm opacity-70 hover:opacity-100 transition-opacity">About Us</Link>
              <Link href="/shop" className="link link-hover font-bold text-sm opacity-70 hover:opacity-100 transition-opacity">Shop</Link>
              <Link href="/characters" className="link link-hover font-bold text-sm opacity-70 hover:opacity-100 transition-opacity">Characters</Link>
            </div>
          </div>

          {/* Care Column */}
          <div className="flex flex-col">
            <h6 className="font-outfit text-xs font-black tracking-[0.4em] text-[#FD2F79] mb-6 uppercase">Customer Care</h6>
            <div className="flex flex-col gap-4">
              <a className="link link-hover font-bold text-sm opacity-70 hover:opacity-100 transition-opacity cursor-pointer">FAQ</a>
              <a className="link link-hover font-bold text-sm opacity-70 hover:opacity-100 transition-opacity cursor-pointer">Shipping & Returns</a>
              <Link href="/contact" className="link link-hover font-bold text-sm opacity-70 hover:opacity-100 transition-opacity">Contact Us</Link>
            </div>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col">
            <h6 className="font-outfit text-xs font-black tracking-[0.4em] text-[#FD2F79] mb-6 uppercase">Legal</h6>
            <div className="flex flex-col gap-4">
              <a className="link link-hover font-bold text-sm opacity-70 hover:opacity-100 transition-opacity cursor-pointer">Terms of Service</a>
              <a className="link link-hover font-bold text-sm opacity-70 hover:opacity-100 transition-opacity cursor-pointer">Privacy Policy</a>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col">
            <h6 className="font-outfit text-xs font-black tracking-[0.4em] text-[#FD2F79] mb-6 uppercase">Newsletter</h6>
            <p className="text-sm font-bold opacity-70 mb-6 leading-relaxed">매월 특별한 할인 정보를 받아보세요!</p>
            <div className="flex w-full rounded-full border border-[#5a4838]/20 bg-white p-1">
              <input 
                type="text" 
                placeholder="Email" 
                className="input bg-transparent border-none w-full focus:outline-none placeholder:text-[#5a4838]/40 font-outfit text-xs" 
              />
              <button className="btn btn-sm h-10 px-6 bg-[#FD2F79] hover:bg-pink-600 text-white rounded-full border-none font-outfit font-black tracking-widest text-[9px] shadow-sm">JOIN</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#5a4838]/10 pt-12 flex flex-col items-center gap-8">
          <div className="flex gap-10">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-outfit text-[10px] font-black tracking-[0.3em] uppercase opacity-40 hover:opacity-100 hover:text-[#FD2F79] transition-all">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="font-outfit text-[10px] font-black tracking-[0.3em] uppercase opacity-40 hover:opacity-100 hover:text-[#FD2F79] transition-all">Twitter</a>
            <a href="https://github.com/nontext75/vinorleague" target="_blank" rel="noopener noreferrer" className="font-outfit text-[10px] font-black tracking-[0.3em] uppercase opacity-40 hover:opacity-100 hover:text-[#FD2F79] transition-all">Github</a>
          </div>
          <p className="font-outfit text-[10px] font-black tracking-[0.5em] uppercase opacity-20 text-center">
            © 2024 VINOR LEAGUE COLL. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
