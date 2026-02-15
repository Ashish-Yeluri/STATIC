import "./OurProjects.css";
import projectsData from "../../Data/OurProjectsData.json";

function WallpaperSection({ title, hero, images }) {
  return (
    <div className="wallpaper-section">

      <h2 className="section-title">{title}</h2>

      {/* Hero Image */}
      <div className="hero-row">
        <img src={hero} alt={title} />
      </div>

      {/* 10 Images */}
      <div className="horizontal-row">
        {images.map((img, index) => (
          <img key={index} src={img} alt="" />
        ))}
      </div>

    </div>
  );
}

export default function Wallpapers() {

  const wallpaperSections = projectsData.wallpapers;

  return (
    <div className="projects-container">

      {/* 🔴 TOP CATEGORY MENU */}
      <div className="top-category-menu">
        {wallpaperSections.map((section, index) => (
          <button key={index}>{section.title}</button>
        ))}
      </div>

      {/* 🔴 SECTIONS FROM JSON */}
      {wallpaperSections.map((section, index) => (
        <WallpaperSection
          key={index}
          title={section.title}
          hero={section.hero}
          images={section.images}
        />
      ))}

    </div>
  );
}
