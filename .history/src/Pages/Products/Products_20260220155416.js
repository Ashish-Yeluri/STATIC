import { useState, useEffect, useRef } from 'react';

import './products.css';
import data from '../../Data/Products.json';

export default function Products() {
  const [activeProduct, setActiveProduct] = useState(null);
  const [expandedIndexes, setExpandedIndexes] = useState({});
  const textRef = useRef(null);

  const toggleDescription = (key) => {
    setExpandedIndexes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const parallaxRef = useRef(null);

 useEffect(() => {
   const handleScroll = () => {
     if (!parallaxRef.current || !textRef.current) return;

     if (window.innerWidth < 1024) return;

     const rect = parallaxRef.current.getBoundingClientRect();

     // Parallax image (moderate speed)
     const imageProgress = rect.top * -0.5;
     parallaxRef.current.style.transform = `translateY(${imageProgress}px) scale(1.15)`;

     // Text moves faster than image
     const textProgress = rect.top * -0.8; // increase multiplier
     textRef.current.style.transform = `translateY(${textProgress}px)`;
   };

   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);




  return (
    <>
      <h1 className='prodHeading wix-font-small small-caps'>
        Products Customised For You
      </h1>

      {/* GRID VIEW */}
      {!activeProduct && (
        <div className='products-grid'>
          {data.products.map((item) => (
            <div key={item.id} className='product-card-wrapper'>
              <h3 className='product-title'>{item.title}</h3>

              <div className='product-card'>
                <img src={item.image} alt={item.title} />

                <div className='product-overlay'>
                  <span
                    className='learn-more'
                    onClick={() => {
                      setActiveProduct(item);
                      setExpandedIndexes({});
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Learn More
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL VIEW */}
      {activeProduct && (
        <div className='product-detail'>
          <button className='back-btn' onClick={() => setActiveProduct(null)}>
            ← Back to Products
          </button>

          <div className='detail-content'>
            {/* LEFT IMAGE (not for blinds & wallpapers) */}
            {!activeProduct.subCategories && !activeProduct.history && (
              <div className='detail-image'>
                <img src={activeProduct.image} alt={activeProduct.title} />
              </div>
            )}

            <div className='detail-text'>
              {/* MULTIPLE DESCRIPTIONS */}
              {activeProduct.descriptions &&
                activeProduct.descriptions.map((desc, index) => (
                  <div key={index} className='desc-block'>
                    <p>{expandedIndexes[index] ? desc.full : desc.short}</p>
                    <span
                      className='toggle-text'
                      onClick={() => toggleDescription(index)}
                    >
                      {expandedIndexes[index] ? 'Show Less' : 'Show More'}
                    </span>
                  </div>
                ))}

              {/* WINDOW BLINDS */}
              {activeProduct.subCategories && (
                <>
                  <h3 style={{ marginTop: '30px' }}>
                    {activeProduct.subHeading}
                  </h3>

                  <div className='sub-grid'>
                    {activeProduct.subCategories.map((sub, index) => (
                      <div key={index} className='sub-card'>
                        <h4>{sub.name}</h4>
                        <img src={sub.image} alt={sub.name} />

                        <p>
                          {expandedIndexes[`sub-${index}`]
                            ? sub.full
                            : sub.short}
                        </p>

                        <span
                          className='toggle-text'
                          onClick={() => toggleDescription(`sub-${index}`)}
                        >
                          {expandedIndexes[`sub-${index}`]
                            ? 'Show Less'
                            : 'Show More'}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* WALLPAPERS */}
              {activeProduct.history && (
                <>
                  {/* HISTORY */}
                  <div className='desc-block history-split'>
                    {/* LEFT IMAGE */}
                    <div className='history-image'>
                      <img
                        src={activeProduct.history.image}
                        alt={activeProduct.history.heading}
                      />
                    </div>

                    {/* RIGHT TEXT */}
                    <div className='history-text'>
                      <h3>{activeProduct.history.heading}</h3>

                      <p>
                        {expandedIndexes.history
                          ? activeProduct.history.full
                          : activeProduct.history.short}
                      </p>

                      <span
                        className='toggle-text'
                        onClick={() => toggleDescription('history')}
                      >
                        {expandedIndexes.history ? 'Show Less' : 'Show More'}
                      </span>
                    </div>
                  </div>

                  {/* SIDE BY SIDE */}
                  <div className='sub-grid'>
                    {activeProduct.sideBySide.map((item, index) => (
                      <div key={index} className='sub-card'>
                        <h4>{item.title}</h4>
                        <img src={item.image} alt={item.title} />
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* BIG IMAGE */}
                  <div className='parallax-wrapper'>
                    <div
                      className='parallax-image'
                      style={{
                        backgroundImage: `url(${activeProduct.bigImage})`,
                      }}
                      ref={parallaxRef}
                    />

                    <div className='parallax-text' ref={textRef}>
                      Types of Wallpapers
                    </div>
                  </div>

                  {/* TYPES */}
                  <h3 style={{ marginTop: '40px', color: '#b71c1c' }}>
                    Types of Wallpapers
                  </h3>

                  <div className='types-grid'>
                    {activeProduct.types.map((type, index) => (
                      <div key={index} className='type-card'>
                        <h4 style={{ color: '#b71c1c' }}>{type.title}</h4>
                        <p>{type.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* WHY WALLPAPER IMAGES */}
                  {activeProduct.whyImages && (
                    <div className='sub-grid' style={{ marginTop: '40px' }}>
                      {activeProduct.whyImages.map((img) => (
                        <div key={img.id} className='sub-card'>
                          <img
                            src={img.image}
                            alt='Why Wallpaper'
                            style={{
                              width: '100%',
                              height: '250px',
                              objectFit: 'cover',
                              borderRadius: '10px',
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* WHY WALLPAPER SECTION */}
                  <div className='why-wallpaper'>
                    {/* LEFT */}
                    <div className='why-left'>
                      <h3>{activeProduct.why.leftTitle}</h3>

                      {activeProduct.why.points.map((point, index) => (
                        <p key={index}>
                          <strong style={{ color: '#b71c1c' }}>
                            {point.title}:
                          </strong>{' '}
                          {point.text}
                        </p>
                      ))}
                    </div>

                    {/* RIGHT */}
                    <div className='why-right'>
                      <h3>{activeProduct.why.rightTitle}</h3>

                      {activeProduct.why.rightText.map((text, index) => (
                        <p key={index}>{text}</p>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* SINGLE DESCRIPTION */}
              {activeProduct.description && !activeProduct.descriptions && (
                <div className='desc-block'>
                  <p>
                    {expandedIndexes['single-desc']
                      ? activeProduct.description
                      : activeProduct.description.slice(0, 180) + '...'}
                  </p>

                  <span
                    className='toggle-text'
                    onClick={() => toggleDescription('single-desc')}
                  >
                    {expandedIndexes['single-desc'] ? 'Show Less' : 'Show More'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
