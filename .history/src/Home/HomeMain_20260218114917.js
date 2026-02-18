import { useEffect, useRef, useState } from 'react';
import './Home.css';
import homeData from '../Data/Home.json';
import clientsData from '../Data/Home.json';
import brandsData from '../Data/Home.json';
import aboutData from '../Data/Home.json';
import catalogueData from '../Data/Home.json';
import data from '../Data/Home.json';
import { useNavigate } from 'react-router-dom';
 
export default function HomeMain({ image, text }) {
  // ----- Slider -----
  const [current, setCurrent] = useState(0);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const imageRef2 = useRef(null);
  const textRef2 = useRef(null);
  const trackRef = useRef(null);
  const intervalRef = useRef(null);
 
  const [modalLogo, setModalLogo] = useState(null);
 
  const openModal = (logo) => setModalLogo(logo);
  const closeModal = () => setModalLogo(null);
 
  const {
    image: aboutImage,
    heading: aboutHeading,
    description: aboutDescription,
  } = aboutData.about;
 
  const { image: parallaxImage2, text: parallaxText2 } =
    data.parallaxSectionTwo;
 
  const {
    image: catalogueImage,
    heading: catalogueHeading,
    description: catalogueDescription,
  } = catalogueData.catalogueSection;
 
  const [expanded, setExpanded] = useState(false);
 
  const toggleExpanded = () => setExpanded(!expanded);
 
  const sliderImages = homeData.slider.map((item) => item.src);
 
  // const previewText = description.split('\n').slice(0, 2).join('\n');
  // const { image, heading, description } = aboutData.about && catalogueData.catalogueSection;
  //  const { image, heading, description } = catalogueData.catalogueSection;
  const navigate = useNavigate();
 
  const handleExplore = () => {
    navigate('/catalogue');
  };
 
  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 2000);
  };
 
  useEffect(() => {
    if (sliderImages.length > 0) startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [sliderImages]);
 
  const handleTransitionEnd = () => {
    if (current === sliderImages.length) {
      trackRef.current.style.transition = 'none';
      setCurrent(0);
 
      requestAnimationFrame(() => {
        trackRef.current.style.transform = `translateX(0%)`;
        requestAnimationFrame(() => {
          trackRef.current.style.transition = 'transform 0.8s ease-in-out';
        });
      });
    }
  };
;
 
  useEffect(() => {
    if (current === 0 && trackRef.current) {
      requestAnimationFrame(() => {
        trackRef.current.style.transition = 'transform 0.8s ease-in-out';
      });
    }
  }, [current]);
 
  const nextSlide = () => {
    clearInterval(intervalRef.current);
    setCurrent((prev) => prev + 1);
    startAutoSlide();
  };
 
  const prevSlide = () => {
    clearInterval(intervalRef.current);
    setCurrent((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
    startAutoSlide();
  };
 
  // ----- Categories -----
  const categoryImages = homeData.categories.map((item) => item);
 
  // Big Image
 
  const { image: parallaxImage, text: parallaxText } = data.parallaxSection;
 
  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current || !textRef.current) return;
 
      const wrapper = imageRef.current.parentElement;
      const rect = wrapper.getBoundingClientRect();
 
      // how much of section is visible
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
 
      const speed = 1.6; // ⬅️ increase for faster motion
 
      const imageMove = progress * 300 * speed;
      const textMove = progress * 0;
 
      imageRef.current.style.transform = `translate3d(0, ${imageMove}px, 0) scale(1.2)`;
 
      textRef.current.style.transform = `translate(-50%, -50%) translateY(${textMove}px)`;
    };
 
    handleScroll(); // ✅ sync after mount
    window.addEventListener('scroll', handleScroll, { passive: true });
 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 
  // BIG IMAGE2
  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef2.current || !textRef2.current) return;
 
      const wrapper = imageRef2.current.parentElement;
      const rect = wrapper.getBoundingClientRect();
 
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
 
      const speed = 1.6;
 
      const imageMove = progress * 300 * speed;
 
      imageRef2.current.style.transform = `translate3d(0, ${imageMove}px, 0) scale(1.2)`;
      textRef2.current.style.transform = `translate(-50%, -50%)`;
    };
 
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 
  // // //REVIEWS
  const rawReviews = data.googleReviewsSection?.reviews || [];
  const reviews =
    rawReviews.length > 0
      ? [...rawReviews, rawReviews[0]] // clone first slide
      : [];;
 
 
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewIntervalRef = useRef(null);
  // ---- AUTO SLIDE ----
 useEffect(() => {
   if (reviews.length === 0) return;
 
   startReviewAutoSlide();
   return () => stopReviewAutoSlide();
 });
 
 const startReviewAutoSlide = () => {
   stopReviewAutoSlide();
   reviewIntervalRef.current = setInterval(() => {
     setCurrentIndex((prev) => prev + 1);
   }, 3000);
 };
 
 const stopReviewAutoSlide = () => {
   if (reviewIntervalRef.current) {
     clearInterval(reviewIntervalRef.current);
   }
  };
 
 
  const handleReviewTransitionEnd = () => {
    // If we reached the cloned slide
    if (currentIndex === reviews.length - 1) {
      const track = document.querySelector('.review-inner');
      if (!track) return;
 
      track.style.transition = 'none';
      setCurrentIndex(0);
 
      requestAnimationFrame(() => {
        track.style.transform = 'translateX(0%)';
        requestAnimationFrame(() => {
          track.style.transition = 'transform 0.8s ease-in-out';
        });
      });
    }
  };
 
 
 
  // ---- BUTTON HANDLERS ----
  const handleNext = () => {
    stopReviewAutoSlide();
    setCurrentIndex((prev) => prev + 1);
    startReviewAutoSlide();
  };
 
  const handlePrev = () => {
    stopReviewAutoSlide();
    setCurrentIndex((prev) => (prev === 0 ? rawReviews.length - 1 : prev - 1));
    startReviewAutoSlide();
  };
 
 
  return (
    <div>
      {/* Slider */}
      <div className='slider'>
        <div
          ref={trackRef}
          className='slider-track'
          style={{
            width: `${(sliderImages.length + 1) * 100}%`,
            transform: `translateX(-${current * (100 / (sliderImages.length + 1))}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {sliderImages.map((src, i) => (
            <img
              key={i}
              src={process.env.PUBLIC_URL + src}
              className='slide-image'
              alt={`slide-${i}`}
            />
          ))}
          <img
            src={process.env.PUBLIC_URL + sliderImages[0]}
            className='slide-image'
            alt='slide-clone'
          />
        </div>
        <div className='slider-controls'>
          <button onClick={prevSlide} style={{ marginTop: '70px' }}>
            &lt;
          </button>
          <button onClick={nextSlide} style={{ marginTop: '70px' }}>
            &gt;
          </button>
        </div>
      </div>
 
      {/* Categories */}
      <div className='categories-wrapper'>
        {categoryImages.map((item) => (
          <div key={item.id} className='category-item'>
            <div className='category-circle'>
              <img src={item.src} alt={item.title} className='category-image' />
            </div>
            <p className='category-text'>
              {item.title.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
 
      {/* Catelouge */}
      <div className='catalogue-section'>
        <div className='catalogue-image'>
          <img src={catalogueImage} alt='Catalogue Wall' />
        </div>
 
        <div className='catalogue-content'>
          <h2 className='catalogue-heading'>{catalogueHeading}</h2>
          <p className='catalogue-description'>{catalogueDescription}</p>
          <button className='catalogue-button' onClick={handleExplore}>
            Explore Catalogue
          </button>
        </div>
      </div>
 
      {/* OVER-VIEW */}
      <section
        className='overview-section'
        style={{
          '--top-scratch': `url(${process.env.PUBLIC_URL}/Images/Home/scratch1.png)`,
          '--bottom-scratch': `url(${process.env.PUBLIC_URL}/Images/Home/scratch2.png)`,
        }}
      >
        <h2 className='overview-title'>{data.title}</h2>
 
        <div className='overview-grid'>
          {data.items.map((item, index) => (
            <div className='overview-card' key={index}>
              <img
                src={process.env.PUBLIC_URL + item.image}
                alt={item.label}
                className='overview-image'
              />
              <p className='overview-label'>{item.label}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* PARALLAX SECTION */}
      <div className='parallax-wrapper'>
        <div
          ref={imageRef}
          className='parallax-image'
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}${parallaxImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div ref={textRef} className='parallax-text'>
          {parallaxText}
        </div>
      </div>
 
      {/* Design Image */}
      <div className='about-section'>
        <div className='about-image'>
          <img src={aboutImage} alt='About Design Walls' />
        </div>
 
        <div className='about-content'>
          <h2 className='about-heading'>{aboutHeading}</h2>
          <p className='about-description'>
            {expanded
              ? aboutDescription
              : aboutDescription.split('\n').slice(0, 2).join('\n')}
          </p>
 
          <button className='about-toggle' onClick={toggleExpanded}>
            {expanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
 
      {/* YOUTUBE */}
      <section className='youtube-section'>
        <div className='youtube-header'>
          <h2 className='youtube-title'>{data.youtube.heading}</h2>
 
          <a
            href={data.youtube.viewMoreLink}
            target='_blank'
            rel='noreferrer'
            className='youtube-button'
          >
            View More
          </a>
        </div>
 
        <div className='youtube-videos'>
          {data.youtube.videos.map((video) => (
            <div className='youtube-video' key={video.id}>
              <iframe
                src={`https://www.youtube.com/embed/${video.embedId}`}
                title='YouTube video'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </section>
 
      {/* Brands */}
      <div className='brands'>
        <h1 className='clientHead'>Brands</h1>
        <div className='brands-wrapper-container'>
          <div className='brands-content'>
            <div className='brands-wrapper'>
              {brandsData.brands.map((brand) => (
                <div
                  key={brand.id}
                  className='brand-logo'
                  onClick={() => openModal(brand.logo)}
                >
                  <img src={brand.logo} alt={brand.name} />
                </div>
              ))}
            </div>
          </div>
 
          {modalLogo && (
            <div className='modal-overlay' onClick={closeModal}>
              <div
                className='modal-content'
                onClick={(e) => e.stopPropagation()}
              >
                <img src={modalLogo} alt='Brand Logo' />
              </div>
            </div>
          )}
        </div>
      </div>
 
      {/* 2nd Big Image */}
      {/* SECOND PARALLAX SECTION */}
      <div className='parallax-wrapper'>
        <div
          ref={imageRef2}
          className='parallax-image'
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}${parallaxImage2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div ref={textRef2} className='parallax-text'>
          {parallaxText2}
        </div>
      </div>
 
      {/* CLIENTS */}
      <div className='client'>
        <h2 className='clientHead'>Clients</h2>
        <div className='clients-wrapper'>
          {clientsData.clients.map((client) => (
            <div
              key={client.id}
              className='client-logo'
              onClick={() => openModal(client.logo)}
            >
              <img src={client.logo} alt={client.name} />
            </div>
          ))}
 
          {modalLogo && (
            <div className='modal-overlay' onClick={closeModal}>
              <div
                className='modal-content'
                onClick={(e) => e.stopPropagation()}
              >
                <img src={modalLogo} alt='Client Logo' />
              </div>
            </div>
          )}
        </div>
      </div>
 
      {/* GOOGLE REVIEWS */}
      <section
        className='reviews-section'
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}${data.googleReviewsSection?.background})`,
        }}
      >
        <h2 className='reviews-title'>{data.googleReviewsSection?.title}</h2>
 
        <div className='review-slider-container'>
          {/* LEFT ARROW – appears only after 1st slide */}
          {currentIndex > 0 && (
            <button className='review-arrow left' onClick={handlePrev}>
              ❮
            </button>
          )}
 
          {/* REVIEW CARD */}
          <div className='review-card-wrapper'>
            <div
              className='review-inner'
              onTransitionEnd={handleReviewTransitionEnd}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {reviews.map((review, idx) => (
                <div key={idx} className='review-inner-item'>
                  <div className='stars'>{'★'.repeat(review.rating)}</div>
                  <p>{review.comment}</p>
                  <div className='reviewer-name'>{review.name}</div>
                </div>
              ))}
            </div>
          </div>
 
          {/* RIGHT ARROW – always visible */}
          <button className='review-arrow right' onClick={handleNext}>
            ❯
          </button>
        </div>
      </section>
    </div>
  );
}
 
YouTube
 