import Image from "next/image";

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
}

const ProductCard = ({ title, price, image }: ProductCardProps) => {
  return (
    <div className="flex flex-col max-w-lg shadow-lg drop-shadow-lg p-4 gap-4 rounded-xl">
      <div className="relative w-full" style={{ paddingBottom: "100%" }}>
        <Image
          src={image}
          layout="fill"
          objectFit="contain"
          alt="product image"
        />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h4 className="text-xl md:text-2xl font-bold">{title}</h4>
        <p className="text-md font-semibold">
          <span className="line-through">N</span> {price}
        </p>
        <div className="flex w-full gap-2">
          <button className="text-center flex-1 py-2 rounded-full text-slate-900 bg-slate-200">
            Add to Cart
          </button>
          <button className="text-center flex-1 py-2 rounded-full text-slate-200 bg-slate-900">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
