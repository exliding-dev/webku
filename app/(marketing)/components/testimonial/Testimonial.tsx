import TestimonialClient from "./TestimonialClient";
import type { TestimonialItem } from "@/lib/testimonials";

// Server component that receives items from the page and passes to client
export default function Testimonial({ items }: { items?: TestimonialItem[] }) {
  // If items are passed from the page, use them; otherwise render nothing
  // (the page.tsx should always pass items from the async CMS fetch)
  if (!items || items.length === 0) return null;

  return <TestimonialClient items={items} />;
}
