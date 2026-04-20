import { getPayload } from "payload";
import configPromise from "./payload.config.ts";

async function run() {
  const payload = await getPayload({ config: configPromise });
  const products = await payload.find({ collection: 'products' });
  console.log("Products in DB:", products.docs.length);
}
run();
