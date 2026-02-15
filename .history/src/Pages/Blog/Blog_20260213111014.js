import "./Blog.css";

const blogData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    date: "Jan 9",
    category: "Interior Design",
    title: "Best Design Themes For Compact Apartments"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
    date: "Dec 24, 2025",
    category: "Patterns",
    title: "A Guide For Using Patterned Fabrics"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013",
    date: "Dec 9, 2025",
    category: "Window Blinds",
    title: "Top Eco-Friendly Blind Options for Sustainable Interiors"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    date: "Nov 21, 2025",
    category: "Window Blinds",
    title: "Solar Shades vs Roller Shades: The Subtle Difference That Transforms..."
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
    date: "Nov 10, 2025",
    category: "Wallpapers",
    title: "Why Wallpaper Wins: 8 Game-Changing Advantages That..."
  }
];

export default function Blog() {
  return (
    <div className="blog-container">
      <h1 className="blog-heading">Transform Your Spaces with Tips</h1>

      <div className="blog-grid">
        {blogData.map((blog) => (
          <div className="blog-card" key={blog.id}>
            <img src={blog.image} alt={blog.title} />

            <div className="blog-content">
              <p className="blog-date">{blog.date}</p>
              <p className="blog-category">{blog.category}</p>
              <h3 className="blog-title">{blog.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
