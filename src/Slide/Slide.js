import { useEffect, useRef, useState } from 'react';
import './Slide.css';

import img1 from '../Slide/slide1.avif';
import img2 from '../Slide/slide2.avif';
import img3 from '../Slide/slide3.avif';
import img4 from '../Slide/slide4.avif';
import img5 from '../Slide/slide5.avif';

const images = [img1, img2, img3, img4, img5];

export default function Slide() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const intervalRef = useRef(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 5000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  // Handle infinite loop reset
  const handleTransitionEnd = () => {
    if (current === images.length) {
      trackRef.current.style.transition = 'none';
      setCurrent(0);
      trackRef.current.style.transform = `translateX(0%)`;
    }
  };

  // Restore transition after reset
  useEffect(() => {
    if (current === 0) {
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
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    startAutoSlide();
  };

  return (
    <div className='slider'>
      <div
        ref={trackRef}
        className='slider-track'
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {images.map((img, i) => (
          <img key={i} src={img} className='slide-image' alt='slide'/>
        ))}

        {/* Clone first image */}
        <img src={images[0]} className='slide-image' alt='slide'/>
      </div>

      <div className='slider-controls'>
        <button onClick={prevSlide}>&lt;</button>
        <button onClick={nextSlide}>&gt;</button>
      </div>
    </div>
  );
}
