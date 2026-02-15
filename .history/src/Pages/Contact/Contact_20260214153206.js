import { useState } from "react";
import contactData from "../../Data/contactdata.json";
import "./Contact.css";

export default function Contact() {

  const [activeLocation, setActiveLocation] = useState(
    contactData.locations[0]
  );

  return (
    <>
      {/* ================= TOP RED CONTACT SECTION ================= */}
      <div className="contact-container">
        <div className="contact-wrapper">

          {/* LEFT SIDE */}
          <div className="contact-left">
            <h1>{contactData.hero.heading}</h1>

            <p className="contact-description">
              {contactData.hero.description}
            </p>

            <h2 className="company-name">
              {contactData.hero.company}
            </h2>

            <p>{contactData.hero.address}</p>

            <div className="contact-info">
              {contactData.hero.phones.map((phone, index) => (
                <p key={index}>📞 {phone}</p>
              ))}
              <p>✉ {contactData.hero.email}</p>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="contact-form">
            <h2>{contactData.form.title}</h2>

            <form>
              {contactData.form.fields.map((field, index) => (
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
                {contactData.form.buttonText}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ================= LOCATION & MAP SECTION ================= */}
      <div className="location-section">

        {/* Tabs */}
        <div className="location-tabs">
          {contactData.locations.map((location) => (
            <button
              key={location.id}
              className={
                activeLocation.id === location.id ? "active" : ""
              }
              onClick={() => setActiveLocation(location)}
            >
              {location.name}
            </button>
          ))}
        </div>

        {/* Map */}
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

        {/* Address + Phone */}
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
