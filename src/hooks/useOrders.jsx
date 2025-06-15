import { getOrders } from "@/network/order";
import { useQuery } from "@tanstack/react-query";

export const useOrders = (params = {}) => {
    return useQuery({
      queryKey: ['orders', params],
      queryFn: () => getOrders(params),
      config: {
        staleTime: 5 * 60 * 1000, 
        cacheTime: 10 * 60 * 1000,
      },
    });
  };