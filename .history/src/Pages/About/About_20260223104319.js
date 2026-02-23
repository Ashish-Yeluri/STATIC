import { useState, useRef, useEffect } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaPinterestP,
} from "react-icons/fa";

import hero from "../About/Main.avif";
import AboutBox from "../../Data/AboutBox.json";
import "./About.css";

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState(null);

  const sliderRef = useRef(null);
  const wheelLock = useRef(false);

  const visibleCount = 4;

  const nextSlide = () => {
    if (currentIndex < AboutBox.teamImages.length - visibleCount) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();

      if (wheelLock.current) return;
      wheelLock.current = true;

      if (e.deltaX > 0) {
        setCurrentIndex((prev) =>
          Math.min(prev + 1, AboutBox.teamImages.length - visibleCount)
        );
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => (wheelLock.current = false), 400);
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });
    return () => slider.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="about-page">
      {/* HERO */}
      <div
        className="about-hero"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="about-overlay">
          <h1 className="about-title">
            About <br /> Design Walls
          </h1>

          <div className="about-socials">
            <FaInstagram />
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
            <FaYoutube />
            <FaPinterestP />
          </div>
        </div>
      </div>

      {/* BOXES */}
      <div className="about-box-wrapper">
        {AboutBox.content.map((item) => (
          <div key={item.id} className="about-box">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      {/* TEAM */}
      <div className="team-section">
        <h2 className="section-title">Team Design Walls</h2>

        <div className="team-slider">
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="slider-arrow arrow-left"
            >
              ‹
            </button>
          )}

          <div ref={sliderRef} className="slider-window">
            <div
              className="slider-track"
              style={{
                transform: `translateX(-${currentIndex * 25}%)`,
              }}
            >
              {AboutBox.teamImages.map((member, index) => (
                <div key={member.id} className="team-card">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-image"
                    draggable={false}
                    onClick={() => setPreviewIndex(index)}
                  />
                  <h4 className="team-name">{member.name}</h4>
                </div>
              ))}
            </div>

            {/* MODAL */}
            {previewIndex !== null && (
              <div
                className="image-modal"
                onClick={() => setPreviewIndex(null)}
              >
                <span className="close-btn">×</span>

                {previewIndex > 0 && (
                  <button
                    className="modal-arrow modal-left"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewIndex((p) => p - 1);
                    }}
                  >
                    ‹
                  </button>
                )}

                <img
                  src={AboutBox.teamImages[previewIndex].image}
                  alt="Full"
                  className="full-image"
                  onClick={(e) => e.stopPropagation()}
                />

                {previewIndex <
                  AboutBox.teamImages.length - 1 && (
                  <button
                    className="modal-arrow modal-right"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewIndex((p) => p + 1);
                    }}
                  >
                    ›
                  </button>
                )}
              </div>
            )}
          </div>

          <button
            onClick={nextSlide}
            className="slider-arrow arrow-right"
          >
            ›
          </button>
        </div>
      </div>

      {/* AWARDS */}
      <div className="awards-section">
        <h2 className="section-title">
          AWARDS & RECOGNITIONS
        </h2>

        <div className="awards-grid">
          {AboutBox.awardImages.map((item, i) => (
            <div key={i} className="award-card">
              <img src={item.image} alt="Award" />
            </div>
          ))}
        </div>
      </div>

      {/* BIG BASH */}
      <div className="bigbash-section">
        <h2 className="section-title">Big Bash</h2>

        <p className="bigbash-text">
          The jersey launch was a Big BASH! The event was
          absolutely incredible in every way, and each year
          the vibe and enthusiasm for the event increases.
          We delightfully sponsored the Man of Match and
          Man of the Series for the BIG BASH 2022
        </p>

        <div className="bigbash-grid">
          {AboutBox.bigBash.map((bash, i) => (
            <div key={i} className="bigbash-card">
              <img src={bash.image} alt={bash.name} />
            </div>
          ))}
        </div>
        <P></P>
      </div>
    </div>
  );
}