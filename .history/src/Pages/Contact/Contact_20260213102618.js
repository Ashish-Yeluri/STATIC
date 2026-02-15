import "./Contact.css";

export default function Contact() {
  return (
    <>
      {/* ================= TOP RED CONTACT SECTION ================= */}
      <div className="contact-container">
        <div className="contact-wrapper">

          {/* LEFT SIDE */}
          <div className="contact-left">
            <h1>We love to hear from our customers!</h1>

            <p className="contact-description">
              Do you have a question or concern? Are you looking for something
              in our shop? Drop us a line and let us know. We will get back to you
              as soon as possible with an answer.
            </p>

            <h2 className="company-name">Design Walls</h2>

            <p>
              3rd Floor, MSR Capital, behind Indian Oil petrol bunk, Near Miyapur
              metro station. Telangana, Hyderabad. 500049.
            </p>

            <div className="contact-info">
              <p>📞 7702022569</p>
              <p>📞 9866678689</p>
              <p>✉ info@designwalls.in</p>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="contact-form">
            <h2>Get Free Consultation</h2>

            <form>
              <label>Full Name</label>
              <input type="text" />

              <label>Phone *</label>
              <input type="text" />

              <label>Email *</label>
              <input type="email" />

              <label>Location *</label>
              <input type="text" />

              <label>Requirements</label>
              <textarea rows="4"></textarea>

              <button type="submit">Submit</button>
            </form>
          </div>

        </div>
      </div>

      {/* ================= LOCATION & MAP SECTION ================= */}

      <div className="location-section">

        {/* Tabs */}
        <div className="location-tabs">
          <button className="active">Miyapur (Head Office)</button>
          <button>LB Nagar</button>
          <button>Kompally</button>
          <button>Hitech City - Hafeezpet</button>
          <button>Manikonda</button>
          <button>Bachupally</button>
        </div>

        {/* Real Google Map */}
        <div className="map-container">
          <iframe
            title="Design Walls Miyapur"
            src="https://www.google.com/maps?q=Miyapur,Hyderabad&output=embed"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Address + Phone Row */}
        <div className="location-details">
          <p>
            3rd Floor, MSR Capital, behind Indian Oil petrol bunk,
            Near Miyapur metro station. Telangana, Hyderabad. 500049.
          </p>

          <div className="phone-row">
            <span>📞 9866678689</span>
            <span>📞 7842683249</span>
            <span>📞 7702022569</span>
          </div>
        </div>

      </div>
    </>
  );
}
