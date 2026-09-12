import "./globals.css";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProfile } from "@/lib/api"; // 1. Import getProfile

const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-serif" });
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
  // 2. Fetch profile data di level layout
  const profile = await getProfile();

  return (
    <html lang="en" className={`${newsreader.variable} ${jakarta.variable}`}>
      <body>
        {/* 3. Passing prop profile ke Header */}
        <Header profile={profile} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
