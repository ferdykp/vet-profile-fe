import "./globals.css";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProfile } from "@/lib/api"; // 1. Import getProfile

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif"
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans"
});
export const metadata = {
  title: {
    default: "drh. Tiara — Veterinary Journal",
    template: "%s — drh. Tiara"
  },
  description: "Veterinary medicine, diagnostic cytology, clinical stories, and reflective writing."
};
export default async function RootLayout({
  children
}) {
  // 2. Fetch profile data di level layout
  const profile = await getProfile();
  return <html lang="en" className={`${newsreader.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="[:where(&)_*]:box-border scroll-smooth m-0 bg-[#fbf9f3] text-[#1b1c18] [font-family:var(--font-sans),_sans-serif] [-webkit-font-smoothing:antialiased] [:where(&)_a]:text-[inherit] [:where(&)_a]:no-underline [:where(&)_img]:block [:where(&)_img]:max-w-full [:where(&)_button]:cursor-pointer [:where(&)_main]:min-h-[70vh] [:where(&)_main]:pt-22 [:where(&)_h1]:[font-family:var(--font-serif),_serif] [:where(&)_h1]:text-[#14261d] [:where(&)_h1]:font-normal [:where(&)_h1]:tracking-[-0.025em] [:where(&)_h1]:m-0 [:where(&)_h2]:[font-family:var(--font-serif),_serif] [:where(&)_h2]:text-[#14261d] [:where(&)_h2]:font-normal [:where(&)_h2]:tracking-[-0.025em] [:where(&)_h2]:m-0 [:where(&)_h3]:[font-family:var(--font-serif),_serif] [:where(&)_h3]:text-[#14261d] [:where(&)_h3]:font-normal [:where(&)_h3]:tracking-[-0.025em] [:where(&)_h3]:m-0 [:where(&)_p]:mt-0 max-[800px]:[:where(&)_main]:pt-19.5 text-base leading-relaxed [overflow-wrap:anywhere] [:where(&)_*]:min-w-0 [:where(&)_a:focus-visible]:outline-2 [:where(&)_a:focus-visible]:outline-offset-4 [:where(&)_a:focus-visible]:outline-[#526a5a] [:where(&)_button:focus-visible]:outline-2 [:where(&)_button:focus-visible]:outline-offset-4 [:where(&)_button:focus-visible]:outline-[#526a5a] [:where(&)_input:focus-visible]:outline-2 [:where(&)_input:focus-visible]:outline-[#526a5a] [:where(&)_textarea:focus-visible]:outline-2 [:where(&)_textarea:focus-visible]:outline-[#526a5a] [:where(&)_select:focus-visible]:outline-2 [:where(&)_select:focus-visible]:outline-[#526a5a] [:where(&)_p]:mb-4 [:where(&)_ol]:list-decimal [:where(&)_ul]:list-disc">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:p-4">Skip to content</a>
        <Header profile={profile} />
        <main id="main-content">{children}</main>
        <Footer profile={profile} />
      </body>
    </html>;
}
