import {
  getAllProducts,
  getProduct,
  filterAllProducts,
  searchProduct
} from "../network/product";
import { useQuery } from "@tanstack/react-query";

export const useProducts = (filters = {}, searchTerm = "") => {
  const isSearching = searchTerm.trim() !== "";

  return useQuery({
    queryKey: ["products", filters, searchTerm],
    queryFn: () => {
      if (isSearching) {
        return searchProduct(searchTerm);
      }
      return filterAllProducts(filters); 
    },
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
