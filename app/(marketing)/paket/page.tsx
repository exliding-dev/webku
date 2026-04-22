import { getAllProducts } from "@/lib/products";
import PaketClient from "./PaketClient";

// Render at request time so Payload CMS data is fetched at runtime,
// not during build when the DB may be unreachable.
export const dynamic = "force-dynamic";

export default async function PaketPage() {
  const plans = await getAllProducts();
  return <PaketClient plans={plans} />;
}
