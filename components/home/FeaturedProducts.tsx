import Link from "next/link";
import Image from "next/image";
import {ShoppingCart} from "lucide-react";
import {getFeaturedProducts, type SanityProduct} from "@/sanity/lib/queries";
import {urlFor} from "@/sanity/lib/image";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function ProductCard({product}: {product: SanityProduct}) {
  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(400).height(400).url()
    : null;

  return (
    <div className="group rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/shop/${product.slug.current}`}>
        <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-slate-50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.images[0].alt || product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-300">
              <ShoppingCart className="h-12 w-12" />
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        {product.category && (
          <span className="mb-1 inline-block text-xs font-medium text-[#345B58]/60">
            {product.category.title}
          </span>
        )}
        <Link href={`/shop/${product.slug.current}`}>
          <h3 className="mb-1 text-sm font-semibold text-[#345B58] transition-colors hover:text-[#2a4a47]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#345B58]">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="aspect-square animate-pulse rounded-t-2xl bg-slate-100" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
        <div className="h-5 w-20 animate-pulse rounded bg-slate-100" />
      </div>
    </div>
  );
}

const FeaturedProducts = async () => {
  let products: SanityProduct[] = [];
  let error = false;

  try {
    products = await getFeaturedProducts();
  } catch {
    error = true;
  }

  // If fetch failed, do not render the section at all (graceful degradation)
  if (error) return null;

  return (
    <section className="bg-white py-16 lg:py-24" aria-labelledby="products-heading">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2
              id="products-heading"
              className="mb-2 text-3xl font-bold text-[#345B58] lg:text-4xl"
            >
              Featured Products
            </h2>
            <p className="text-base text-slate-600">
              Handpicked accessories and parts our customers love.
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden text-sm font-semibold text-[#345B58] hover:underline lg:inline-block"
          >
            View All Products →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 py-16 text-center">
            <ShoppingCart className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <p className="mb-2 text-lg font-medium text-slate-500">
              New products coming soon
            </p>
            <p className="text-sm text-slate-400">
              Check back soon or{" "}
              <Link href="/shop" className="font-medium text-[#345B58] hover:underline">
                browse the full shop
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center lg:hidden">
          <Link
            href="/shop"
            className="text-sm font-semibold text-[#345B58] hover:underline"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

// Export skeleton for Suspense boundary
export {ProductSkeleton};
export const FeaturedProductsSkeleton = () => (
  <section className="bg-white py-16 lg:py-24">
    <div className="mx-auto max-w-7xl px-4 lg:px-8">
      <div className="mb-12">
        <div className="mb-2 h-8 w-64 animate-pulse rounded bg-slate-100" />
        <div className="h-5 w-96 animate-pulse rounded bg-slate-100" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({length: 8}).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  </section>
);
