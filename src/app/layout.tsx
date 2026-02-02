import "@/lib/env";
import HeaderNav from "@/components/HeaderNav";
import BottomNav from "@/components/BottomNav";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bookmark",
  description: "Social learning platform for tracking progress and connecting with learners.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    title: "Bookmark",
    description: "Social learning platform for tracking progress and connecting with learners.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bookmark",
    description: "Social learning platform for tracking progress and connecting with learners.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-zinc-50 text-zinc-900 antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow"
        >
          Skip to content
        </a>
        <HeaderNav />
        <main id="main" className="min-h-[calc(100vh-120px)] pb-24 md:pb-0">
          {children}
        </main>
        <BottomNav />
        <footer className="border-t border-zinc-200 bg-white">
          <div className="mx-auto w-full max-w-6xl px-6 py-6 text-xs text-zinc-500">
            © {new Date().getFullYear()} Bookmark
          </div>
        </footer>
      </body>
    </html>
  );
}
