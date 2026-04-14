import PortfolioClient from "./PortfolioClient";
import { getAllPortfolioItems } from "@/lib/portfolio";

export default function Portfolio() {
  const items = getAllPortfolioItems();
  return <PortfolioClient items={items} />;
}