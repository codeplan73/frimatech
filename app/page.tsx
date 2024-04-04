import Hero from "./components/home/Hero";
import ProductFilter from "./components/home/ProductFilter";
import ProductCard from "./components/ProductCard";
import ProductCardGrid from "./components/ProductCardGrid";

const Home = () => {
  return (
    <div className="w-full md:w-12/12 flex flex-col gap-8">
      <Hero />
      <section className="w-[90vw] md:w-[80vw] container mx-auto md:-mt-6">
        <ProductFilter />
      </section>

      <section className="w-full px-6 md:px-16 mx-auto container grid grid-cols-1 md:grid-cols-4 gap-4 ">
        <div className="col-span-1 bg-slate-200">
          <h4>Category Section</h4>
        </div>
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 p-4">
          {/* <h4>Product Section</h4> */}

          <ProductCard
            image="/images/headset.png"
            price={500.0}
            title="headSet Pro"
          />
          <ProductCard
            image="/images/headset.png"
            price={500.0}
            title="headSet Pro"
          />
          <ProductCard
            image="/images/headset.png"
            price={500.0}
            title="headSet Pro"
          />

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
            name="Iphone 14 Pro Max"
            rating="7.5"
            link={`/items`}
          />
          <ProductCardGrid
            image="/images/laptop.png"
            price={5000}
            name="Iphone 14 Pro Max"
            rating="7.5"
            link={`/items`}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
