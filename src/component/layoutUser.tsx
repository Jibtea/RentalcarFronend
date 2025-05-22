'use client';

import Link from "next/link";

type Props = {
  role: string;
  user: any;
  children: React.ReactNode;
};

export default function LayoutWithUser({ role, user, children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* ✅ Header */}
      <header className=" w-full bg-gray-800 px-6 py-4 flex justify-between items-center shadow-md border border-red-500">
        {/* ✅ ซ้าย */}
        <div className="flex items-center text-2xl font-bold">
          🚗 Car Rental
        </div>

        {/* ✅ ขวา */}
        <div className="flex items-center gap-4">
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
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
