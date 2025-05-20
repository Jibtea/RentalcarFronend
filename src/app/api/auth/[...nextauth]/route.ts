// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // หรือ "@/app/api/auth/[...nextauth]/authOptions" ถ้าอยู่ตรงนั้นจริง

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
