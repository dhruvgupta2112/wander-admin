"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, destroyCookie } from "nookies";
import Navbar from "../../components/Navbar";
import BlogList from "../../components/BlogList";
import TripsList from "../../components/TripList";

const Home = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.user) {
      setUser(JSON.parse(cookies.user));
    } else {
      router.push("/login"); // Redirect if not logged in
    }
  }, []);

  const handleLogout = () => {
    destroyCookie(null, "authToken");
    destroyCookie(null, "user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Navbar user={user} onLogout={handleLogout} setActiveTab={setActiveTab} /> */}
      {activeTab === "home" && (
        <p className="text-gray-600 text-lg font-semibold flex justify-center h-screen pt-7">
          Admin Panel
        </p>
      )}
      {activeTab === "blogs" && <BlogList />}
      {activeTab === "trips" && <div className="p-6 text-gray-700"><TripsList /></div>}
      {activeTab === "users" && <div className="p-6 text-gray-700">Users Section Coming Soon...</div>}
    </div>
  );
};

export default Home;
