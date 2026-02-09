import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ishmael.dev'),
  title: {
    default: "Ishmael Cascabel | Full-Stack Developer",
    template: "%s | Ishmael Cascabel"
  },
  description: "Full-stack developer crafting modern web experiences with clean code and innovative solutions. Explore my portfolio of projects built with React, Next.js, and more.",
  keywords: ["developer", "portfolio", "react", "nextjs", "typescript", "full-stack", "software engineer", "web development"],
  authors: [{ name: "Ishmael Cascabel", url: "https://ishmael.dev" }],
  creator: "Ishmael Cascabel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ishmael.dev",
    title: "Ishmael Cascabel | Full-Stack Developer",
    description: "Full-stack developer crafting modern web experiences with clean code and innovative solutions.",
    siteName: "Ishmael Cascabel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ishmael Cascabel | Full-Stack Developer",
    description: "Full-stack developer crafting modern web experiences with clean code and innovative solutions.",
    creator: "@ishmaelcascabel", 
  },
  icons: {
    icon: '/icon',
    shortcut: '/icon',
    apple: '/icon',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
