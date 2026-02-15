import { useEffect, useState } from "react";
import axios from "axios";
import "./Blog.css";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=20"
      );

      setBlogs(res.data);
    } catch (err) {
      console.log("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchBlogs();
}, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading blogs...</h2>;
  }

  return (
    <div className="blog-container">
      <h1 className="blog-heading">Transform Your Spaces with Tips</h1>

      <div className="blog-grid">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog.id}>
            {/* Dummy image (random image for each card) */}
            <img
              src={`https://picsum.photos/400/300?random=${blog.id}`}
              alt="blog"
            />

            <div className="blog-content">
              <p className="blog-date">Jan {blog.id}</p>
              <p className="blog-category">Interior Design</p>
              <h3 className="blog-title">{blog.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
