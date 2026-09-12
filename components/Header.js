"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { portrait } from "@/lib/demo-data";
import { mediaUrl } from "@/lib/format";

// Tambahkan variabel links ini di luar komponen
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

  const profileImage = mediaUrl(profile?.profile_photo, portrait);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={`global-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-frame">
        <div className="header-pill">
          <Link href="/" className="masthead" onClick={() => setOpen(false)}>
            <span className="masthead-mark">T</span>
            <span className="masthead-copy">
              {/* <strong>{profile?.full_name || "drh. Tiara"}</strong> */}
              <strong>drh. Tiara</strong>
            </span>
          </Link>

          <nav className={`desktop-nav ${open ? "mobile-open" : ""}`}>
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={isActive(href) ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="header-tools">
            <Link href="/search" className="round-icon" aria-label="Search">
              ⌕
            </Link>
            <Link
              href="/about"
              className="profile-dot"
              aria-label="About drh. Tiara"
            >
              <img src={profileImage} alt={profile?.full_name || "Profile"} />
            </Link>
            <button
              type="button"
              className="mobile-toggle"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              {open ? "×" : "☰"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
