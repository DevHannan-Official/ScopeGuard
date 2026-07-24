import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://scopeguard-ai.vercel.app"),

  title: {
    default: "ScopeGuard",
    template: "%s | ScopeGuard",
  },

  description:
    "AI-powered scope checker for freelancers. Find out if a client request is inside or outside your agreed project scope.",

  keywords: [
    "scope creep",
    "freelancer",
    "project scope",
    "AI",
    "client requests",
    "proposal",
    "contract",
  ],
  openGraph: {
    title: "ScopeGuard",
    description:
      "AI-powered scope checker for freelancers. Find out if a client request is inside or outside your agreed project scope.",
    url: "https://scopeguard-ai.vercel.app",
    siteName: "ScopeGuard",
    locale: "en_US",
    type: "website",

    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ScopeGuard",
    description:
      "AI-powered scope checker for freelancers. Find out if a client request is inside or outside your agreed project scope.",
    images: ["/images/og.png"],
  },

  authors: [{ name: "Devair" }],

  creator: "Devair",

  publisher: "Devair",

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children} <Toaster />
      </body>
    </html>
  );
}
