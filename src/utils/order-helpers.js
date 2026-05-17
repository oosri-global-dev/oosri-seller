import { useOrders } from "@/hooks/useOrders";
import dayjs from "dayjs";

export const useOrderTableData = () => {
  const { data, isLoading } = useOrders();
  const orders = data?.data?.data || [];

  const dataSource = orders.map((order) => ({
    key:           order.id,
    id:            order.id,
    orderId:       `#${order.id?.slice(-6).toUpperCase()}`,
    itemNum:       order.products?.length || 0,
    customer:      order.userId?.fullName || "N/A",
    amount:        order.totalForSeller || 0,
    date:          order.orderDate,
    status:        order.orderStatus,
    paymentStatus: order.paymentStatus,
  }));

  return { dataSource, isLoading };
};
