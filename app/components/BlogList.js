"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import BlogItem from "./BlogItem";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("https://wander-backend-production.up.railway.app/api/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      // Ensure token exists before making the request
      if (!token) {
        console.error("No token found");
        return;
      }

      // Make the DELETE request with the Authorization header
      await axios.delete(`https://wander-backend-production.up.railway.app/api/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token in headers
        },
      });

      // Remove the deleted blog from the UI
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
