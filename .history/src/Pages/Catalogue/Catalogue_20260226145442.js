import catalogueData from "../../Data/CatalogueData.json";
import "./Catalogue.css";

export default function Catalogue() {
  return (
    <div className="catalogue-page">

      {/* HERO */}
      <div className="catalogue-hero">
        <h1>
          {catalogueData.hero.line1} <br />
          {catalogueData.hero.line2}
        </h1>
      </div>

      {/* GRID */}
      <div className="catalogue-grid">
        {catalogueData.items.map((item) => (
          <a
            key={item.id}
            href={item.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="catalogue-card"
          >
            <img src={item.image} alt={item.title} />
          </a>
        ))}
      </div>

    </div>
  );
}
