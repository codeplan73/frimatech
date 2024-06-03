import Hero from "@/components/home/Hero";
import HomeProduct from "@/components/home/HomeProduct";
import Service from "@/components/home/Service";
import Newsletter from "@/components/Newsletter";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col w-full md:w-12/12">
      <Hero />

      <Service />

      <div className="w-full px-6 py-12 mx-auto space-y-8 md:px-32 bg-slate-100">
        <h4 className="container text-3xl font-bold md:text-4xl text-bgPrimary">
          Explore Our recommendations
        </h4>

        <HomeProduct />

        <div className="container">
          <Link
            href="/shop"
            className="py-3 font-sans font-semibold underline text-bgPrimary"
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
