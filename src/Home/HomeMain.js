import { useEffect, useRef, useState } from 'react';
import './Home.css';
import homeData from '../Data/Home.json';
import clientsData from '../Data/Home.json';
import brandsData from '../Data/Home.json';
import aboutData from '../Data/Home.json';
import catalogueData from '../Data/Home.json';
import { useNavigate } from 'react-router-dom';

export default function HomeMain() {
  // ----- Slider -----
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const intervalRef = useRef(null);

   const [modalLogo, setModalLogo] = useState(null);

   const openModal = (logo) => setModalLogo(logo);
  const closeModal = () => setModalLogo(null);
  
    const { image, heading, description } = aboutData.about && catalogueData.catalogueSection;
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => setExpanded(!expanded);

    const previewText = description.split('\n').slice(0, 2).join('\n'); 

  const sliderImages = homeData.slider.map((item) => item.src); // use direct paths

  //  const { image, heading, description } = catalogueData.catalogueSection;
   const navigate = useNavigate();

   const handleExplore = () => {
     navigate('/catalogue');
   };

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 5000);
  };

  useEffect(() => {
    if (sliderImages.length > 0) startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [sliderImages]);

  const handleTransitionEnd = () => {
    if (current === sliderImages.length) {
      trackRef.current.style.transition = 'none';
      setCurrent(0);
      trackRef.current.style.transform = `translateX(0%)`;
    }
  };

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

  return (
    <div>
      {/* Slider */}
      <div className='slider'>
        <div
          ref={trackRef}
          className='slider-track'
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {sliderImages.map((src, i) => (
            <img key={i} src={src} className='slide-image' alt='slide' />
          ))}
          <img src={sliderImages[0]} className='slide-image' alt='slide' />
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
          <img src={image} alt='Catalogue Wall' />
        </div>

        <div className='catalogue-content'>
          <h2 className='catalogue-heading'>{heading}</h2>
          <p className='catalogue-description'>{description}</p>
          <button className='catalogue-button' onClick={handleExplore}>
            Explore Catalogue
          </button>
        </div>
      </div>



      {/* Design Image */}
      <div className='about-section'>
        <div className='about-image'>
          <img src={image} alt='About Design Walls' />
        </div>

        <div className='about-content'>
          <h2 className='about-heading'>{heading}</h2>
          <p className='about-description'>
            {expanded ? description : previewText}
          </p>
          <button className='about-toggle' onClick={toggleExpanded}>
            {expanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>

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
    </div>
  );
}
