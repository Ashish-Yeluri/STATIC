import { useState } from "react";
import "./Contact.css";
import contactData from "../../Data/ContactusData.json";
import {createEnquiry} from ""

export default function Contact() {

  const { topSection, formSection, locations } = contactData;
  const firstLocation = locations[0];

  // ✅ Form state
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    requirements: ""
  });

  // ✅ Error state
  const [errors, setErrors] = useState({});

  // ✅ Handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Please enter full name";

    if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";

    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Please enter valid email";

    if (!formData.location.trim())
      newErrors.location = "Please enter location";

    return newErrors;
  };

  // ✅ Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem(
        "contactFormData",
        JSON.stringify(formData)
      );

      alert(
        `Thank you for consulting us Mr./Mrs. ${formData.fullName}. Your Appointment was scheduled`
      );

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        location: "",
        requirements: ""
      });
    }
  };

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

          {/* RIGHT SIDE FORM (CONNECTED TO STATE) */}
          <div className="contact-form">
            <h2>{formSection.title}</h2>

            <form onSubmit={handleSubmit}>
              {/* FULL NAME */}
              <label>{formSection.fields[0].label}</label>
              <input
                name="fullName"
                type={formSection.fields[0].type}
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <span className="error">{errors.fullName}</span>
              )}

              {/* PHONE */}
              <label>{formSection.fields[1].label}</label>
              <input
                name="phone"
                type={formSection.fields[1].type}
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <span className="error">{errors.phone}</span>
              )}

              {/* EMAIL */}
              <label>{formSection.fields[2].label}</label>
              <input
                name="email"
                type={formSection.fields[2].type}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error">{errors.email}</span>
              )}

              {/* LOCATION */}
              <label>{formSection.fields[3].label}</label>
              <input
                name="location"
                type={formSection.fields[3].type}
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && (
                <span className="error">{errors.location}</span>
              )}

              {/* REQUIREMENTS */}
              <label>{formSection.fields[4].label}</label>
              <textarea
                name="requirements"
                rows="4"
                value={formData.requirements}
                onChange={handleChange}
              ></textarea>

              <button type="submit">
                {formSection.buttonText}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ================= LOCATION & MAP SECTION ================= */}
      <div className="location-section">

        
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
          </div>
        </div>

      </div>
    </>
  );
}
