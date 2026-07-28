"use client";

import {useState} from "react";
import {Search, SlidersHorizontal, X, Check} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import type {SanityProductCategory} from "@/sanity/lib/queries";

interface Props {
  categories: SanityProductCategory[];
  searchQuery: string;
  selectedCategory: string | null;
  onSearchChange: (query: string) => void;
  onCategoryChange: (categoryId: string | null) => void;
}

export default function ShopFilters({
  categories,
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const filterContent = (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#345B58]">
          Categories
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange(null)}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
              selectedCategory === null
                ? "bg-[#345B58] text-white"
                : "text-slate-600 hover:bg-slate-50 hover:text-[#345B58]"
            }`}
          >
            All Products
            {selectedCategory === null && <Check className="h-4 w-4" />}
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => onCategoryChange(cat._id)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                selectedCategory === cat._id
                  ? "bg-[#345B58] text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-[#345B58]"
              }`}
            >
              {cat.title}
              {selectedCategory === cat._id && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: sidebar */}
      <aside className="hidden w-56 flex-shrink-0 lg:block">
        <div className="sticky top-24">{filterContent}</div>
      </aside>

      {/* Mobile: filter button + slide-in sheet */}
      <div className="mb-4 flex items-center gap-3 lg:hidden">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="h-10 w-full rounded-xl border-slate-200 pl-10 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileOpen(true)}
          className="h-10 gap-1.5 border-slate-200 text-sm"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Mobile slide-in overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:hidden">
            <div className="flex items-center justify-between border-b px-4 py-4">
              <span className="text-base font-semibold text-[#345B58]">
                Filters
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto px-4 py-6">{filterContent}</div>
          </div>
        </>
      )}
    </>
  );
}
