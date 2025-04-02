"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectIfAuthenticated = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if window is defined to make sure we're on the client side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');

      if (token) {
        router.push('/home');  // Redirect to home if token exists
      } else {
        router.push('/login');  // Redirect to signin if no token
      }
    }
  }, [router]);

  return null; // This component doesn't render anything
};

export default RedirectIfAuthenticated;
