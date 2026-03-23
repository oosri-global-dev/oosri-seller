import { formInstance, instance } from "./axios";
import { objectToFormData } from "@/utils/form-data-helper";

export const getAllProducts = async () => {
  const data = await instance.get("/products/seller/products");
  return data;
};

export const getUploadUrl = async (fileName) => {
  const data = await instance.get(`/products/seller/upload-url?fileName=${fileName}`);
  return data.data;
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
  // Payload should now contain { ...data, images: [url1, url2] }
  // Send as JSON
  const data = await instance.post(`/products/seller/add`, payload);
  return data;
};

export const editProduct = async (params, payload) => {
  // Payload should now contain { ...data, images: [url1, url2], newImages: [url3] }
  // Send as JSON
  const data = await instance.put(`/products/seller/${params}`, payload);
  return data;
};
export const toggleProductVisibility = async (id, payload) => {
  const data = await instance.patch(
    `products/seller/${id}/visibility`,
    payload
  );
  return data;
};

export const searchProduct = async (searchTerm) => {
  try {
    const response = await instance.get(`/products/seller/search?q=${searchTerm}`);
    return response;
  } catch (error) {
    console.error("Error filtering products:", error);
    throw error;
  }

} 