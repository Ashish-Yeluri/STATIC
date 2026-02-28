import { useState, useEffect } from "react";
import "./PopupForm.css";
import contactData from "../Data/";

export default function PopupForm() {
  const { formSection } = contactData;

  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "", phone: "", email: "", location: "", requirements: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Please enter full name";
    if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Please enter valid email";
    if (!formData.location.trim()) newErrors.location = "Please enter location";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem("popupFormData", JSON.stringify(formData));
      setSubmitted(true);
      setTimeout(() => setVisible(false), 3000);
    }
  };

  if (!visible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">

        <button className="popup-close" onClick={() => setVisible(false)}>✕</button>

        {submitted ? (
          <div className="popup-success">
            <h3>Thank You!</h3>
            <p>We will get back to you shortly.</p>
          </div>
        ) : (
          <div>
            <h2 className="popup-title">{formSection.title}</h2>
            <p className="popup-subtitle">Get a free consultation today!</p>

            <form onSubmit={handleSubmit}>

              <label>{formSection.fields[0].label}</label>
              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <span className="popup-error">{errors.fullName}</span>}

              <label>{formSection.fields[1].label}</label>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="popup-error">{errors.phone}</span>}

              <label>{formSection.fields[2].label}</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="popup-error">{errors.email}</span>}

              <label>{formSection.fields[3].label}</label>
              <input
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && <span className="popup-error">{errors.location}</span>}

              <label>{formSection.fields[4].label}</label>
              <textarea
                name="requirements"
                rows="3"
                value={formData.requirements}
                onChange={handleChange}
              ></textarea>

              <button type="submit" className="popup-submit">
                {formSection.buttonText}
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}