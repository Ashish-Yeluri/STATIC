import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./OurProjects.css";

export default function OurProjects() {

  const { category } = useParams();

  // 🔥 convert to lowercase to avoid case issue
  
  const currentCategory = category?.toLowerCase();
  const [subCategory, setSubCategory] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentCategory, subCategory]);

  const fetchData = async () => {
    try {
      let url = "";

      if (currentCategory === "wallpapers") {
        url = "https://picsum.photos/v2/list?page=2&limit=6";
      } 
      else if (currentCategory === "blinds") {
        url = "https://dummyjson.com/products/category/smartphones";
      } 
      else if (currentCategory === "curtains") {
        url = "https://picsum.photos/v2/list?page=2&limit=6";
      } 
      else if (currentCategory === "upholstery") {
        url = "https://picsum.photos/v2/list?page=3&limit=6";
      }

      if (!url) return; // safety check

      const res = await axios.get(url);

      if (currentCategory === "blinds") {
        setData(res.data.products);
      } else {
        setData(res.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const showHorizontalMenu =
    currentCategory === "wallpapers" ||
    currentCategory === "blinds";

  return (
    <div className="projects-container">

      <h1 className="projects-title">
        {currentCategory?.toUpperCase()}
      </h1>

      {showHorizontalMenu && (
        <div className="horizontal-menu">
          <button onClick={() => setSubCategory("one")}>Type 1</button>
          <button onClick={() => setSubCategory("two")}>Type 2</button>
          <button onClick={() => setSubCategory("three")}>Type 3</button>
        </div>
      )}

      <div className={`projects-grid ${showHorizontalMenu ? "grid-box" : "full-image"}`}>

        {data.length > 0 ? (
          data.map((item, index) => {

            let imageUrl = "";

            if (currentCategory === "wallpapers") {
              imageUrl = item.url; // ✅ correct field
            } 
            else if (currentCategory === "blinds") {
              imageUrl = item.thumbnail;
            } 
            else if (
              currentCategory === "curtains" ||
              currentCategory === "upholstery"
            ) {
              imageUrl = item.download_url;
            }

            return (
              <div key={index} className="project-card">
                <img src={imageUrl} alt="project" />
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: "center" }}>Loading...</p>
        )}

      </div>
    </div>
  );
}
