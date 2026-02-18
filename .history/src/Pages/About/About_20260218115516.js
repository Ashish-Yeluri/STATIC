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

const styles = {
  page: {
    overflowX: 'hidden',
  },
  hero: {
    height: '450px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  overlay: {
    backgroundColor: 'rgba(206, 66, 66, 0.6)',
    color: '#fff',
    height: '450px',
    padding: '60px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  socials: {
    display: 'flex',
    gap: '16px',
    fontSize: '20px',
    marginTop: '20px',
    cursor: 'pointer',
  },
  boxWrapper: {
    width: '100%',
    display: 'flex',
    gap: '30px',
    padding: '30px',
    flexWrap: 'wrap',
  },
  box: {
    width: '23%',
    backgroundColor: '#f7f7f7',
    padding: '30px',
    borderRadius: '8px',
  },
  boxText: {
    color: 'red',
    fontSize: '30px',
  },
  teamSection: {
    padding: '60px',
  },
  slider: {
    position: 'relative',
    marginTop: '30px',
  },
  sliderWindow: {
    overflow: 'hidden',
    width: '100%',
    touchAction: 'pan-y',
    overscrollBehaviorX: 'none',
  },
  sliderTrack: {
    display: 'flex',
    gap: '30px',
    transition: 'transform 0.5s ease',
  },
  teamCard: {
    flex: '0 0 25%',
    height: '400px',
    borderRadius: '8px',
    textAlign: 'center',
    overflow: 'hidden',
  },
  teamImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    cursor: 'pointer',
    transition: 'transform 1.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
  },
  teamImageHover: {
    transform: 'scale(1.08)',
  },
  teamName: {
    padding: '12px',
    fontWeight: '600',
  },
  imageModal: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },

  fullImage: {
    maxWidth: '90%',
    maxHeight: '90%',
    objectFit: 'contain',
  },

  closeBtn: {
    position: 'absolute',
    top: '25px',
    right: '40px',
    fontSize: '50px',
    color: '#fff',
    cursor: 'pointer',
    userSelect: 'none',
  },

  modalArrowLeft: {
    position: 'absolute',
    left: '30px',
    fontSize: '60px',
    background: 'transparent',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },

  modalArrowRight: {
    position: 'absolute',
    right: '30px',
    fontSize: '60px',
    background: 'transparent',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },

  arrowLeft: {
    position: 'absolute',
    left: '-40px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '28px',
    background: '#000',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 12px',
    pointerEvents: 'auto',
  },
  arrowRight: {
    position: 'absolute',
    right: '-40px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '28px',
    background: '#000',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 12px',
    pointerEvents: 'auto',
  },
  awardsSection: {
    padding: '60px',
    textAlign: 'center',
  },
  awardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  awardCard: {
    width: '100%',
    height: '200px',
    backgroundColor: '#f7f7f7',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  awardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
    cursor: 'pointer',
  },
  bigBashSection: {
    padding: '60px',
    textAlign: 'center',
  },

  bigBashText: {
    maxWidth: '900px',
    margin: '20px auto 40px',
    lineHeight: '1.7',
    fontSize: '16px',
    color: '#444',
  },

  bigBashGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px',
    maxWidth: '1100px',
    margin: '0 auto',
    perspective: '1000px',
  },

  bigBashCard: {
    height: '260px',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#f7f7f7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bigBashImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s ease',
    cursor: 'pointer',
    transformStyle: 'preserve-3d',
  },
};
