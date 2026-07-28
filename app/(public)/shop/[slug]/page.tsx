import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowLeft, PackageOpen, ShoppingCart, Check, Minus, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import AnimateOnEnter from "@/components/AnimateOnEnter";
import {
  getProductBySlug,
  getRelatedProducts,
  type SanityProduct,
} from "@/sanity/lib/queries";
import {urlFor} from "@/sanity/lib/image";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{slug: string}>;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {title: "Product Not Found | Frima Technology"};
  }

  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(1200).height(630).url()
    : "https://www.frimatechnology.com/images/logo.jpeg";

  return {
    title: `${product.name} | Frima Technology Shop`,
    description: `Buy ${product.name} at Frima Technology. ${formatPrice(product.price)}. Fast delivery in Benin City and across Nigeria.`,
    openGraph: {
      title: product.name,
      description: `${formatPrice(product.price)} — available now at Frima Technology.`,
      type: "website",
      url: `https://www.frimatechnology.com/shop/${slug}`,
      images: [{url: imageUrl, width: 1200, height: 630, alt: product.name}],
    },
    twitter: {
      card: "summary_large_image",
      site: "@frimatech",
      title: product.name,
      description: `${formatPrice(product.price)} — available now at Frima Technology.`,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://www.frimatechnology.com/shop/${slug}`,
    },
  };
}

function RelatedProductCard({product}: {product: SanityProduct}) {
  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(300).height(300).url()
    : null;

  return (
    <Link
      href={`/shop/${product.slug.current}`}
      className="group flex h-full flex-col rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg bg-slate-50">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-300">
            <PackageOpen className="h-8 w-8" />
          </div>
        )}
      </div>
      <h4 className="truncate text-xs font-semibold text-[#345B58]">{product.name}</h4>
      <p className="mt-0.5 text-sm font-bold text-[#345B58]">
        {formatPrice(product.price)}
      </p>
    </Link>
  );
}

export default async function ProductPage({params}: Props) {
  const {slug} = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = product.category
    ? await getRelatedProducts(product.category._id, product.slug.current)
    : [];

  const mainImageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(800).height(800).url()
    : null;

  return (
    <>
      {/* Back link + Breadcrumb */}
      <section className="bg-white pb-0 pt-8 lg:pt-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-[#345B58]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </section>

      {/* Product Detail */}
      <section className="bg-white py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Image Gallery */}
            <AnimateOnEnter>
              <div>
                <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-slate-50">
                  {mainImageUrl ? (
                    <Image
                      src={mainImageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-300">
                      <PackageOpen className="h-20 w-20" />
                    </div>
                  )}
                </div>
                {/* Thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.images.map((img, i) => {
                      const thumbUrl = urlFor(img).width(120).height(120).url();
                      return (
                        <a
                          key={i}
                          href={urlFor(img).width(800).height(800).url()}
                          className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 border-transparent bg-slate-50 transition-colors hover:border-[#345B58]"
                        >
                          <Image
                            src={thumbUrl}
                            alt={img.alt || `${product.name} image ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="80px"
                            unoptimized
                          />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </AnimateOnEnter>

            {/* Product Info */}
            <AnimateOnEnter>
              <div>
                {product.category && (
                  <span className="mb-2 inline-block text-sm font-medium text-[#345B58]/60">
                    {product.category.title}
                  </span>
                )}
                <h1 className="mb-3 text-2xl font-bold text-[#345B58] lg:text-3xl">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-3xl font-bold text-[#345B58]">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice &&
                    product.compareAtPrice > product.price && (
                      <span className="text-lg text-slate-400 line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {product.inStock ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      <Check className="h-3 w-3" /> In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Description */}
                {product.description &&
                  Array.isArray(product.description) && (
                    <div className="mb-8 text-sm leading-relaxed text-slate-600">
                      {product.description
                        .filter(
                          (block): block is Record<string, unknown> =>
                            typeof block === "object" &&
                            block !== null &&
                            (block as Record<string, unknown>)._type ===
                              "block" &&
                            Array.isArray(
                              (block as Record<string, unknown>).children,
                            ),
                        )
                        .flatMap((block) => {
                          const children = block.children as Array<{
                            text?: string;
                          }>;
                          return children.map((c) => c.text ?? "").join("");
                        })
                        .join("\n\n")}
                    </div>
                  )}

                {/* Specifications */}
                {product.specifications &&
                  product.specifications.length > 0 && (
                    <div className="mb-8">
                      <h3 className="mb-3 text-sm font-semibold text-[#345B58] uppercase tracking-wider">
                        Specifications
                      </h3>
                      <dl className="divide-y divide-slate-100 rounded-xl border border-slate-100">
                        {product.specifications.map((spec, i) => (
                          <div
                            key={i}
                            className="flex justify-between px-4 py-2.5 text-sm"
                          >
                            <dt className="text-slate-500">{spec.key}</dt>
                            <dd className="font-medium text-slate-700">
                              {spec.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}

                {/* Add to Cart */}
                <div className="border-t border-slate-200 pt-6">
                  <ProductDetailClient product={product} />
                </div>
              </div>
            </AnimateOnEnter>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section
          className="bg-[#345B58]/5 py-16 lg:py-20"
          aria-labelledby="related-heading"
        >
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <AnimateOnEnter>
              <h2
                id="related-heading"
                className="mb-8 text-2xl font-bold text-[#345B58] lg:text-3xl"
              >
                Related Products
              </h2>
            </AnimateOnEnter>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((item) => (
                <AnimateOnEnter key={item._id} delay={0.05}>
                  <RelatedProductCard product={item} />
                </AnimateOnEnter>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
