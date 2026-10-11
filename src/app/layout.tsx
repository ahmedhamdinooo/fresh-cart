import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import Providers from "@/components/Providers";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FreshCart — Shop Fresh, Live Better",
    template: "%s | FreshCart",
  },
  description:
    "FreshCart e-commerce store built with Next.js, TypeScript, and the Route Academy API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${outfit.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <Providers>
          <TopBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
