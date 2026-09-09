import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppChrome } from "@/components/AppChrome";
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
  title: "Cisco — Semantic search with Elastic + Jina",
  description:
    "Facilitator deck and demos for the Instruqt lab: ES|QL keyword vs semantic on cisco-jina-corpus, CRM, Lifecycle, Webex CCR, CIRCUIT + ML — Elastic Serverless Search with Jina relevance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full dark antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
