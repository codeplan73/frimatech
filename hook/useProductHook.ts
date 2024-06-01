import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@prisma/client";

export const getProducts = async (): Promise<Product[]> => {
  const result = await axios.get(`/api/products`);
  console.log(result.data);
  return result.data;
};

export const useProducts = () =>
  useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
    // queryFn: () => axios.get("/api/products").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });
