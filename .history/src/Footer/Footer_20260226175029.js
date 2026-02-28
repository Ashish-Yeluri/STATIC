import "./Footer.css";
import footerData from "../Data/FooterData.json";

export default function Footer() {

  const { getInTouch, mainFooter, copyright } = footerData;

  return (
    <footer className="footer">

  {/* 🔥 MERGED TOP SECTION */}
  <div className="footer-top">

    {/* LEFT → MAP */}
    <div className="footer-map">
      <h2>{getInTouch.title}</h2>

      {getInTouch.locations.map((location, index) => (
        <div className="location-card" key={index}>

          <iframe
            src={`https://www.google.com/maps?q=${location.mapQuery}&output=embed`}
            title={location.name}
          ></iframe>

          <p>PH: {location.phone}</p>
        </div>
      ))}
    </div>

    {/* RIGHT → MAIN FOOTER */}
    <div className="footer-main">

      <div className="footer-left">
        <h2>{mainFooter.companyName}</h2>
        <p>{mainFooter.description}</p>
      </div>

      <div className="footer-links">
        <h3>Useful links</h3>
        <ul>
          {mainFooter.usefulLinks.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="footer-links">
        <h3>Categories</h3>
        <ul>
          {mainFooter.categoriesOne.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

    </div>

  </div>

  {/* 🔥 COPYRIGHT */}
  <div className="copyright">
    {copyright}
  </div>

</footer>
  );
}
