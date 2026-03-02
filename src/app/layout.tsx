import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Lato } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import SidebarPanel from "@/components/shared/Sidebar";
import Image from "next/image";
import Navbar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "PlateSafe",
  description: "Know what’s on your plate",
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${cn("font-Lato antialiased", lato.variable)}`}
        >
          <img src="/assets/images/safeplate-hero-bg.png" alt="main background" className="object-cover h-[300vh] absolute z-[-1]"/>          
          <Navbar/>          
          {children}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}
