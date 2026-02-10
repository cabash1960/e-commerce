import type { Metadata } from "next";

import "./globals.css";
import NavBar from "../components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { dMSans, spaceGrotesk, orbitron } from "@/app/ui/font";

export const metadata: Metadata = {
  title: "CABASH",
  description: "Ride With US",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dMSans.variable} ${spaceGrotesk.variable} ${orbitron.variable} antialiased`}
      >
        <NavBar />
        <main className="min-h-full pt-20 md:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
