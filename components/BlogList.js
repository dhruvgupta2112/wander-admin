"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import BlogItem from "./BlogItem";
import { parseCookies } from "nookies";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const apiBaseUrl = "https://wander.6ip.it/api";

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/blogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      const cookies = parseCookies();
      const token = cookies.authToken;
      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.delete(`${apiBaseUrl}/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(blogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-700">All Blogs</h1>
      <div className="space-y-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogItem key={blog._id} blog={blog} onDelete={handleDelete} />)
        ) : (
          <p className="text-gray-600">No blogs available</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
