const BlogItem = ({ blog, onDelete }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
        <img src={blog.coverPhoto} alt={blog.title} className="w-20 h-20 rounded-lg object-cover mr-4" />
        <div className="flex-grow">
          <h2 className="text-lg font-semibold">{blog.title}</h2>
          <p className="text-sm text-gray-600">Host: {blog.host.name}</p>
          <p className="text-sm text-gray-600">Email: {blog.host.email}</p>
        </div>
        <button
          onClick={() => onDelete(blog._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    );
  };
  
  export default BlogItem;
  