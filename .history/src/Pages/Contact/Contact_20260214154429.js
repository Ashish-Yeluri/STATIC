import "./Contact.css";
import contactData from "../../Data/ContactusData.json";

export default function Contact() {

  const { topSection, formSection, locations } = contactData;
  const firstLocation = locations[0];

  return (
    <>
      {/* ================= TOP RED CONTACT SECTION ================= */}
      <div className="contact-container">
        <div className="contact-wrapper">

          {/* LEFT SIDE */}
          <div className="contact-left">
            <h1>{topSection.heading}</h1>

            <p className="contact-description">
              {topSection.description}
            </p>

            <h2 className="company-name">{topSection.company}</h2>

            <p>{topSection.address}</p>

            <div className="contact-info">
              <p>📞 {topSection.phones[0]}</p>
              <p>📞 {topSection.phones[1]}</p>
              <p>✉ {topSection.email}</p>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="contact-form">
            <h2>{formSection.title}</h2>

            <form>
              <label>{formSection.fields[0].label}</label>
              <input type={formSection.fields[0].type} />

              <label>{formSection.fields[1].label}</label>
              <input type={formSection.fields[1].type} />

              <label>{formSection.fields[2].label}</label>
              <input type={formSection.fields[2].type} />

              <label>{formSection.fields[3].label}</label>
              <input type={formSection.fields[3].type} />

              <label>{formSection.fields[4].label}</label>
              <textarea rows="4"></textarea>

              <button type="submit">
                {formSection.buttonText}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ================= LOCATION & MAP SECTION ================= */}

      <div className="location-section">

        <div className="location-tabs">
          <button className="active">{locations[0].name}</button>
          <button>{locations[1].name}</button>
          <button>{locations[2].name}</button>
          <button>{locations[3].name}</button>
          <button>{locations[4].name}</button>
          <button>{locations[5].name}</button>
        </div>

        <div className="map-container">
          <iframe
            title={firstLocation.name}
            src={`https://www.google.com/maps?q=${firstLocation.mapQuery}&output=embed`}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        <div className="location-details">
          <p>{firstLocation.address}</p>

          <div className="phone-row">
            <span>📞 {firstLocation.phones[0]}</span>
            <span>📞 {firstLocation.phones[1]}</span>
            <span>📞 {firstLocation.phones[2]}</span>
          </div>
        </div>

      </div>
    </>
  );
}
