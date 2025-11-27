import { useQuery } from "@tanstack/react-query";
import { getAllOrders, getOrderDetails } from "../network/orders";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });
};

export const useOrderDetails = (id) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderDetails(id),
    enabled: !!id,
  });
};
