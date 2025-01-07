import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codepanuvom",
  description: "Created By Ajay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Script
        defer
        data-domain="codepanuvomm.vercel.app"
        src="https://plausible.io/js/script.outbound-links.js"
      />
    </html>
  );
}
