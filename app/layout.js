import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const groteskFont = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

export const metadata = {
  title: "Assembly vs JavaScript",
  description:
    "Comparing WebAssembly and JavaScript performance using quicksort algorithm that sorts an array of numbers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} ${groteskFont.variable} bg-[#101010]`}
      >
        {children}
      </body>
    </html>
  );
}
