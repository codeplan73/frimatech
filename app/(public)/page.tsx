import {Suspense} from "react";
import type {Metadata} from "next";
import AnimateOnEnter from "@/components/AnimateOnEnter";
import HeroCarousel from "@/components/home/HeroCarousel";
import ServicesGrid from "@/components/home/ServicesGrid";
import FeaturedProducts, {
  FeaturedProductsSkeleton,
} from "@/components/home/FeaturedProducts";
import LatestBlogPosts, {
  LatestBlogPostsSkeleton,
} from "@/components/home/LatestBlogPosts";
import TrainingHighlights from "@/components/home/TrainingHighlights";
import StatsCounter from "@/components/home/StatsCounter";
import Testimonials from "@/components/home/Testimonials";
import NewsletterCTA from "@/components/home/NewsletterCTA";
import {OrganizationJsonLd, WebsiteJsonLd} from "@/components/JsonLd";

export const revalidate = 60;

export const metadata: Metadata = {
  title:
    "Frima Technology | PC & Laptop Repairs, COMPTIA Training & Accessories",
  description:
    "Frima Technology offers expert PC and laptop repair services, COMPTIA certification training (A+, Network+, Security+), IT support for businesses, and quality computer accessories in Benin City, Nigeria.",
  keywords: [
    "PC repair Benin City",
    "laptop repair Benin City",
    "COMPTIA training Nigeria",
    "COMPTIA A+ certification",
    "COMPTIA Network+",
    "COMPTIA Security+",
    "computer accessories Nigeria",
    "IT support Benin City",
    "Frima Technology",
    "computer repair services",
    "laptop screen replacement",
    "IT training",
    "network setup",
    "cybersecurity training",
    "computer sales Nigeria",
  ],
  openGraph: {
    title:
      "Frima Technology | PC & Laptop Repairs, COMPTIA Training & Accessories",
    description:
      "Expert PC and laptop repairs, COMPTIA certification training, IT support, and quality computer accessories in Benin City.",
    type: "website",
    url: "https://www.frimatechnology.com",
    images: [
      {
        url: "https://www.frimatechnology.com/images/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Frima Technology — Repairs, Training, and Accessories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@frimatech",
    title:
      "Frima Technology | PC & Laptop Repairs, COMPTIA Training & Accessories",
    description:
      "Expert PC and laptop repairs, COMPTIA certification training, IT support, and quality computer accessories in Benin City.",
    images: ["https://www.frimatechnology.com/images/logo.jpeg"],
  },
  alternates: {
    canonical: "https://www.frimatechnology.com",
  },
};

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <HeroCarousel />
      <ServicesGrid />
      <AnimateOnEnter>
        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </AnimateOnEnter>
      <AnimateOnEnter>
        <Suspense fallback={<LatestBlogPostsSkeleton />}>
          <LatestBlogPosts />
        </Suspense>
      </AnimateOnEnter>
      <TrainingHighlights />
      <StatsCounter />
      <Testimonials />
      <NewsletterCTA />
    </>
  );
}
