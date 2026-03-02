import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-great-vibes",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "DESIGN STUDIO | Architecture & Interior Design",
    template: "%s | DESIGN STUDIO",
  },
  description:
    "Premium architecture and interior design studio. Specializing in residential, commercial, and luxury interior projects. Transform your space with DESIGN STUDIO.",
  keywords: [
    "architecture studio",
    "interior designer",
    "residential interior design",
    "commercial architecture",
    "interior design studio",
    "luxury interior design",
    "architecture firm",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://designstudio.com",
    siteName: "DESIGN STUDIO",
    title: "DESIGN STUDIO | Architecture & Interior Design",
    description:
      "Premium architecture and interior design studio. Transform your space with DESIGN STUDIO.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${greatVibes.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

