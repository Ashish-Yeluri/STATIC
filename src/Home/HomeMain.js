import { useCallback, useEffect, useRef, useState } from 'react';

import './Home.css';
import homeData from '../Data/Home.json';
import clientsData from '../Data/Home.json';
import aboutData from '../Data/Home.json';
import catalogueData from '../Data/Home.json';
import data from '../Data/Home.json';
import { useNavigate } from 'react-router-dom';

export default function HomeMain({ image, text }) {

  const sliderImages = homeData.slider.map((item) => item.src);
  const totalSlides  = sliderImages.length;

  const [current, setCurrent] = useState(0);
  const intervalRef           = useRef(null);

  const startAutoSlide = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 3000);
  }, [totalSlides]);

  useEffect(() => {
    if (totalSlides > 0) startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [totalSlides, startAutoSlide]);

  const nextSlide = () => {
    clearInterval(intervalRef.current);
    setCurrent((prev) => (prev + 1) % totalSlides);
    startAutoSlide();
  };

  const prevSlide = () => {
    clearInterval(intervalRef.current);
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
    startAutoSlide();
  };

  const imageRef2 = useRef(null);
  const textRef2  = useRef(null);

  const [modalLogo, setModalLogo] = useState(null);
  const openModal  = (logo) => setModalLogo(logo);
  const closeModal = () => setModalLogo(null);

  const { image: aboutImage, heading: aboutHeading, description: aboutDescription } = aboutData.about;
  const { image: parallaxImage2, text: parallaxText2 } = data.parallaxSectionTwo;
  const { image: catalogueImage, heading: catalogueHeading, description: catalogueDescription } = catalogueData.catalogueSection;

  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);

  const categoryImages = homeData.categories.map((item) => item);

  const navigate = useNavigate();
  const handleExplore = () => navigate('/catalogue');

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef2.current || !textRef2.current) return;
      const wrapper  = imageRef2.current.parentElement;
      const rect     = wrapper.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      imageRef2.current.style.transform = `translate3d(0,${progress * 300 * 1.6}px,0) scale(1.2)`;
      textRef2.current.style.transform  = `translate(-50%,-50%)`;
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rawReviews = data.googleReviewsSection?.reviews || [];
  const reviews    = rawReviews.length > 0 ? [...rawReviews, rawReviews[0]] : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewIntervalRef               = useRef(null);

  const stopReviewAutoSlide = useCallback(() => {
    if (reviewIntervalRef.current) clearInterval(reviewIntervalRef.current);
  }, []);

  const startReviewAutoSlide = useCallback(() => {
    stopReviewAutoSlide();
    reviewIntervalRef.current = setInterval(() => setCurrentIndex((p) => p + 1), 3000);
  }, [stopReviewAutoSlide]);

  useEffect(() => {
    if (reviews.length === 0) return;
    startReviewAutoSlide();
    return () => stopReviewAutoSlide();
  }, [reviews.length, startReviewAutoSlide, stopReviewAutoSlide]);

  const handleReviewTransitionEnd = () => {
    if (currentIndex === reviews.length - 1) {
      const track = document.querySelector('.review-inner');
      if (!track) return;
      track.style.transition = 'none';
      setCurrentIndex(0);
      requestAnimationFrame(() => {
        track.style.transform = 'translateX(0%)';
        requestAnimationFrame(() => { track.style.transition = 'transform 0.8s ease-in-out'; });
      });
    }
  };

  const handleNext = () => {
    stopReviewAutoSlide();
    setCurrentIndex((p) => p + 1);
    startReviewAutoSlide();
  };
  const handlePrev = () => {
    stopReviewAutoSlide();
    setCurrentIndex((p) => (p === 0 ? rawReviews.length - 1 : p - 1));
    startReviewAutoSlide();
  };

  return (
    <div>

      {/* ══════════ SLIDER — crossfade, no translate ══════════ */}
      <div className='slider'>
        {sliderImages.map((src, i) => (
          <img
            key={i}
            src={process.env.PUBLIC_URL + src}
            className={`slide-image${i === current ? ' slide-active' : ''}`}
            alt={`slide-${i}`}
          />
        ))}

        <div className='slider-controls'>
          <button onClick={prevSlide}>&#8249;</button>
          <button onClick={nextSlide}>&#8250;</button>
        </div>

        <div className='slider-dots'>
          {sliderImages.map((_, i) => (
            <span
              key={i}
              className={`slider-dot${i === current ? ' dot-active' : ''}`}
              onClick={() => {
                clearInterval(intervalRef.current);
                setCurrent(i);
                startAutoSlide();
              }}
            />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className='categories-wrapper'>
        {categoryImages.map((item) => (
          <div key={item.id} className='category-item'>
            <div className='category-circle'>
              <img src={process.env.PUBLIC_URL + item.src} alt={item.title} className='category-image' />
            </div>
            <p className='category-text'>
              {item.title.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </p>
          </div>
        ))}
      </div>

      {/* Catalogue */}
      <div className='catalogue-section'>
        <div className='catalogue-image'>
          <img src={process.env.PUBLIC_URL + catalogueImage} alt='Catalogue Wall' />
        </div>
        <div className='catalogue-content'>
          <h2 className='catalogue-heading'>{catalogueHeading}</h2>
          <p className='catalogue-description'>{catalogueDescription}</p>
          <button className='catalogue-button' onClick={handleExplore}>Explore Catalogue</button>
        </div>
      </div>

      {/* Overview */}
      <section className='overview-section'>
        <h2 className='overview-title'>{data.title}</h2>
        <div className='overview-grid'>
          {data.items.map((item, index) => (
            <div className='overview-card' key={index}>
              <img src={process.env.PUBLIC_URL + item.image} alt={item.label} className='overview-image' />
              <p className='overview-label'>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <div className='about-section'>
        <div className='about-image'>
          <img src={process.env.PUBLIC_URL + aboutImage} alt='About Design Walls' />
        </div>
        <div className='about-content'>
          <h2 className='about-heading'>{aboutHeading}</h2>
          <p className='about-description'>
            {expanded ? aboutDescription : aboutDescription.split('\n').slice(0, 2).join('\n')}
          </p>
          <button className='about-toggle' onClick={toggleExpanded}>
            {expanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>

      {/* Second Parallax */}
      <div className='parallax-wrapper'>
        <div
          ref={imageRef2}
          className='parallax-image'
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}${parallaxImage2})` }}
        />
        <div ref={textRef2} className='parallax-text'>{parallaxText2}</div>
      </div>

      {/* Clients */}
      <div className='client'>
        <h2 className='clientHead'>Clients</h2>
        <div className='clients-wrapper'>
          {clientsData.clients.map((client) => (
            <div key={client.id} className='client-logo' onClick={() => openModal(client.logo)}>
              <img src={process.env.PUBLIC_URL + client.logo} alt={client.name} />
            </div>
          ))}
          {modalLogo && (
            <div className='modal-overlay' onClick={closeModal}>
              <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <img src={process.env.PUBLIC_URL + modalLogo} alt='Client Logo' />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Google Reviews */}
      <section className='reviews-section'>
        <h2 className='reviews-title'>{data.googleReviewsSection?.title}</h2>
        <div className='review-slider-container'>
          {currentIndex > 0 && (
            <button className='review-arrow left' onClick={handlePrev}>❮</button>
          )}
          <div className='review-card-wrapper'>
            <div
              className='review-inner'
              onTransitionEnd={handleReviewTransitionEnd}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
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
          <button className='review-arrow right' onClick={handleNext}>❯</button>
        </div>
      </section>

    </div>
  );
}
