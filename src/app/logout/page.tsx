'use client';

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const doLogout = async () => {
      await signOut({
        redirect: false, // ไม่ต้อง redirect อัตโนมัติ
      });

      router.push("/"); // หลัง logout แล้ว redirect ไปหน้าแรก
      router.refresh(); // refresh page
    };

    doLogout();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen text-xl">
      Logging out...
    </div>
  );
}
