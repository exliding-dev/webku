import Hero from "./components/hero/Hero";
import Services from "./components/services/Services";
import Portfolio from "./components/portfolio/Portfolio";
import Testimonial from "./components/testimonial/Testimonial";
import FAQ from "./components/faq/FAQ";
import Blog from "./components/blog/Blog";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { getLatestPostsAsync } from "@/lib/blog";
import { getAllProducts } from "@/lib/products";

export default async function Home() {
  const latestPosts = await getLatestPostsAsync(3);
  const plans = await getAllProducts();

  return (
    <>
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <Services plans={plans} />

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