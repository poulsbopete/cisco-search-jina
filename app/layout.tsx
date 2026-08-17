import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteNav } from "@/components/SiteNav";
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
  title: "Cisco search · Elastic + Jina",
  description:
    "Semantic search over deals, transactions, logs, and notes. Elastic Serverless Search with Jina relevance — for CRM Analytics, Lifecycle Platform, and Webex / Infrastructure.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full dark antialiased`}
    >
      <body className="min-h-full bg-zinc-950 font-sans text-zinc-50">
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
