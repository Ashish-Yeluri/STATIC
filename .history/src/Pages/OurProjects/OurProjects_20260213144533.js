import { useParams } from "react-router-dom";

export default function OurProjects() {
  const { category } = useParams();

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ textTransform: "capitalize" }}>
        {category} Projects
      </h1>

      {/* You can render different data based on category */}
    </div>
  );
}
