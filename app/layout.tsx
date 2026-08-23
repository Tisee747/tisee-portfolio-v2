import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tisee-portfolio-v2.vercel.app"),
  title: "Tisee — Backend Engineering & Applied AI",
  description:
    "Tisee is an Informatics undergraduate at Telkom University working across backend engineering, automation, data systems, and applied AI.",
  openGraph: {
    title: "Tisee — Backend Engineering & Applied AI",
    description: "Backend engineering, automation, data systems, and applied AI.",
    type: "website",
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
