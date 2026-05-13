import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import "../Floating/FloatingContact.css";

export default function FloatingContact() {
  const navigate = useNavigate();

  return (
    <div className="floating-contact">

      {/* Consultation */}
      <div
        className="consultation-tab"
        onClick={() => navigate("/contact")}
      >
        Get Free Consultation
      </div>

      {/* Call */}
      <a href="tel:+916309821900" className="call-btn">
        <FaPhoneAlt />
      </a>

      {/* WhatsApp */}
      <a
        href="https://api.whatsapp.com/send/?phone=%2B916309821900&text&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
      >
        <FaWhatsapp />
      </a>

    </div>
  );
}
