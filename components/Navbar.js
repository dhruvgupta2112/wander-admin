"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, destroyCookie } from "nookies";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const cookies = parseCookies();
      const token = cookies.authToken;
  
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUser(decoded);
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
    };
  
    loadUser();
    window.addEventListener("authChange", loadUser); // Listen for login/logout events
  
    return () => {
      window.removeEventListener("authChange", loadUser); // Cleanup
    };
  }, []);
  

  const handleLogout = () => {
    destroyCookie(null, "authToken");
    setUser(null);
    router.push("/login");
  };

  if (!user) return null; // Return nothing if user is not logged in

  return (
    <nav className="bg-green-600 text-white py-4 px-6 flex justify-between items-center">
      <div
        onClick={() => router.push("/")}
        className="text-xl font-bold select-none hover:cursor-pointer"
      >
        Admin Panel
      </div>
      <div className="flex items-center space-x-6">
        <button onClick={() => router.push("/blogs")} className="hover:underline hover:cursor-pointer">Blogs</button>
        <button onClick={() => router.push("/trips")} className="hover:underline hover:cursor-pointer">Trips</button>
        <button onClick={() => router.push("/users")} className="hover:underline hover:cursor-pointer">Users</button>

        {/* Profile Section */}
        <div className="relative">
          <img
            src={user.photo || "/default-profile.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg py-2">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
