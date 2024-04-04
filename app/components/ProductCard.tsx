import Image from "next/image";

const ProductCard = () => {
  return (
    <div>
      <Image
        src="/images/hero.jpg"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <div>
        <h4 className="text-4xl md:text-6xl font-bold">Musa Shop</h4>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
          distinctio
          <br />
          vitae mollitia fuga repellat voluptas aliquid sunt saepe dolore
          corrupti.
        </p>
        <div>
          <button>Add to Cart</button>
          <button>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
