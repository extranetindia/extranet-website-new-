import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Extranet India Private Limited — High-Speed Broadband & Fiber Internet",
  description:
    "Extranet India delivers enterprise-grade broadband, fiber, and wireless internet solutions. Blazing speeds, unmatched reliability, and 24/7 support across India.",
  keywords: "Extranet India, broadband, fiber internet, ISP, high speed internet, wireless internet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#050a14] text-[#e8edf5]">
        {children}
      </body>
    </html>
  );
}
