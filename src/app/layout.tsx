import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StarField from "@/components/StarField";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rohith Badri Manda — Full-Stack Developer",
  description:
    "Portfolio of Rohith Badri Manda: Full-Stack Developer building with React, Next.js, Node.js, Express, PostgreSQL, Prisma and MongoDB.",
  openGraph: {
    title: "Rohith Badri Manda — Full-Stack Developer",
    description: "React · Next.js · Node.js · PostgreSQL · Prisma",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StarField />
        {children}
      </body>
    </html>
  );
}
