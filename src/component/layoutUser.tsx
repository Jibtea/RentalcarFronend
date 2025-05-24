// 'use client';
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};


export default async function LayoutWithUser({ children }: Props) {
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
    <div className="min-h-screen min-w-screen flex flex-col bg-gray-900 text-white">
      <header className="fixed top-0 left-0 right-0 h-16 w-full bg-gray-800 px-6 flex items-center justify-between shadow-md z-50">
        {/* ด้านซ้าย */}
        <div className="text-2xl font-bold">
          🚗 Car Rental
        </div>

        {/* ด้านขวา */}
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <span className="font-medium bg-white text-gray-800 px-4 py-2 rounded-md">
                Welcome, {user?.data?.name} ({role})
              </span>
              <Link href="/logout">
                <button className="bg-white text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition">
                  Logout
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="bg-white text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="bg-white text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition">
                  Register
                </button>
              </Link>
              <span className="font-medium bg-white text-gray-800 px-4 py-2 rounded-md">
                Guest
              </span>
            </>
          )}
        </div>
      </header>


      {/* ✅ Main */}
      <main className="flex-1 p-6 pt-16">{children}</main>
    </div>
  );
}
