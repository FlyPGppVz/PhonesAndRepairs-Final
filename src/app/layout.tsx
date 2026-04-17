import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PhonesAndRepairs | Premium Devices & Service",
  description: "Next-generation device sales and precision repair services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-neutral-950 text-slate-900 dark:text-white`}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <FloatingActions />
        </CartProvider>
      </body>
    </html>
  );
}
