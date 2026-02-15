import { useEffect, useState } from "react";
import axios from "axios";
import "./Catalogue.css";

export default function Catalogue() {

  const [catalogues, setCatalogues] = useState([]);

  useEffect(() => {
    const fetchCatalogues = async () => {
      try {
        // Using Picsum API for demo images
        const res = await axios.get(
          "https://picsum.photos/v2/list?page=4&limit=8"
        );

        setCatalogues(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCatalogues();
  }, []);

  return (
    <div className="catalogue-page">

      {/* 🔴 HERO SECTION */}
      <div className="catalogue-hero">
        <h1>
          Elevate Your Space with Our <br />
          Elegant Wallpaper Collection
        </h1>
      </div>

      {/* 🔥 GRID SECTION */}
      <div className="catalogue-grid">
        {catalogues.map((item, index) => (
          <div key={index} className="catalogue-card">
            <img src={item.download_url} alt="catalogue" />
            <h3>{item.author}</h3>
          </div>
        ))}
      </div>

    </div>
  );
}
