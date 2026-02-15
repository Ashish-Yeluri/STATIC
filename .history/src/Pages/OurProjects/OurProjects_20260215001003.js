import { useParams } from "react-router-dom";
import projectsData from "./OurProjectsData.json";
import "./OurProjects.css";

function ProjectSection({ title, hero, images }) {
  return (
    <div className="wallpaper-section">

      <h2 className="section-title">{title}</h2>

      {/* Hero */}
      <div className="hero-row">
        <img src={hero} alt={title} />
      </div>

      {/* Images */}
      <div className="horizontal-row">
        {images.map((img, index) => (
          <img key={index} src={img} alt="" />
        ))}
      </div>

    </div>
  );
}

export default function OurProjects() {

  const { category } = useParams();
  const currentCategory = category?.toLowerCase();

  const selectedData = projectsData[currentCategory];

  if (!selectedData) return null;

  return (
    <div className="projects-container">

      {/* Top Menu */}
      <div className="top-category-menu">
        {selectedData.map((section, index) => (
          <button key={index}>{section.title}</button>
        ))}
      </div>

      {/* Sections */}
      {selectedData.map((section, index) => (
        <ProjectSection
          key={index}
          title={section.title}
          hero={section.hero}
          images={section.images}
        />
      ))}

    </div>
  );
}
