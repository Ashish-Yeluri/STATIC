import { useEffect, useState } from "react";
import axios from "axios";
import "./OurProjects.css";

export default function Blinds() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await axios.get(
        "https://picsum.photos/v2/list?page=3&limit=12"
      );
      setData(res.data);
    };

    fetchImages();
  }, []);

  return (
    <div className="projects-container">

      {data[0] && (
        <div className="hero-row">
          <img src={data[0].download_url} alt="hero" />
        </div>
      )}

      <h2 className="section-title">WINDOW BLINDS</h2>

      <div className="horizontal-row">
        {data.slice(1, 5).map((item) => (
          <img key={item.id} src={item.download_url} alt="" />
        ))}
      </div>

      <div className="grid-images">
        {data.slice(2, 12).map((item) => (
          <div key={item.id} className="grid-card">
            <img src={item.download_url} alt="" />
          </div>
        ))}
      </div>

    </div>
  );
}
