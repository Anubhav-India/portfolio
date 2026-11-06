import type { Metadata, Viewport } from "next";
import "./globals.css";
import { portfolioData } from "@/data/portfolio";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFD" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F19" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: portfolioData.metadata.siteTitle,
  description: portfolioData.metadata.siteDescription,
  keywords: portfolioData.metadata.keywords,
  authors: [{ name: portfolioData.metadata.author }],
  creator: portfolioData.metadata.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: portfolioData.metadata.siteUrl,
    title: portfolioData.metadata.siteTitle,
    description: portfolioData.metadata.siteDescription,
    siteName: `${portfolioData.metadata.author} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioData.metadata.siteTitle,
    description: portfolioData.metadata.siteDescription,
    creator: portfolioData.social.twitter || "@portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
