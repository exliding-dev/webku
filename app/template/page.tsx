import { getAllTemplates } from "@/lib/templates";
import TemplateClient from "./TemplateClient";

export default function TemplatePage() {
  const templates = getAllTemplates();
  return <TemplateClient templates={templates} />;
}
