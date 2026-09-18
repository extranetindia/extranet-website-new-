import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Extranet Infotech — High-Speed Broadband & Fiber Internet",
    template: "%s | Extranet India",
  },
  description:
    "Extranet India delivers enterprise-grade broadband, fiber, and wireless internet solutions. Blazing speeds, unmatched reliability, and 24/7 support across India.",
  keywords:
    "Extranet India, broadband, fiber internet, ISP, high speed internet, wireless internet",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#475569]">
        {/* All framer-motion animation respects the visitor's OS motion setting */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
