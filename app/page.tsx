import Hero from "./components/home/Hero";
import ProductFilter from "./components/home/ProductFilter";

const Home = () => {
  return (
    <div className="w-full md:w-12/12 flex flex-col gap-8">
      <Hero />
      <section className="w-[90vw] md:w-[80vw] container mx-auto md:-mt-6">
        <ProductFilter />
      </section>
    </div>
  );
};

export default Home;
