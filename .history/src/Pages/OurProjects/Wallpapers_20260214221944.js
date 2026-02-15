import { useEffect, useState } from "react";
import axios from "axios";
import "./OurProjects.css";

/* 🔥 Category Names */
const wallpaperCategories = [
  "Living Room",
  "Master Bedroom",
  "Kids Bedroom",
  "Ceiling Wallpapers",
  "Commercial Wallpapers",
  "Personalized Wallpapers",
  "TV Unit"
];

/* 🔥 Reusable Section Component */
function WallpaperSection({ title, images }) {
  return (
    <div className="wallpaper-section">

      <h2 className="section-title">{title}</h2>

      {/* Hero Image */}
      {images[0] && (
        <div className="hero-row">
          <img src={images[0].download_url} alt={title} />
        </div>
      )}

      {/* Horizontal Row - 10 Images */}
      <div className="horizontal-row">
        {images.slice(1, 12).map((item) => (
          <img key={item.id} src={item.download_url} alt="" />
        ))}
      </div>

    </div>
  );
}

export default function Wallpapers() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await axios.get(
        "https://picsum.photos/v2/list?page=2&limit=100"
      );
      setData(res.data);
    };

    fetchImages();
  }, []);

  return (
    <div className="projects-container">

      {/* 🔴 TOP CATEGORY MENU */}
      <div className="top-category-menu">
        {wallpaperCategories.map((category, index) => (
          <button key={index}>{category}</button>
        ))}
      </div>

      {/* 🔴 REPEATED SECTIONS */}
      {wallpaperCategories.map((category, index) => {

        const start = index * 12;
        const end = start + 12;

        return (
          <WallpaperSection
            key={index}
            title={category}
            images={data.slice(start, end)}
          />
        );
      })}

    </div>
  );
}
