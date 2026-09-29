import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono, Golos_Text, Oswald, Roboto_Flex } from "next/font/google";
import { LanguageProvider } from "@/lib/language/LanguageProvider";
import { translations } from "@/lib/language/translations";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
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

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  variable: "--font-oswald",
});

const robotoFlex = Roboto_Flex({
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
});

const golos = Golos_Text({
  subsets: ["latin", "cyrillic"],
  variable: "--font-golos",
});

export const metadata: Metadata = {
  title: translations.en.meta.title,
  description:
    "Junior fullstack developer from Ulaanbaatar building with Next.js, TypeScript, and SQL. Portfolio of Bayar Tsolmon.",
  authors: [{ name: "Bayar Tsolmon" }],
  metadataBase: new URL("https://tsolmons-portfolio.vercel.app"),
  openGraph: {
    title: translations.en.meta.title,
    description:
      "Junior fullstack developer from Ulaanbaatar building with Next.js, TypeScript, and SQL.",
    url: "https://tsolmons-portfolio.vercel.app",
    siteName: "Bayar Tsolmon",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${oswald.variable} ${robotoFlex.variable} ${golos.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("portfolio-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}try{history.scrollRestoration="manual"}catch(e){}if(!location.hash)scrollTo(0,0);`,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider>
          <LanguageProvider
            key={`${translations.en.about.p1}|${translations.mn.about.p1}|${translations.en.about.p3}`}
          >
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
