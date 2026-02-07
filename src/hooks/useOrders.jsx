import { useQuery } from "@tanstack/react-query";
import { getAllOrders, getOrderDetails } from "../network/orders";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useOrderDetails = (id) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderDetails(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};
