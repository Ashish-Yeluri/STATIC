import { useEffect, useState } from "react";
import axios from "axios";
import "./OurProjects.css";

export default function Upholstery() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await axios.get(
        "https://picsum.photos/v2/list?page=5&limit=11"
      );
      setData(res.data);
    };

    fetchImages();
  }, []);

  return (
    <div className="projects-container">

      {/* 🔴 CENTER HEADING */}
      <h1 className="curtain-heading">UPHOLSTERY</h1>

      {/* 🔴 HERO IMAGE */}
      {data[0] && (
        <div className="hero-row">
          <img src={data[0].download_url} alt="Upholstery Hero" />
        </div>
      )}

      {/* 🔴 10 IMAGES */}
      <div className="horizontal-row">
        {data.slice(1, 11).map((item) => (
          <img key={item.id} src={item.download_url} alt="" />
        ))}
      </div>

    </div>
  );
}
