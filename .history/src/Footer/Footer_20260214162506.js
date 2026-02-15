import "./Footer.css";
import footerData from "../../";

export default function Footer() {

  const { getInTouch, mainFooter, copyright } = footerData;

  return (
    <footer className="footer">

      {/* 🔥 GET IN TOUCH SECTION */}
      <div className="get-in-touch">
        <h2>{getInTouch.title}</h2>

        <div className="location-cards">

          <div className="location-card">
            <h3>{getInTouch.locations[0].name}</h3>
            <iframe
              src={`https://www.google.com/maps?q=${getInTouch.locations[0].mapQuery}&output=embed`}
              title={getInTouch.locations[0].name}
            ></iframe>
            <p>PH: {getInTouch.locations[0].phone}</p>
          </div>

          <div className="location-card">
            <h3>{getInTouch.locations[1].name}</h3>
            <iframe
              src={`https://www.google.com/maps?q=${getInTouch.locations[1].mapQuery}&output=embed`}
              title={getInTouch.locations[1].name}
            ></iframe>
            <p>PH: {getInTouch.locations[1].phone}</p>
          </div>

          <div className="location-card">
            <h3>{getInTouch.locations[2].name}</h3>
            <iframe
              src={`https://www.google.com/maps?q=${getInTouch.locations[2].mapQuery}&output=embed`}
              title={getInTouch.locations[2].name}
            ></iframe>
            <p>PH: {getInTouch.locations[2].phone}</p>
          </div>

          <div className="location-card">
            <h3>{getInTouch.locations[3].name}</h3>
            <iframe
              src={`https://www.google.com/maps?q=${getInTouch.locations[3].mapQuery}&output=embed`}
              title={getInTouch.locations[3].name}
            ></iframe>
            <p>PH: {getInTouch.locations[3].phone}</p>
          </div>

        </div>
      </div>

      {/* 🔥 MAIN FOOTER SECTION */}
      <div className="footer-main">

        <div className="footer-left">
          <h2>{mainFooter.companyName}</h2>
          <p>{mainFooter.description}</p>
        </div>

        <div className="footer-links">
          <h3>Useful links</h3>
          <ul>
            <li>{mainFooter.usefulLinks[0]}</li>
            <li>{mainFooter.usefulLinks[1]}</li>
            <li>{mainFooter.usefulLinks[2]}</li>
            <li>{mainFooter.usefulLinks[3]}</li>
            <li>{mainFooter.usefulLinks[4]}</li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Categories</h3>
          <ul>
            <li>{mainFooter.categoriesOne[0]}</li>
            <li>{mainFooter.categoriesOne[1]}</li>
            <li>{mainFooter.categoriesOne[2]}</li>
            <li>{mainFooter.categoriesOne[3]}</li>
            <li>{mainFooter.categoriesOne[4]}</li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Categories</h3>
          <ul>
            <li>{mainFooter.categoriesTwo[0]}</li>
            <li>{mainFooter.categoriesTwo[1]}</li>
            <li>{mainFooter.categoriesTwo[2]}</li>
            <li>{mainFooter.categoriesTwo[3]}</li>
            <li>{mainFooter.categoriesTwo[4]}</li>
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
