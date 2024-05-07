import Banner from "@/components/page-banner";
import ProductCardGrid from "@/components/ProductCardGrid";
import { Link } from "lucide-react";
import React from "react";

const PostsPage = () => {
  return (
    <div className="flex flex-col gap-20">
      <Banner
        currentPage="Blog"
        title="Blog Posts"
        link="/"
        style={{ backgroundImage: "url('/img/services.png')" }}
      />

      <div className="mx-auto w-full px-6 md:px-32 space-y-8 py-12 bg-slate-100">
        <h4 className="container text-3xl md:text-4xl font-bold text-bgPrimary">
          Explore Our recommendations
        </h4>
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 p-4 py-4">
          <ProductCardGrid
            image="/images/watch.png"
            price="400"
            name="Nokix Digital Camera"
            rating="7.5"
            link={`/items`}
          />
        </div>

        <div className="container">
          <Link
            href="/shop"
            className="text-bgPrimary py-3 font-sans font-semibold underline"
          >
            View Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
