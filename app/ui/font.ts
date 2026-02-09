import { Space_Grotesk } from "next/font/google";
import { Orbitron } from "next/font/google";
import { DM_Sans } from "next/font/google";

export const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-spaceGrotesk",
});
export const dMSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});
