import TentangPage from "../components/Tentang/Tentang";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export const metadata = {
  title: "Tentang Kami - Exliding",
  description: "Exliding adalah agency dan platform template digital yang mengubah ide menjadi pengalaman web yang tak terlupakan.",
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
