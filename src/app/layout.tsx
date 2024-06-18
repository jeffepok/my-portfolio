import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";

export const metadata: Metadata = {
  title: "Jefferson Tuffour",
  description: "Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="App bg-[#182533] font-cascadia-code">
          <Navbar/>
          {children}
        </div>
      </body>
    </html>
  );
}
