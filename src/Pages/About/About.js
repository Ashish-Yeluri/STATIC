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
      // Only horizontal trackpad movement
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;

      e.preventDefault();

      if (wheelLock.current) return;
      wheelLock.current = true;

      if (e.deltaX > 0) {
        // swipe left → move right
        setCurrentIndex((prev) =>
          Math.min(prev + 1, AboutBox.teamImages.length - visibleCount),
        );
      } else {
        // swipe right → move left
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => {
        wheelLock.current = false;
      }, 400); // throttle
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
          <h1>About Us | Design Walls | Hyderabad</h1>
          <p>about design walls</p>

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
        <h2>Team Design Walls</h2>

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
              {AboutBox.teamImages.map((member) => (
                <div key={member.id} style={styles.teamCard}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={styles.teamImage}
                    draggable={false}
                  />
                  <h4 style={styles.teamName}>{member.name}</h4>
                </div>
              ))}
            </div>
          </div>

          <button onClick={nextSlide} style={styles.arrowRight}>
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {},

  hero: {
    height: '450px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },

  overlay: {
    backgroundColor: 'rgba(206, 66, 66, 0.6)',
    color: '#fff',
    height: '330px',
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
    width: '17%',
    backgroundColor: '#f7f7f7',
    padding: '30px',
    borderRadius: '8px',
  },

  boxText: {
    color: 'red',
    fontSize: '30px'
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
    touchAction: 'none', // ❌ disables touch swipe
    overscrollBehavior: 'none', // ❌ stops momentum scroll
  },

  sliderTrack: {
    display: 'flex',
    transition: 'transform 0.5s ease',
  },

  teamCard: {
    minWidth: '25%',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    marginRight: '30px',
    textAlign: 'center',
    overflow: 'hidden',
  },

  teamImage: {
    width: '100%',
    height: '260px',
    objectFit: 'cover',
  },

  teamName: {
    padding: '12px',
    fontWeight: '600',
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
};
