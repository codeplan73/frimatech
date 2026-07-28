import type {Metadata} from "next";
import AnimateOnEnter from "@/components/AnimateOnEnter";
import {
  getAllProducts,
  getProductCategories,
} from "@/sanity/lib/queries";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop | Computer Accessories, Parts & Repairs | Frima Technology",
  description:
    "Browse our selection of genuine computer accessories, replacement parts, cables, adapters, peripherals, and repair services at competitive prices in Benin City.",
  keywords: [
    "computer accessories Nigeria",
    "laptop parts Benin City",
    "computer repair shop",
    "buy computer accessories",
    "replacement laptop screen",
    "computer cables and adapters",
    "Frima Technology shop",
  ],
  openGraph: {
    title: "Shop | Computer Accessories, Parts & Repairs | Frima Technology",
    description:
      "Browse genuine computer accessories, parts, and repair services at competitive prices.",
    type: "website",
    url: "https://www.frimatechnology.com/shop",
    images: [
      {
        url: "https://www.frimatechnology.com/images/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Frima Technology Shop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@frimatech",
    title: "Shop | Computer Accessories, Parts & Repairs | Frima Technology",
    description:
      "Browse genuine computer accessories, parts, and repair services at competitive prices.",
    images: ["https://www.frimatechnology.com/images/logo.jpeg"],
  },
  alternates: {
    canonical: "https://www.frimatechnology.com/shop",
  },
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getProductCategories(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#345B58] via-[#345B58] to-[#2a8a7e] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <AnimateOnEnter>
            <h1 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
              Shop
            </h1>
            <p className="mx-auto max-w-2xl text-base text-white/80 lg:text-lg">
              Browse our selection of genuine computer accessories, replacement
              parts, and repair tools at competitive prices with fast delivery.
            </p>
          </AnimateOnEnter>
        </div>
      </section>

      {/* Products with Filters */}
      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {products.length === 0 ? (
            <AnimateOnEnter>
              <div className="rounded-2xl border-2 border-dashed border-slate-200 py-16 text-center">
                <h2 className="mb-2 text-lg font-medium text-slate-500">
                  No products available yet
                </h2>
                <p className="text-sm text-slate-400">
                  Our inventory is being updated. Check back soon.
                </p>
              </div>
            </AnimateOnEnter>
          ) : (
            <ShopClient products={products} categories={categories} />
          )}
        </div>
      </section>
    </>
  );
}
