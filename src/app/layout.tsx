import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
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
  const session = await getServerSession(authOptions);
  let user;
  let role = "";
  if (session?.user.token) {
    user = await getUserProfile(session.user.token);
  }
  if (user) {
    role = user.data.role;
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <LayoutWithUser role={role} user={user} >
            {children}
          </LayoutWithUser>
        </NextAuthProvider>
      </body>
    </html>
  );
}
