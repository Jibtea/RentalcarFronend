'use client'
import getUserProfile from "@/libs/getUserProfile";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession(); // <== เพิ่ม status
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true); // <== เพิ่ม loading state

  // console.log(session?.user);
  useEffect(() => {
    if (status === "loading")
      return;
    if (!session?.user?.token) {
      console.log("no session");
      return;
    }
    console.log("session.user:", session?.user);
    const fetchData = async () => {
      try {
        console.log("here");
        if (session?.user?.token) {
          const userData = await getUserProfile(session.user.token);
          console.log(userData.data.role);
          if (userData) {
            setUser(userData.data);
            setRole(userData.data.role);
          } else {
            setUser(null);
          }
        }
      }
      catch (err) {
        console.log("Error fetching data", err);
      } finally {
        setLoading(false); // <== หยุดโหลด
      }
    };

    fetchData();
  }, [session?.user.token]);

  // ✅ Loading UI
  // if (loading || status === "loading") {
  //   return (
  //     <main className="h-screen flex justify-center items-center bg-black text-white text-xl">
  //       Loading...
  //     </main>
  //   );
  // }

  return (
    <main className="h-screen bg-[url('https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center">
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="mb-3 font-semibold text-6xl text-white">JIBTEA</h1>
        <h2 className="mb-3 font-serif text-l text-white">Car rental web page full-stack practice</h2>
        {(loading) ?
          <div className="font-serif text-white">loading...
          </div>
          :
          user !== null ? (
            <div>
              <Link href="/providers">
                <button className="font-serif text-white">CarProvider</button>
              </Link>
            </div>
          ) : (
            <div className="font-serif text-white">
              <Link href="/login">
                <button className="font-serif text-white ml-10">login</button>
              </Link>
              <Link href="/register">
                <button className="font-serif text-white ml-10">register</button>
              </Link>
              <Link href="/providers">
                <button className="font-serif text-white ml-10">CarProvider</button>
              </Link>
            </div>
          )
        }
      </div>

    </main>
  );
}

