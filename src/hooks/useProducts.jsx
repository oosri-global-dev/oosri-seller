import {
  getAllProducts,
  getProduct,
  filterAllProducts,
} from "../network/product";
import { useQuery } from "@tanstack/react-query";

export const useProducts = (filters = {}) => {
  const shouldFilter = filters && filters.keyword?.trim();
  console.log("Should filter:", shouldFilter, "Filters:", filters);
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () =>
      shouldFilter ? filterAllProducts(filters) : getAllProducts(),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProduct = (productId) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(id),
    config: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    },
  });
};
