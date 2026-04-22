import Hero from "./components/hero/Hero";
import Services from "./components/services/Services";
import Portfolio from "./components/portfolio/Portfolio";
import Testimonial from "./components/testimonial/Testimonial";
import FAQ from "./components/faq/FAQ";
import Blog from "./components/blog/Blog";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { getLatestPostsAsync } from "@/lib/blog";
import { getServices } from "@/lib/services";

// Render at request time so Payload CMS data is fetched at runtime,
// not during build when the DB may be unreachable.
export const dynamic = "force-dynamic";

export default async function Home() {
  const latestPosts = await getLatestPostsAsync(3);
  const plans = await getServices();

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