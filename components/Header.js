"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mediaUrl } from "@/lib/format";
import Icon from "./Icon";
const links = [["/", "Home"], ["/journal", "Journal"], ["/about", "About"], ["/resources", "Resources"], ["/contact", "Contact"]];
export default function Header({ profile }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef(null);
  const frame = useRef(null);
  const name = profile?.full_name || 'drh. Tiara';
  const photo = mediaUrl(profile?.profile_photo);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    const onKey = (event) => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    const onOutside = (event) => { if (!frame.current?.contains(event.target)) setOpen(false); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    return () => { window.removeEventListener('scroll', onScroll); document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onOutside); };
  }, []);
  return <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-6 lg:px-8">
    <div ref={frame} className={`relative mx-auto flex min-h-16 max-w-[1280px] items-center justify-between gap-3 rounded-3xl border border-[#d5ddd3]/70 px-3 backdrop-blur-xl sm:px-5 ${scrolled ? 'bg-[#fbf9f3]/95 shadow-lg shadow-[#293c32]/5' : 'bg-[#fbf9f3]/90 shadow-sm'}`}>
      <Link href="/" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-2.5 text-[#14261d]">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#293c32] text-white"><Icon name="leaf" /></span>
        <span className="truncate font-[family-name:var(--font-serif)] text-xl font-medium sm:text-2xl">{name}</span>
      </Link>
      <nav id="public-navigation" aria-label="Main navigation" className={`${open ? 'flex' : 'hidden'} absolute inset-x-0 top-[76px] flex-col gap-1 rounded-2xl border border-[#d5ddd3] bg-[#fbf9f3] p-3 shadow-lg lg:static lg:flex lg:flex-row lg:gap-0.5 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}>
        {links.map(([href, label]) => { const active = href === '/' ? pathname === '/' : pathname.startsWith(href); return <Link key={href} href={href} aria-current={active ? 'page' : undefined} onClick={() => setOpen(false)} className={`flex min-h-11 items-center rounded-full px-4 text-sm font-semibold transition-colors ${active ? 'bg-[#293c32] text-white' : 'text-[#424844] hover:bg-[#e7ece5] hover:text-[#14261d]'}`}>{label}</Link>; })}
      </nav>
      <div className="flex shrink-0 items-center gap-1">
        <Link href="/search" aria-label="Search journal" className="grid size-11 place-items-center rounded-full text-[#293c32] hover:bg-[#e7ece5]"><Icon name="search" /></Link>
        {photo && <Link href="/about" aria-label={`About ${name}`} className="hidden size-10 overflow-hidden rounded-full border border-[#a8b6ab] sm:block"><img src={photo} alt="" className="size-full object-cover" /></Link>}
        <button ref={toggle} type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="public-navigation" onClick={() => setOpen(!open)} className="grid size-11 place-items-center rounded-full text-[#293c32] hover:bg-[#e7ece5] lg:hidden"><Icon name={open ? 'close' : 'menu'} /></button>
      </div>
    </div>
  </header>;
}
