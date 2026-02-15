import { useParams } from "react-router-dom";
import { useRef } from "react";
import projectsData from "../../Data/OurProjectsData.json";
import "./OurProjects.css";

function ProjectSection({ title, hero, images, sectionRef }) {
  return (
    <div className="wallpaper-section" ref={sectionRef}>

      <h2 className="section-title">{title}</h2>

      <div className="hero-row">
        <img src={hero} alt={title} />
      </div>

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

  const sectionRefs = useRef([]);

  if (!selectedData) return null;

  const showTopMenu =
    currentCategory === "wallpapers" ||
    currentCategory === "blinds";

  const scrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <div className="projects-container">

      {/* 🔴 TOP MENU */}
      {showTopMenu && (
        <div className="top-category-menu">
          {selectedData.map((section, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
            >
              {section.title}
            </button>
          ))}
        </div>
      )}

      {/* 🔴 SECTIONS */}
      {selectedData.map((section, index) => (
        <ProjectSection
          key={index}
          title={section.title}
          hero={section.hero}
          images={section.images}
          sectionRef={(el) => (sectionRefs.current[index] = el)}
        />
      ))}

    </div>
  );
}
