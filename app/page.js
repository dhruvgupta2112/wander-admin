"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.authToken;

    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
    } else {
      router.push("/home"); // Redirect to home/dashboard if authenticated
    }
  }, [router]);

  return <div className="text-center text-xl font-semibold mt-10">Redirecting...</div>;
}
