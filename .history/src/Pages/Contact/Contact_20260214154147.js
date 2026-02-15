import "./Contact.css";
import contactData from "../";

export default function Contact() {

  const { topSection, formSection, locations } = contactData;
  const firstLocation = locations[0];

  return (
    <>
      {/* ================= TOP RED CONTACT SECTION ================= */}
      <div className="contact-container">
        <div className="contact-wrapper">

          <div className="contact-left">
            <h1>{topSection.heading}</h1>

            <p className="contact-description">
              {topSection.description}
            </p>

            <h2 className="company-name">
              {topSection.company}
            </h2>

            <p>{topSection.address}</p>

            <div className="contact-info">
              {topSection.phones.map((phone, i) => (
                <p key={i}>📞 {phone}</p>
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
          {locations.map((loc, index) => (
            <button
              key={index}
              className={index === 0 ? "active" : ""}
            >
              {loc.name}
            </button>
          ))}
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
            {firstLocation.phones.map((phone, i) => (
              <span key={i}>📞 {phone}</span>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
