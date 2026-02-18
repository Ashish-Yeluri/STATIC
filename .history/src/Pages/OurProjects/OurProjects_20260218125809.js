import { useParams } from "react-router-dom";
import { useRef } from "react";
import projectsData from "../../Data/OurProjectsData.json";
import "./OurProjects.css";

import { useState,use} from "react";

function ProjectSection({ title, hero, images, sectionRef }) {

  // current hero image state
  const [currentHero, setCurrentHero] = useState(hero);

  // handle click on thumbnails
  const handleImageClick = (img) => {
    setCurrentHero(img);
  };

  return (
    <div className="wallpaper-section" ref={sectionRef}>

      <h2 className="section-title">{title}</h2>

      {/* HERO */}
      <div className="hero-row">
        <img src={currentHero} alt={title} />
      </div>

      {/* THUMBNAILS */}
      <div className="horizontal-row">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            onClick={() => handleImageClick(img)}
            style={{ cursor: "pointer" }}
          />
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
   <div
    className={`projects-container ${
      currentCategory === "wallpapers" ||
      currentCategory === "blinds"
        ? "with-menu-gap"
        : "no-menu-gap"
    }`}
  >

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
