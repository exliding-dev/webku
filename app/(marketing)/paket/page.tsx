import { getAllProducts } from "@/lib/products";
import PaketClient from "./PaketClient";

export default function PaketPage() {
  const plans = getAllProducts();
  return <PaketClient plans={plans} />;
}
