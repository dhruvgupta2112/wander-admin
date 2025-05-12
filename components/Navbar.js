"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, destroyCookie } from "nookies";
import { jwtDecode } from "jwt-decode";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    window.addEventListener("authChange", loadUser);
    return () => window.removeEventListener("authChange", loadUser);
  }, []);

  const handleLogout = () => {
    destroyCookie(null, "authToken");
    setUser(null);
    router.push("/login");
  };

  if (!user) return null;

  return (
    <nav className="bg-green-600 text-white py-4 px-6 flex justify-between items-center relative">
      <div
        onClick={() => router.push("/")}
        className="text-xl font-bold select-none hover:cursor-pointer"
      >
        Admin Panel
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-6">
        <button onClick={() => router.push("/blogs")} className="hover:underline hover:cursor-pointer">Blogs</button>
        <button onClick={() => router.push("/trips")} className="hover:underline hover:cursor-pointer">Trips</button>
        <button onClick={() => router.push("/users")} className="hover:underline hover:cursor-pointer">Users</button>

        <div className="relative">
          <img
            src={user.photo || "/default-profile.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg py-2 z-20">
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

      {/* Mobile Toggle */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-green-700 py-4 z-10 md:hidden flex flex-col items-start px-6 space-y-4 text-white">
          <button onClick={() => router.push("/blogs")} className="w-full text-left">Blogs</button>
          <button onClick={() => router.push("/trips")} className="w-full text-left">Trips</button>
          <button onClick={() => router.push("/users")} className="w-full text-left">Users</button>
          <button onClick={handleLogout} className="w-full text-left text-red-200">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
