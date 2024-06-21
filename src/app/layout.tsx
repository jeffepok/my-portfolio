import type { Metadata } from "next";
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
      <body className="overflow-x-hidden">
        <div className="App font-cascadia-code">
          <Navbar/>
          {children}
        </div>
      </body>
    </html>
  );
}
