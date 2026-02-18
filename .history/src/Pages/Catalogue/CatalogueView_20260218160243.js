import { useLocation } from "react-router-dom";
import "./Catalogue.css";

export default function CatalogueView() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const images = JSON.parse(params.get("images") || "[]");

  return (
    <div className="catalogue-view">
      <h1>Collection Gallery</h1>

      <div className="catalogue-view-grid">
        {images.map((img, index) => (
          <img key={index} src={img} alt="Gallery" />
        ))}
      </div>
    </div>
  );
}
