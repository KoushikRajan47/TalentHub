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
  title: "TalentHub AI — Next-Gen Vetted Tech & Design Talent Marketplace",
  description:
    "Hire vetted senior software engineers, AI researchers, and UI/UX designers matched by semantic AI scoring. High-impact full-stack platform built with Next.js, TypeScript, Supabase, and Tailwind CSS.",
  keywords: [
    "Talent Marketplace",
    "Freelance Platform",
    "AI Matchmaker",
    "Senior Developers",
    "Next.js App Router",
    "TypeScript",
    "Supabase",
  ],
  authors: [{ name: "TalentHub Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
