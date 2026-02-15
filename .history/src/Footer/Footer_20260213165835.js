import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      {/* 🔥 GET IN TOUCH SECTION */}
      <div className="get-in-touch">
        <h2>GET IN TOUCH</h2>

        <div className="location-cards">

          <div className="location-card">
            <h3>LIBERTY</h3>
            <iframe
              src="https://www.google.com/maps?q=Miyapur,Hyderabad&output=embed"
              title="Liberty"
            ></iframe>
            <p>PH: 09848685322</p>
          </div>

          <div className="location-card">
            <h3>NALLAGANDLA</h3>
            <iframe
              src="https://www.google.com/maps?q=Nallagandla,Hyderabad&output=embed"
              title="Nallagandla"
            ></iframe>
            <p>PH: 07815930182</p>
          </div>

          <div className="location-card">
            <h3>CHAMPAPET</h3>
            <iframe
              src="https://www.google.com/maps?q=Champapet,Hyderabad&output=embed"
              title="Champapet"
            ></iframe>
            <p>PH: 08522801282</p>
          </div>

          <div className="location-card">
            <h3>NARSINGI</h3>
            <iframe
              src="https://www.google.com/maps?q=Narsingi,Hyderabad&output=embed"
              title="Narsingi"
            ></iframe>
            <p>PH: 9000301282</p>
          </div>

        </div>
      </div>

      {/* 🔥 MAIN FOOTER SECTION */}
      <div className="footer-main">

        <div className="footer-left">
          <h2></h2>
          <p>
            Shape Your Space Create a space that reflects your style, fits your
            needs, and enhances your mood. Contact us today!
          </p>
        </div>

        <div className="footer-links">
          <h3>Useful links</h3>
          <ul>
            <li>Our Story</li>
            <li>NRI Living Spaces</li>
            <li>Find us near you</li>
            <li>Interior designers & Architects</li>
            <li>Design your dream space</li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Categories</h3>
          <ul>
            <li>Artificial Turf</li>
            <li>Bedsheets</li>
            <li>Carpets & Rugs</li>
            <li>Curtains</li>
            <li>Cushions</li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Categories</h3>
          <ul>
            <li>Mattress</li>
            <li>Sofa Fabrics</li>
            <li>Wallpapers</li>
            <li>Window Blinds</li>
            <li>Wooden Flooring</li>
          </ul>
        </div>

      </div>

      {/* 🔥 COPYRIGHT */}
      <div className="copyright">
        Copyright © 2025 BHAVANI FURNISHINGS, All rights reserved.
      </div>

    </footer>
  );
}
