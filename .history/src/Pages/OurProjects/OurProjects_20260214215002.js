import { useParams } from "react-router-dom";
import Wallpapers from "./Wallpapers";
import Blinds from "./Blinds";
import Curtains from "./Curtains";
import Upholstery from "./Upholstery";

export default function OurProjects() {

  const { category } = useParams();
  const currentCategory = category?.toLowerCase();

  if (currentCategory === "wallpapers") return <Wallpapers />;
  if (currentCategory === "blinds") return <Blinds />;
  if (currentCategory === "curtains") return <Curtains />;
  // if (currentCategory === "upholstery") return <Upholstery />;
// 
  return null;
}
