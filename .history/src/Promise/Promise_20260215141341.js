import "./Promise.css";
import promiseData from "../../src/";
import {
  FaCheckCircle,
  FaClipboardCheck,
  FaTools,
  FaPencilRuler,
  FaHome,
  FaBan
} from "react-icons/fa";

const iconMap = {
  warranty: <FaCheckCircle />,
  quality: <FaClipboardCheck />,
  install: <FaTools />,
  design: <FaPencilRuler />,
  interior: <FaHome />,
  cost: <FaBan />
};

export default function Promise() {
  const { title, subtitle, items } = promiseData;

  return (
    <section className="promise-section">
      <h2 className="promise-title">{title}</h2>
      <p className="promise-subtitle">{subtitle}</p>

      <div className="promise-grid">
        {items.map((item, index) => (
          <div key={index} className="promise-card">
            <div className="promise-icon">
              {iconMap[item.icon]}
            </div>

            <h3 className="promise-card-title">
              {item.title}
            </h3>

            <p className="promise-card-desc">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
