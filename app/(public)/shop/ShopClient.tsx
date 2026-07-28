"use client";

import {useState, useMemo} from "react";
import Image from "next/image";
import Link from "next/link";
import {PackageOpen, Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import AnimateOnEnter from "@/components/AnimateOnEnter";
import AddToCartButton from "./AddToCartButton";
import ShopFilters from "./ShopFilters";
import type {SanityProduct, SanityProductCategory} from "@/sanity/lib/queries";
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
    <div className="group flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/shop/${product.slug.current}`}>
        <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-slate-50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.images?.[0]?.alt || product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-300">
              <PackageOpen className="h-12 w-12" />
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        {product.category && (
          <span className="mb-1 text-xs font-medium text-[#345B58]/60">
            {product.category.title}
          </span>
        )}
        <Link href={`/shop/${product.slug.current}`}>
          <h3 className="mb-1 text-sm font-semibold text-[#345B58] transition-colors hover:text-[#2a4a47]">
            {product.name}
          </h3>
        </Link>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg font-bold text-[#345B58]">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <div className="mt-auto">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

interface Props {
  products: SanityProduct[];
  categories: SanityProductCategory[];
}

export default function ShopClient({products, categories}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = products;

    if (selectedCategory) {
      result = result.filter((p) => p.category?._id === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category?.title.toLowerCase().includes(q),
      );
    }

    return result;
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="flex gap-8">
      {/* Filters Sidebar */}
      <ShopFilters
        categories={categories}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
      />

      {/* Main Content */}
      <div className="min-w-0 flex-1">
        {/* Desktop Search Bar */}
        <div className="mb-6 hidden lg:block">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name or category..."
              className="h-10 w-full rounded-xl border-slate-200 pl-10 pr-4 text-sm"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <AnimateOnEnter>
            <div className="rounded-2xl border-2 border-dashed border-slate-200 py-16 text-center">
              <PackageOpen className="mx-auto mb-3 h-10 w-10 text-slate-300" />
              <h2 className="mb-2 text-lg font-medium text-slate-500">
                No products match your search
              </h2>
              <p className="text-sm text-slate-400">
                Try adjusting your search or clearing the filters.
              </p>
            </div>
          </AnimateOnEnter>
        ) : (
          <>
            <p className="mb-4 text-sm text-slate-400">
              Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <AnimateOnEnter key={product._id} delay={0.05}>
                  <ProductCard product={product} />
                </AnimateOnEnter>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
