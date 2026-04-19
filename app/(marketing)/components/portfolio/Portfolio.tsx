import PortfolioClient from "./PortfolioClient";
import { getAllPortfolioItemsAsync } from "@/lib/portfolio";

export default async function Portfolio() {
  const items = await getAllPortfolioItemsAsync();
  return <PortfolioClient items={items} />;
}