const BlogItem = ({ blog, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-4">
      <img
        src={blog.coverPhoto}
        alt={blog.title}
        className="w-24 h-24 sm:w-20 sm:h-20 rounded-lg object-cover"
      />
      <div className="flex-grow text-center sm:text-left">
        <h2 className="text-lg font-semibold">{blog.title}</h2>
        <p className="text-sm text-gray-600">Host: {blog.host?.name || "not found"}</p>
        <p className="text-sm text-gray-600">Email: {blog.host?.email || "not found"}</p>
      </div>
      <button
        onClick={() => onDelete(blog._id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full sm:w-auto"
      >
        Delete
      </button>
    </div>
  );
};

export default BlogItem;
