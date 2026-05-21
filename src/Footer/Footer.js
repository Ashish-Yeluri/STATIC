import "./Footer.css";
import footerData from "../Data/FooterData.json";
import { Link } from "react-router-dom";

export default function Footer() {

  const { getInTouch, mainFooter, copyright } = footerData;

  return (
    <footer className="footer">

  {/* ===== TOP HEADING ===== */}
  <h2 className="footer-contact-title">{getInTouch.title}</h2>

  {/* ===== 4 COLUMN SECTION ===== */}
  <div className="footer-grid">

    {/* MAP */}
    <div className="footer-map">
      {getInTouch.locations.map((location, index) => (
        <div key={index} className="location-card">
          <iframe
            src={`https://www.google.com/maps?q=${location.mapQuery}&output=embed`}
            title={location.name}
          ></iframe>
          <p>PH: {location.phone}</p>
        </div>
      ))}
    </div>

    {/* COMPANY */}
    <div className="footer-left">
      <h3>{mainFooter.companyName}</h3>
      <p>{mainFooter.description}</p>
    </div>

    {/* USEFUL LINKS */}
    <div className="footer-links">
      <h3>Useful Links</h3>
      <ul>
        {mainFooter.usefulLinks.map((item, index) => (
          <li key={index}>
            {item === "Contact Us" ? (
              <Link to="/contact">{item}</Link>
            ) : item === "Find Our Showroom" ? (
              <a
                href={`https://www.google.com/maps?q=${getInTouch.locations[0].mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item}
              </a>
            ) : (
              item
            )}
          </li>
        ))}
      </ul>
    </div>

    {/* CATEGORIES */}
    <div className="footer-links">
      <h3>Categories</h3>
      <ul>
        {mainFooter.categoriesOne.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

  </div>

  {/* COPYRIGHT */}
  <div className="copyright">{copyright}</div>

</footer>
  );
}
