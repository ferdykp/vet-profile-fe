"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mediaUrl } from "@/lib/format";
import Icon from "./Icon";

const links = [
  ["/", "Home"],
  ["/journal", "Journal"],
  ["/about", "About"],
  ["/resources", "Resources"],
  ["/contact", "Contact"],
];

export default function Header({ profile }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef(null);
  const frame = useRef(null);

  const rawName = profile?.short_name || "Tiara";
  const displayName = rawName.toLowerCase().startsWith("drh.")
    ? rawName
    : `drh. ${rawName}`;

  const photo = mediaUrl(profile?.profile_photo);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onOutside = (event) => {
      if (!frame.current?.contains(event.target)) setOpen(false);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        scrolled ? "py-3 px-3 sm:px-6 lg:px-8" : "py-0 px-0"
      }`}
    >
      <div
        ref={frame}
        className={`relative mx-auto flex items-center justify-between gap-3 backdrop-blur-xl transition-all duration-500 ease-out ${
          scrolled
            ? "min-h-16 max-w-[1400px] rounded-2xl sm:rounded-full border border-[#526a5a]/20 bg-[#f3f0e6]/95 px-4 sm:px-6 shadow-xl shadow-[#14261d]/10 ring-1 ring-[#526a5a]/10"
            : "min-h-20 w-full rounded-none border-b border-[#526a5a]/10 bg-[#fbf9f3]/95 px-4 sm:px-8 lg:px-12 shadow-none ring-0"
        }`}
      >
        {/* Brand Logo / Name */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex min-w-0 items-center gap-2.5 text-[#14261d] group"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#293c32] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Icon name="leaf" className="w-4 h-4" />
          </span>
          <span className="truncate font-serif text-xl font-semibold sm:text-2xl tracking-tight transition-colors duration-300">
            {displayName}
          </span>
        </Link>

        {/* Navigation Links */}
        <nav
          id="public-navigation"
          aria-label="Main navigation"
          className={`${
            open ? "flex" : "hidden"
          } absolute inset-x-3 top-[calc(100%+8px)] flex-col gap-1 rounded-2xl border border-[#526a5a]/15 bg-[#f3f0e6] p-3 shadow-xl lg:static lg:flex lg:flex-row lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
        >
          {links.map(([href, label]) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`flex min-h-10 items-center rounded-full px-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  active
                    ? "bg-[#293c32] text-white shadow-sm"
                    : "text-[#424844] hover:bg-[#cee9d5]/60 hover:text-[#14261d]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-1.5">
          <Link
            href="/search"
            aria-label="Search journal"
            className="grid size-10 place-items-center rounded-full text-[#293c32] hover:bg-[#cee9d5]/60 transition-colors duration-300"
          >
            <Icon name="search" className="w-4 h-4" />
          </Link>

          {photo && (
            <Link
              href="/about"
              aria-label={`About ${displayName}`}
              className="hidden size-9 overflow-hidden rounded-full border border-[#526a5a]/20 sm:block transition-transform duration-300 hover:scale-105"
            >
              <img
                src={photo}
                alt={displayName}
                className="size-full object-cover"
              />
            </Link>
          )}

          <button
            ref={toggle}
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="public-navigation"
            onClick={() => setOpen(!open)}
            className="grid size-10 place-items-center rounded-full text-[#293c32] hover:bg-[#cee9d5]/60 lg:hidden transition-colors duration-300"
          >
            <Icon name={open ? "close" : "menu"} className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
