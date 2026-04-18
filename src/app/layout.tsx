import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PhonesAndRepairs | Premium Devices & Service",
  description: "Next-generation device sales and precision repair services.",
  icons: {
    icon: "/assets/images/logotipo_cellphones_and_repairs.png",
  },
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
      <body className={`${inter.variable} font-sans antialiased bg-white text-slate-900`}>
        <CartProvider>
          <Toaster 
            position="top-right" 
            toastOptions={{
              className: 'bg-white text-slate-900 rounded-2xl border border-slate-200 font-sans font-medium text-sm shadow-2xl',
              duration: 4000,
              success: {
                iconTheme: {
                  primary: '#3b82f6',
                  secondary: '#fff',
                },
              },
            }}
          />
          <Navbar />
          {children}
          <Footer />
          <FloatingActions />
        </CartProvider>
      </body>
    </html>
  );
}
