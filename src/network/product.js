import { formInstance, instance } from "./axios";

export const getAllProducts = async () => {
  const data = await instance.get("/products/seller/products");
  return data;
};

export const filterAllProducts = async (params = {}) => {
  try {
    const response = await instance.get("/products/seller/filter", {
      params: {
        ...params,
        page: params.page || 1,
        limit: params.limit || 10,
      },
    });
    console.log("Filtered Products Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error filtering products:", error);
    throw error;
  }
};

export const getProduct = async (params) => {
  const data = await instance.get(`/products/seller/${params}`);
  return data;
};

export const getCategories = async () => {
  const data = await instance.get(`/categories`);
  return data;
};

export const deleteProduct = async (params) => {
  const data = await instance.delete(`/products/seller/${params}`);
  return data;
};

export const createProduct = async (payload) => {
  const data = await formInstance.post(`/products/seller/add`, payload);
  return data;
};

export const editProduct = async (params, payload) => {
  const data = await formInstance.put(`/products/seller/${params}`, payload);
  return data;
};
export const toggleProductVisibility = async (id, payload) => {
  const data = await instance.patch(
    `products/seller/${id}/visibility`,
    payload
  );
  return data;
};
