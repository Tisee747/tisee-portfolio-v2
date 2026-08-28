import type { Metadata } from "next";
import { Geist } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

const siteTitle = "Tisee — Developer Portfolio";
const siteDescription =
  "Backend-focused developer building dependable software, automation, and practical AI tools.";

export const metadata: Metadata = {
  metadataBase: new URL("https://tisee-portfolio-v2.vercel.app"),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Tisee",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.className}>
      <body className="flex min-h-screen flex-col bg-white antialiased selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="flex w-full flex-grow flex-col bg-white">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
