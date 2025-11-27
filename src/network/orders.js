import { instance } from "./axios";

export const getAllOrders = async () => {
  const data = await instance.get("/seller/order");
  return data;
};

export const getOrderDetails = async (id) => {
  const data = await instance.get(`/seller/order/${id}`);
  return data;
};

