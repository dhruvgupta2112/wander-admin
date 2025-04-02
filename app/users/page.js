"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const cookies = parseCookies();
        const token = cookies.authToken;

        if (!token) {
          router.push("/login");
          return;
        }

        const response = await axios.get("https://wander-backend-production.up.railway.app/api/users/all-users", {
          headers: { Authorization: `Bearer ${token}` },
        //   withCredentials: true,
        });

        setUsers(response.data);
      } catch (error) {
        console.error(error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  if (loading) return <p className="text-center text-xl font-semibold mt-10">Loading users...</p>;

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin - All Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="px-6 py-3 text-left">Photo</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Friends</th>
              <th className="px-6 py-3 text-left">Public Posts</th>
              <th className="px-6 py-3 text-left">Trip History</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-100 transition duration-200">
                <td className="px-6 py-4">
                  <img
                    src={user.photo || "/default-profile.png"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border border-gray-300 shadow-sm"
                  />
                </td>
                <td className="px-6 py-4 text-gray-700 font-medium">{user.name}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-center text-green-700 font-semibold">{user.friends?.length || 0}</td>
                <td className="px-6 py-4 text-center text-blue-700 font-semibold">{user.publicPosts?.length || 0}</td>
                <td className="px-6 py-4 text-center text-purple-700 font-semibold">{user.tripHistory?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
