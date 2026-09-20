import "./globals.css";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProfile } from "@/lib/api";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: {
    default: "drh. Tiara — Veterinary Journal",
    template: "%s — drh. Tiara",
  },
  description:
    "Veterinary medicine, diagnostic cytology, clinical stories, and reflective writing.",
};

export default async function RootLayout({ children }) {
  // Fetch profile data di level layout
  const profile = await getProfile();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${newsreader.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#fbf9f3] text-[#1b1c18] font-sans antialiased selection:bg-[#cee9d5] selection:text-[#14261d]">
        {/* Skip to Main Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-[#293c32] focus:text-white focus:text-xs focus:font-bold focus:uppercase focus:tracking-wider focus:shadow-lg focus:outline-none"
        >
          Skip to content
        </a>

        {/* Global Floating/Full Header */}
        <Header profile={profile} />

        {/* Main Content Wrapper */}
        <main id="main-content" className="min-h-[75vh] pt-20 md:pt-24">
          {children}
        </main>

        {/* Global Footer */}
        <Footer profile={profile} />
      </body>
    </html>
  );
}
