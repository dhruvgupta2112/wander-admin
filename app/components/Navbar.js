"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = ({ user, onLogout, setActiveTab }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white py-4 px-6 flex justify-between items-center">
      <div className="text-xl font-bold">Admin Panel</div>
      <div className="flex items-center space-x-6">
        <button onClick={() => setActiveTab("blogs")} className="hover:underline">Blogs</button>
        <button onClick={() => setActiveTab("trips")} className="hover:underline">Trips</button>

        {/* Profile Section */}
        {user && (
          <div className="relative">
            <img
              src={user.photo}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg py-2">
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
