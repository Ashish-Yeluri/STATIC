import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./OurProjects.css";

export default function OurProjects() {

  const { category } = useParams();
  const currentCategory = category?.toLowerCase();

  const [subCategory, setSubCategory] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        let url = "";

        // Wallpapers, Curtains, Upholstery → Picsum API
        if (
          currentCategory === "wallpapers" ||
          currentCategory === "curtains"
        ) {
          url = "https://picsum.photos/v2/list?page=2&limit=8";
        } 
        else if(){

        } 
        else if (currentCategory === "upholstery") {
          url = "https://picsum.photos/v2/list?page=3&limit=8";
        } 
        else if (currentCategory === "blinds") {
          url = "https://dummyjson.com/products/category/smartphones";
        }

        if (!url) return;

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

    fetchData();

  }, [currentCategory, subCategory]);

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

            if (
              currentCategory === "wallpapers" ||
              currentCategory === "curtains" ||
              currentCategory === "upholstery"
            ) {
              imageUrl = item.download_url; // Picsum field
            } 
            else if (currentCategory === "blinds") {
              imageUrl = item.thumbnail; // DummyJSON field
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
