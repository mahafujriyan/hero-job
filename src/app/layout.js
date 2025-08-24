
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "YMart",
  description: "YMart is a modern e-commerce platform to buy and sell products online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
            <Navbar></Navbar>
            <main className="py-10 min-h-screen mx-auto ">{children}</main>
             <Footer></Footer>
        </Providers>
      </body>
     
    </html>
  );
}
