import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ScrollTriggerProvider } from "@/components/shared/ScrollTriggerProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mokshbuddhadev.vercel.app"),
  title: "Moksh Buddhadev — AI/ML Engineer",
  description:
    "B.Tech CSE student building production AI systems — RAG pipelines, LLM evaluation, NL-to-SQL. Graduating 2027. Open to ML/GenAI internships.",
  openGraph: {
    title: "Moksh Buddhadev — AI/ML Engineer",
    description: "Building AI that earns its keep.",
    images: ["/og-image.png"],
    url: "https://mokshbuddhadev.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ScrollTriggerProvider>{children}</ScrollTriggerProvider>
      </body>
    </html>
  );
}
