'use client'

import getUserProfile from "@/libs/getUserProfile";
import userLogin from "@/libs/userLogin";
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function login() {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);

  const [error, setError] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {

    // if (!session?.user?.token) {
    //   console.log("no session");
    //   // return;
    // }
    const fetchData = async () => {
      try {
        if (session?.user?.token) {
          const userData = await getUserProfile(session.user.token);
          if (!userData) {
            setUser(null);
          }
          setUser(userData.data);
        }
      }
      catch (err) {
        console.log("Error fetching data", err);
      }
    }

    fetchData();
  }, [session?.user.token]);


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      alert("login complete");
      router.push("/");
      router.refresh();
    }
  };

  const handleBack = async () => {
    // e.preventDefault();
    router.push('/');
  }

  return (
    user ?
      <main className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <div className="text-xl font-bold mb-2 text-center p-2">
          You already login
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
            Sign In
          </h1>

          <form onSubmit={handleLogin} className="space-y-5">
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
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 transition rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

          </form>
        </div>
      </main>
  )
}

