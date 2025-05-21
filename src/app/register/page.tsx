'use client'

import registerUser from "@/libs/registerUser";
import { useSession } from "next-auth/react"
import router from "next/router";
import React, { useState } from "react";

export default function register() {
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const hadleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const res = await registerUser(
      name,
      email,
      password,
      role
    );

    if (res?.error) {
      setError("please put correct data");
    } else {
      alert("register complete, please login");
      router.push("/");
    }
  };


  const handleBack = async () => {
    // e.preventDefault();
    router.push('/');
  }
  return (
    session?.user?.token ?
      <main className="flex items-center justify-center h-screen bg-black text-white">
        <div className="text-xl font-bold mb-2 text-center p-2">
          you already have account. please logout before register
        </div>

        <button
          onClick={handleBack}
          disabled={loading}
          className="max-w-md px-6 py-2 bg-purple-600 hover:bg-purple-700 transition rounded-lg font-semibold disabled:opacity-50"
        >
          Go To main menu
        </button>
      </main>

      :
      <main className="flex items-center justify-center h-screen bg-black text-white">
        <div className="bg-gray-900 p-10 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">
            register
          </h1>

          <form onSubmit={hadleRegister} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm">Name</label>
              <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Joy soipad"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Are you car provider</option>
                <option value="provider">Yes</option>
                <option value="user">No</option>
              </select>
            </div>

            {error != "" && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 transition rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? 'Try to Register...' : 'Register'}
            </button>

          </form>
        </div>
      </main>
  )
}