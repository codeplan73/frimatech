import Hero from "@/components/home/Hero";
import ProductFilter from "@/components/home/ProductFilter";
import Service from "@/components/home/Service";
import Newsletter from "@/components/Newsletter";
import ProductCard from "@/components/ProductCard";
import ProductCardGrid from "@/components/ProductCardGrid";
import Link from "next/link";

const Home = () => {
  return (
    <div className="w-full md:w-12/12 flex flex-col">
      <Hero />

      <Service />
      {/* <section className="w-[90vw] md:w-[80vw] container mx-auto md:-mt-6">
        <ProductFilter />
      </section> */}

      <div className="mx-auto w-full px-6 md:px-32 space-y-8 py-12 bg-slate-100">
        <h4 className="container text-3xl md:text-4xl font-bold text-bgPrimary">
          Explore Our recommendations
        </h4>
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 p-4 py-4">
          <ProductCardGrid
            image="/images/watch.png"
            price={1400}
            name="Nokix Digital Camera"
            rating="7.5"
            link={`/items`}
          />
          <ProductCardGrid
            image="/images/headset.png"
            price={5000}
            name="Headset Pro"
            rating="7.5"
            link={`/items`}
          />
          <ProductCardGrid
            image="/images/laptop.png"
            price={5000}
            name="Macbook Pro 2020"
            rating="7.5"
            link={`/items`}
          />
          <ProductCardGrid
            image="/images/iphone-14-pro-max.jpeg"
            price={5000}
            name="Iphone 14 Pro Max"
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

      <Newsletter />
    </div>
  );
};

export default Home;
