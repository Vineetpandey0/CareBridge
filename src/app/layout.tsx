import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CareBridge | Smart Healthcare Support",
  description: "Immediate symptom guidance, healthcare access, and wellness tracking.",
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ... (imports)
import { LocationModal } from "@/components/features/LocationModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100`}
      >
        <div className="mb-16"><Navbar /></div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
