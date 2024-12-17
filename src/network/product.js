import { instance } from "./axios";
import { publicInstance } from "./axios";


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
