"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import BlogList from "../components/BlogList";
import TripsList from "../components/TripList";

const Home = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("blogs"); // Track active section

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login"); // Redirect if not logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} onLogout={handleLogout} setActiveTab={setActiveTab} />
      {activeTab === "blogs" && <BlogList />}
      {/* Placeholder for Trips & Users Sections */}
      {activeTab === "trips" && <div className="p-6 text-gray-700"><TripsList /></div>}
      {activeTab === "users" && <div className="p-6 text-gray-700">Users Section Coming Soon...</div>}
    </div>
  );
};

export default Home;
