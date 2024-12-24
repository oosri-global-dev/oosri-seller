import { instance } from "./axios";


export const getAllProducts=async()=>{
    const data= await instance.get("/products/seller/")
    return data
}

export const getProduct=async(params)=>{
    const data= await instance.get(`/products/seller/${params}`)
    return data
}

export const getCategories=async()=>{
    const data =await instance.get(`/categories`)
    return data
}

export const deleteProduct=async(params)=>{
    const data= await instance.delete(`/products/seller/${params}`)
    return data
}

export const createProduct=async(payload)=>{
    const data= await instance.post(`/products/seller/add`,payload)
    return data
}

export const editProduct=async(params,payload)=>{
    const data= await instance.post(`/products/seller/${params}`,payload)
    return data
}