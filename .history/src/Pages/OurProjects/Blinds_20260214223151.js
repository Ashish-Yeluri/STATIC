import { useEffect, useState } from "react";
import axios from "axios";
import "./OurProjects.css";

/* 🔥 Blinds Categories */
const blindsCategories = [
  "Roller Blinds",
  "Roman Blinds",
  "Zebra Blinds",
  "Chic Blinds",
  "Venetian Blinds",
  "Customised Blinds",
  "Vertical Blinds"
];

/* 🔥 Reusable Section */
function BlindsSection({ title, images }) {
  return (
    <div className="wallpaper-section">

      <h2 className="section-title">{title}</h2>

      {/* Hero Image */}
      {images[0] && (
        <div className="hero-row">
          <img src={images[0].download_url} alt={title} />
        </div>
      )}

      {/* Horizontal Row */}
      <div className="horizontal-row">
        {images.slice(1, 10).map((item) => (
          <img key={item.id} src={item.download_url} alt="" />
        ))}
      </div>

    </div>
  );
}

export default function Blinds() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await axios.get(
        "https://picsum.photos/v2/list?page=3&limit=100"
      );
      setData(res.data);
    };

    fetchImages();
  }, []);

  return (
    <div className="projects-container">

      {/* 🔴 TOP CATEGORY MENU */}
      <div className="top-category-menu">
        {blindsCategories.map((category, index) => (
          <button key={index}>{category}</button>
        ))}
      </div>

      {/* 🔴 REPEATED SECTIONS */}
      {blindsCategories.map((category, index) => {

        const start = index * 12;
        const end = start + 12;

        return (
          <BlindsSection
            key={index}
            title={category}
            images={data.slice(start, end)}
          />
        );
      })}

    </div>
  );
}
