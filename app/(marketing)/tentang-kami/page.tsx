import { Metadata } from "next";
import TentangPage from "../components/Tentang/Tentang";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export const metadata: Metadata = {
  title: "Tentang Kami - Agency & Platform Template Digital",
  description:
    "Exliding adalah agency pembuatan website dan platform template digital di Klaten, Jawa Tengah. Kami mengubah ide menjadi pengalaman web profesional untuk UMKM dan bisnis di Indonesia.",
  keywords: [
    "tentang Exliding",
    "agency website Klaten",
    "web developer Klaten",
    "tim Exliding",
    "jasa website Jawa Tengah",
    "agency digital Klaten",
  ],
  alternates: {
    canonical: "/tentang-kami",
  },
  openGraph: {
    title: "Tentang Kami | Exliding - Agency Website Klaten",
    description:
      "Kenali Exliding, agency pembuatan website profesional di Klaten, Jawa Tengah. Mitra terpercaya untuk transformasi digital bisnis Anda.",
    url: "/tentang-kami",
  },
};

export default function TentangKami() {
  return (
    <>
      <Header />
      <TentangPage />
      <Footer />
    </>
  );
}
