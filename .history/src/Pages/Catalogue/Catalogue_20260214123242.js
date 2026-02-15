import catalogueData from "../../Data/catalogue.json";
import "./Catalogue.css";

export default function Catalogue() {

  return (
    <div className="catalogue-page">

      {/* 🔴 HERO SECTION */}
      <div className="catalogue-hero">
        <h1>{catalogueData.hero.title}</h1>
      </div>

      {/* 🔥 GRID SECTION */}
      <div className="catalogue-grid">
        {catalogueData.items.map((item) => (
          <div key={item.id} className="catalogue-card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>

    </div>
  );
}
