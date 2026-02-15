import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./OurProjects.css";

export default function OurProjects() {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  useEffect(() => {
    fetchData();
  }, [category, subCategory]);

  const fetchData = async () => {
    try {
      let url = "";

      // 🔥 Different APIs
      if (category === "wallpapers") {
        url = "https://jsonplaceholder.typicode.com/photos?_limit=8";
      } 
      else if (category === "blinds") {
        url = "https://dummyjson.com/products/category/smartphones";
      } 
      else if (category === "curtains") {
        url = "https://picsum.photos/v2/list?page=2&limit=6";
      } 
      else if (category === "upholstery") {
        url = "https://picsum.photos/v2/list?page=3&limit=6";
      }

      const res = await axios.get(url);

      if (category === "blinds") {
        setData(res.data.products);
      } else {
        setData(res.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  // Horizontal buttons only for wallpapers & blinds
  const showHorizontalMenu =
    category === "wallpapers" || category === "blinds";

  return (
    <div className="projects-container">

      {/* Page Title */}
      <h1 className="projects-title">
        {category?.toUpperCase()}
      </h1>

      {/* 🔴 Horizontal Menu */}
      {showHorizontalMenu && (
        <div className="horizontal-menu">
          <button onClick={() => setSubCategory("one")}>Type 1</button>
          <button onClick={() => setSubCategory("two")}>Type 2</button>
          <button onClick={() => setSubCategory("three")}>Type 3</button>
        </div>
      )}

      {/* 🔥 Images Section */}
      <div className={`projects-grid ${showHorizontalMenu ? "grid-box" : "full-image"}`}>
        {data.map((item, index) => (
          <div key={index} className="project-card">
            <img
              src={
                item.url || 
                item.thumbnailUrl || 
                item.thumbnail || 
                item.download_url
              }
              alt="project"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
