import "./Footer.css";
import footerData from "../Data/FooterData.json";

export default function Footer() {

  const { getInTouch, mainFooter, copyright } = footerData;

  return (
    <footer className="footer">

  <div className="footer-top">

  {/* LEFT → COMPANY */}
  <div className="footer-left">
    <h2>{mainFooter.companyName}</h2>
    <p>{mainFooter.description}</p>
  </div>

  {/* CENTER → GET IN TOUCH */}
  <div className="footer-contact">
    <h2>{getInTouch.title}</h2>

    {getInTouch.locations.map((location, index) => (
      <div key={index} className="contact-item">
        <h3>{location.name}</h3>
        <p>PH: {location.phone}</p>
      </div>
    ))}
  </div>

  {/* RIGHT → LINKS */}
  <div className="footer-links">
    <h3>Useful links</h3>
    <ul>
      {mainFooter.usefulLinks.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>

    <h3 className="footer-cat-title">Categories</h3>
    <ul>
      {mainFooter.categoriesOne.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>

</div>
  {/* 🔥 COPYRIGHT */}
  <div className="copyright">
    {copyright}
  </div>

</footer>
  );
}
