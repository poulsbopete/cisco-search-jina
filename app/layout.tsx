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
    "Semantic search for Cisco product teams — ES|QL keyword vs meaning on CRM, Lifecycle, Webex CCR, and CIRCUIT, with Elastic + Jina and deploy options from self-hosted to Serverless and GovCloud.",
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
