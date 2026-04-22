import { getAllTemplatesAsync } from "@/lib/templates";
import TemplateClient from "./TemplateClient";

// Render at request time so Payload CMS data is fetched at runtime,
// not during build when the DB may be unreachable.
export const dynamic = "force-dynamic";

export default async function TemplatePage() {
  const templates = await getAllTemplatesAsync();
  return <TemplateClient templates={templates} />;
}
