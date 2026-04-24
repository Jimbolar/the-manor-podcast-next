import type { Metadata } from "next";
import { Bebas_Neue, Titillium_Web } from "next/font/google";
import { SanityLive } from "@/sanity/lib/live";
import Script from "next/script";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const titilliumWeb = Titillium_Web({
  variable: "--font-titillium",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Manor Podcast",
  description: "An extremely unofficial, proudly informal Oxford United podcast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${titilliumWeb.variable}`}
    >
      <body className="min-h-screen flex flex-col">{children}<SanityLive /></body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-3BLD04LXCD"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3BLD04LXCD');
        `}
      </Script>
    </html>
  );
}
