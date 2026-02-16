import type { Metadata } from "next";

import "./globals.css";
import NavBar from "../components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { dMSans, spaceGrotesk, orbitron } from "@/app/ui/font";

export const metadata: Metadata = {
  title: "CABASH",
  description: "Shop premium sneakers designed for comfort and performance.",
  keywords: ["sneakers", "running shoes", "streetwear shoes"],
  icons: "/logos.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logos.png" type="image/png " />
      </head>
      <body
        className={`${dMSans.variable} ${spaceGrotesk.variable} ${orbitron.variable} antialiased `}
      >
        <NavBar />
        <main className="min-h-full pt-10 md:pt-20 ">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
