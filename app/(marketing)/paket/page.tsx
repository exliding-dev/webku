import { getAllProducts } from "@/lib/products";
import PaketClient from "./PaketClient";

export default async function PaketPage() {
  const plans = await getAllProducts();
  return <PaketClient plans={plans} />;
}
