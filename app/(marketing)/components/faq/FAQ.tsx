import FAQClient from "./FAQClient";
import type { FAQItem } from "@/lib/faqs";

// Server component that receives items from the page and passes to client
export default function FAQ({ items }: { items?: FAQItem[] }) {
  // If items are passed from the page, use them; otherwise render nothing
  if (!items || items.length === 0) return null;

  return <FAQClient items={items} />;
}
