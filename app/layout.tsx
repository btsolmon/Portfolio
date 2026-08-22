import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono, Roboto_Flex } from "next/font/google";
import { LanguageProvider } from "@/lib/language/LanguageProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton-display",
});

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Tsolmon — Junior Software Engineer",
  description: "Portfolio of Tsolmon, a junior software engineer in Ulaanbaatar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${robotoFlex.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-foreground">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
