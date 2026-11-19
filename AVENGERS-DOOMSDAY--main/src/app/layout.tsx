import type { Metadata } from "next";
import "./globals.css";
import SearchOverlay from "@/components/SearchOverlay";
import SideDocks from "@/components/SideDocks";
import LoadingScreenWrapper from "@/components/LoadingScreenWrapper";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: {
    default: "Marvel Archives — Every Story. Every Hero. Every Detail.",
    template: "%s | Marvel Archives",
  },
  description:
    "A comprehensive interactive encyclopedia of the Marvel Cinematic Universe — heroes, villains, Infinity Stones, weapons, technology, events, and more.",
  keywords: ["Marvel", "MCU", "Avengers", "Iron Man", "Infinity Stones", "Marvel Cinematic Universe"],
  authors: [{ name: "Marvel Archives" }],
  openGraph: {
    title: "Marvel Archives",
    description: "Every Story. Every Hero. Every Detail.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className="dark" suppressHydrationWarning>
      <body className="dark bg-black text-[#e8e0d0]">
        <LoadingScreenWrapper />
        <SearchOverlay />
        {/* Side docks handle site navigation (top nav removed) */}
        <SideDocks />
        <main className="site-main">
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}
