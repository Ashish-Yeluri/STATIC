import { useNavigate } from "react-router-dom";
import "../Floating/Flo";

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

      {/* WhatsApp */}
      <a
        href="https://api.whatsapp.com/send/?phone=%2B917981507828&text&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt="WhatsApp"
        />
      </a>

      {/* Call */}
      <a href="tel:+917981507828" className="call-btn">
        📞
      </a>
    </div>
  );
}
