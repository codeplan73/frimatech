import React from "react";
import { Payment, columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f1",
      image: "/images/laptop.png",
      name: "Laptop",
      price: 100,
      category: "pending",
      quantity: 55,
    },
    {
      id: "728ed52f2",
      image: "/images/watch.png",
      name: "Watch",
      price: 100,
      category: "pending",
      quantity: 43,
    },
    {
      id: "728ed52f3",
      image: "/images/headset.png",
      name: "Headset",
      price: 100,
      category: "pending",
      quantity: 65,
    },
    {
      id: "728ed52f4",
      image: "/images/iphone-14-pro-max.jpeg",
      name: "iPhone 14 Pro Max",
      price: 100,
      category: "pending",
      quantity: 32,
    },
  ];
}

const ProductsPage = async () => {
  const data = await getData();
  return (
    <div className="container mx-auto py-10 bg-white">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ProductsPage;
