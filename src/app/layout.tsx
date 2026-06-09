import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillForge Academy | Learn In-Demand Skills",
  description:
    "Premium online courses in web development, data science, design, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-screen antialiased`}
      >
        <Navbar />

        <main className="min-h-[calc(100vh-8rem)]">
          {children}
        </main>

        <Footer />

        <Toaster
          theme="dark"
          position="top-right"
          richColors
        />
      </body>
    </html>
  );
}