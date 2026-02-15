import catalogueData from "../../Data/catalogue.json";
import "./Catalogue.css";

export default function Catalogue() {

  return (
    <div className="catalogue-page">

      <div className="catalogue-hero">
        <h1>
          Elevate Your Space with Our <br />
          Elegant Wallpaper Collection
        </h1>
      </div>

      <div className="catalogue-grid">
        {catalogueData.map((item) => (
          <div key={item.id} className="catalogue-card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>

    </div>
  );
}
