import { formInstance, instance } from "./axios";
import { objectToFormData } from "@/utils/form-data-helper";

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
  // Filter out null/undefined images
  const filteredImages = payload.images?.filter(img => img != null) || [];
  
  // Create a new payload with filtered images
  const cleanedPayload = {
    ...payload,
    images: filteredImages
  };
  
  // Convert to FormData
  const formData = objectToFormData(cleanedPayload);
  
  const data = await formInstance.post(`/products/seller/add`, formData);
  return data;
};

export const editProduct = async (params, payload) => {
  // Filter out null/undefined images if images array exists
  if (payload.images) {
    const filteredImages = payload.images.filter(img => img != null);
    payload = {
      ...payload,
      images: filteredImages
    };
  }
  
  // Convert to FormData
  const formData = objectToFormData(payload);
  
  const data = await formInstance.put(`/products/seller/${params}`, formData);
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