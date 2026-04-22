import { getAllTemplatesAsync } from "@/lib/templates";
import TemplateClient from "./TemplateClient";

export default async function TemplatePage() {
  const templates = await getAllTemplatesAsync();
  return <TemplateClient templates={templates} />;
}
