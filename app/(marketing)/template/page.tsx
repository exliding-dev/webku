import { Metadata } from "next";
import { getAllTemplatesAsync } from "@/lib/templates";
import TemplateClient from "./TemplateClient";

export const metadata: Metadata = {
  title: "Template Website Siap Pakai - Profesional & Modern",
  description:
    "Koleksi template website siap pakai dari Exliding. Template modern, responsif, dan mudah dikustomisasi untuk berbagai kebutuhan bisnis. Hemat waktu & biaya!",
  keywords: [
    "template website",
    "template website gratis",
    "template web modern",
    "template website bisnis",
    "template landing page",
    "template toko online",
    "template website Indonesia",
    "download template website",
  ],
  alternates: {
    canonical: "/template",
  },
  openGraph: {
    title: "Template Website Siap Pakai | Exliding",
    description:
      "Pilih template website profesional & modern. Siap pakai untuk berbagai kebutuhan bisnis Anda.",
    url: "/template",
  },
};

// Render at request time so Payload CMS data is fetched at runtime,
// not during build when the DB may be unreachable.
export const dynamic = "force-dynamic";

export default async function TemplatePage() {
  const templates = await getAllTemplatesAsync();
  return <TemplateClient templates={templates} />;
}
