import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "jefferson@portfolio:~$",
  description:
    "Jefferson Addai-Poku — Lead Full-Stack Engineer. Terminal-style portfolio.",
  authors: [{ name: "Jefferson Addai-Poku" }],
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='12' fill='%230a0e14'/%3E%3Ctext x='50' y='62' font-family='monospace' font-size='52' font-weight='bold' text-anchor='middle' fill='%2300ff9d'%3E%3E_%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Fira+Code:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-theme="hacker">
        <div className="crt-overlay" />
        <div className="scanlines" />
        {children}
      </body>
    </html>
  );
}
