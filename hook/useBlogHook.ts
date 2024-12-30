import axios from "axios";
import { useQuery } from "@tanstack/react-query";
// import { Blog } from "@prisma/client";
import { BlogSchema } from "@/schema";

export const getBlogPost = async (): Promise<(typeof BlogSchema)[]> => {
  const result = await axios.get(`/api/blog`);
  console.log(result.data);
  return result.data;
};

export const useProducts = () =>
  useQuery<(typeof BlogSchema)[]>({
    queryKey: ["posts"],
    queryFn: getBlogPost,
    // queryFn: () => axios.get("/api/products").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });
