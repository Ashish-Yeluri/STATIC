import "./Contact.css";
import contactData from "../../Data/ContactusData.json";
import { useState } from "react";

export default function Contact() {

  const { topSection, formSection, locations } = contactData;
  const [activeLocation, setActiveLocation] = useState(locations[0]);

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
              {topSection.phones.map((phone, index) => (
                <p key={index}>📞 {phone}</p>
              ))}
              <p>✉ {topSection.email}</p>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="contact-form">
            <h2>{formSection.title}</h2>

            <form>
              {formSection.fields.map((field, index) => (
                <div key={index}>
                  <label>{field.label}</label>

                  {field.type === "textarea" ? (
                    <textarea rows="4"></textarea>
                  ) : (
                    <input type={field.type} />
                  )}
                </div>
              ))}

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
          {locations.map((location, index) => (
            <button
              key={index}
              className={activeLocation.name === location.name ? "active" : ""}
              onClick={() => setActiveLocation(location)}
            >
              {location.name}
            </button>
          ))}
        </div>

        <div className="map-container">
          <iframe
            title={activeLocation.name}
            src={`https://www.google.com/maps?q=${activeLocation.mapQuery}&output=embed`}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        <div className="location-details">
          <p>{activeLocation.address}</p>

          <div className="phone-row">
            {activeLocation.phones.map((phone, index) => (
              <span key={index}>📞 {phone}</span>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
