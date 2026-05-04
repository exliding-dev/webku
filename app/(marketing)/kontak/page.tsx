import { Metadata } from "next";
import KontakPage from "../components/Kontak/Kontak";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export const metadata: Metadata = {
  title: "Hubungi Kami - Konsultasi Gratis Pembuatan Website",
  description:
    "Hubungi Exliding untuk konsultasi gratis pembuatan website. Kami siap membantu bisnis Anda hadir secara profesional di dunia digital. Klaten, Jawa Tengah.",
  keywords: [
    "kontak Exliding",
    "hubungi jasa website",
    "konsultasi website gratis",
    "kontak web developer Klaten",
    "alamat Exliding",
    "WhatsApp Exliding",
  ],
  alternates: {
    canonical: "/kontak",
  },
  openGraph: {
    title: "Hubungi Kami | Exliding - Konsultasi Website Gratis",
    description:
      "Konsultasikan kebutuhan website Anda secara gratis. Hubungi tim Exliding sekarang juga!",
    url: "/kontak",
  },
};

export default function Kontak() {
  return (
    <>
      <Header />
      <KontakPage />
      <Footer />
    </>
  );
}
