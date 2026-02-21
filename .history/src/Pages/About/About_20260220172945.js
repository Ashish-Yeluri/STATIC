import { useState, useRef, useEffect } from 'react';
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaPinterestP,
} from 'react-icons/fa';


import hero from '../About/Main.avif';
import AboutBox from '../../Data/AboutBox.json';
import "./About.css"

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
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
          Math.min(prev + 1, AboutBox.teamImages.length - visibleCount),
        );
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => {
        wheelLock.current = false;
      }, 400);
    };

    slider.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      slider.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <div style={{ ...styles.hero, backgroundImage: `url(${hero})` }}>
        <div style={styles.overlay}>
          <h1 style={{ fontSize: '60px' }}>
            About <br />
            Design Walls
          </h1>

          <div style={styles.socials}>
            <FaInstagram />
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
            <FaYoutube />
            <FaPinterestP />
          </div>
        </div>
      </div>

      {/* Content Boxes */}
      <div style={styles.boxWrapper}>
        {AboutBox.content.map((item) => (
          <div key={item.id} style={styles.box}>
            <h3 style={styles.boxText}>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      {/* TEAM SLIDER */}
      <div style={styles.teamSection}>
        <h2 style={{ textAlign: 'center', color: 'red', fontSize: '30px' }}>
          Team Design Walls
        </h2>

        <div style={styles.slider}>
          {currentIndex > 0 && (
            <button onClick={prevSlide} style={styles.arrowLeft}>
              ‹
            </button>
          )}

          <div ref={sliderRef} style={styles.sliderWindow}>
            <div
              style={{
                ...styles.sliderTrack,
                transform: `translateX(-${currentIndex * 25}%)`,
              }}
            >
              {AboutBox.teamImages.map((member, index) => (
                <div key={member.id} style={styles.teamCard}>
                  <img
                    src={member.image}
                    alt={member.name}
                    draggable={false}
                    style={{
                      ...styles.teamImage,
                      ...(hoveredId === member.id ? styles.teamImageHover : {}),
                    }}
                    onMouseEnter={() => setHoveredId(member.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setPreviewIndex(index)}
                  />
                  <h4 style={styles.teamName}>{member.name}</h4>
                </div>
              ))}
            </div>

            {previewIndex !== null && (
              <div
                style={styles.imageModal}
                onClick={() => setPreviewIndex(null)}
              >
                {/* Close */}
                <span style={styles.closeBtn}>×</span>

                {/* Left Arrow */}
                {previewIndex > 0 && (
                  <button
                    style={styles.modalArrowLeft}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewIndex((prev) => prev - 1);
                    }}
                  >
                    ‹
                  </button>
                )}

                {/* Image */}
                <img
                  src={AboutBox.teamImages[previewIndex].image}
                  alt='Full View'
                  style={styles.fullImage}
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Right Arrow */}
                {previewIndex < AboutBox.teamImages.length - 1 && (
                  <button
                    style={styles.modalArrowRight}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewIndex((prev) => prev + 1);
                    }}
                  >
                    ›
                  </button>
                )}
              </div>
            )}
          </div>

          <button onClick={nextSlide} style={styles.arrowRight}>
            ›
          </button>
        </div>
      </div>

      {/* AWARDS */}
      <div style={styles.awardsSection}>
        <h2 style={{ textAlign: 'center', color: 'red', fontSize: '30px' }}>
          AWARDS & RECOGNITIONS
        </h2>

        <div style={styles.awardsGrid}>
          {AboutBox.awardImages.map((item, index) => (
            <div key={index} style={styles.awardCard}>
              <img
                src={item.image}
                alt='Award'
                style={styles.awardImage}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = 'scale(1.08)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = 'scale(1)')
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* BIG BASH */}
      {/* BIG BASH */}
      <div style={styles.bigBashSection}>
        <h2 style={{ textAlign: 'center', color: 'red', fontSize: '30px' }}>
          Big Bash
        </h2>

        <p style={styles.bigBashText}>
          The jersey launch was a Big BASH! The event was absolutely incredible
          in every way, and each year the vibe and enthusiasm for the event
          increases. We delightfully sponsored the Man of Match and Man of the
          Series for the BIG BASH 2022
        </p>

        <div style={styles.bigBashGrid}>
          {AboutBox.bigBash.map((bash, index) => (
            <div key={index} style={styles.bigBashCard}>
              <img
                src={bash.image}
                alt={bash.name}
                style={styles.bigBashImage}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform =
                    'scale(0.92) translateZ(-40px)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = 'scale(1) translateZ(0)')
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


