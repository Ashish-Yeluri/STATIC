import React, { useState } from 'react';
import catalogueData from '../../Data/CatalogueData.json';
import './Catalogue.css';

export default function Catalogue() {
  const [openSection, setOpenSection] = useState(null);

  const openPdf = (pdfPath) => {
    const pdfUrl = `${window.location.origin}${pdfPath}`;
    window.open(pdfUrl, '_self');
  };

  return (
    <div className='catalogue-page'>
      {/* HERO */}
      <div className='catalogue-hero'>
        <h1>
          {catalogueData.hero.line1}
          <br />
          {catalogueData.hero.line2}
        </h1>
      </div>

      {/* EXISTING GRID */}
      <div className='catalogue-grid'>
        {catalogueData.items.map((item) => (
          <a
            key={item.id}
            href={item.pdf}
            target='_blank'
            rel='noopener noreferrer'
            className='catalogue-card'
          >
            <img src={process.env.PUBLIC_URL + item.image} alt={item.title} />
          </a>
        ))}
      </div>

      {/* PDF SECTION */}

      <div className='pdf-main-section'>
        <h2>Our Catalogue Demo</h2>

        {catalogueData.pdfCategories.map((category, index) => (
          <div className='pdf-category' key={index}>
            <div
              className='pdf-header'
              onClick={() =>
                setOpenSection(
                  openSection === category.title ? null : category.title,
                )
              }
            >
              <h3>{category.title}</h3>

              <span>{openSection === category.title ? '-' : '+'}</span>
            </div>

            {openSection === category.title && (
              <div className='pdf-grid'>
                {category.pdfs.map((pdf, i) => (
                  <div
                    key={i}
                    className='pdf-card'
                    onClick={() => openPdf(pdf.pdf)}
                  >
                    <img
                      src={process.env.PUBLIC_URL + pdf.preview}
                      alt={pdf.name}
                    />

                    <p>{pdf.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
