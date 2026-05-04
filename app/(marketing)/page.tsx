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
import { getAllTestimonialsAsync } from "@/lib/testimonials";
import { getAllFAQsAsync } from "@/lib/faqs";

// Render at request time so Payload CMS data is fetched at runtime,
// not during build when the DB may be unreachable.
export const dynamic = "force-dynamic";

// JSON-LD Structured Data for Local Business SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.exliding.my.id/#business",
      name: "Exliding",
      alternateName: "Exliding Web Agency",
      description:
        "Jasa pembuatan website profesional, murah, dan cepat di Klaten & Jawa Tengah. Spesialis website UMKM, company profile, toko online, landing page.",
      url: "https://www.exliding.my.id",
      telephone: "+6281574741954",
      email: "halo@exliding.my.id",
      image: "https://www.exliding.my.id/og-image.jpg",
      priceRange: "Rp 500.000 - Rp 10.000.000",
      currenciesAccepted: "IDR",
      paymentAccepted: "Transfer Bank, E-Wallet",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Klaten",
        addressRegion: "Jawa Tengah",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -7.7056,
        longitude: 110.6042,
      },
      areaServed: [
        { "@type": "City", name: "Klaten" },
        { "@type": "City", name: "Solo" },
        { "@type": "City", name: "Surakarta" },
        { "@type": "City", name: "Yogyakarta" },
        { "@type": "City", name: "Semarang" },
        { "@type": "City", name: "Boyolali" },
        { "@type": "City", name: "Sukoharjo" },
        { "@type": "City", name: "Karanganyar" },
        { "@type": "City", name: "Wonogiri" },
        { "@type": "AdministrativeArea", name: "Jawa Tengah" },
        { "@type": "Country", name: "Indonesia" },
      ],
      sameAs: [
        "https://instagram.com/exliding",
        "https://tiktok.com/@exliding",
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "21:00",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.exliding.my.id/#website",
      url: "https://www.exliding.my.id",
      name: "Exliding",
      description:
        "Jasa pembuatan website profesional & murah di Klaten, Jawa Tengah",
      publisher: { "@id": "https://www.exliding.my.id/#business" },
      inLanguage: "id-ID",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://www.exliding.my.id/blog?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.exliding.my.id/#service",
      name: "Jasa Pembuatan Website",
      provider: { "@id": "https://www.exliding.my.id/#business" },
      serviceType: "Web Development",
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Jawa Tengah, Indonesia",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Paket Pembuatan Website",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Website Landing Page",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Website Company Profile",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Website Toko Online",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Website UMKM",
            },
          },
        ],
      },
    },
  ],
};

export default async function Home() {
  const [latestPosts, plans, testimonials, faqs] = await Promise.all([
    getLatestPostsAsync(3),
    getServices(),
    getAllTestimonialsAsync(),
    getAllFAQsAsync(),
  ]);

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <Services plans={plans} />

      {/* Portfolio Section */}
      <Portfolio />

      {/* Testimonial Section */}
      <Testimonial items={testimonials} />

      {/* FAQ Section */}
      <FAQ items={faqs} />

      {/* Blog Section */}
      <Blog posts={latestPosts} />

      {/* Footer */}
      <Footer />
    </>
  );
}