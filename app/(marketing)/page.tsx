import Hero from "./components/hero/Hero";
import Services from "./components/services/Services";
import Portfolio from "./components/portfolio/Portfolio";
import Testimonial from "./components/testimonial/Testimonial";
import FAQ from "./components/faq/FAQ";
import Blog from "./components/blog/Blog";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { getLatestPosts } from "@/lib/blog";

export default function Home() {
  const latestPosts = getLatestPosts(3);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <Services />

      {/* Portfolio Section */}
      <Portfolio />

      {/* Testimonial Section */}
      <Testimonial />

      {/* FAQ Section */}
      <FAQ />

      {/* Blog Section */}
      <Blog posts={latestPosts} />

      {/* Footer */}
      <Footer />
    </>
  );
}