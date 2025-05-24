import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/providers/NextAuthProvider";
import LayoutWithUser from "@/component/layoutUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Car Rental Provider",
  description: "Practice full-stack skill cry cry",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <LayoutWithUser >
            {children}
          </LayoutWithUser>
        </NextAuthProvider>
      </body>
    </html>
  );
}
