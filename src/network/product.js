import { formInstance, instance } from "./axios";


export const getAllProducts=async()=>{
    const data= await instance.get("/products/seller/products")
    return data
}

export const filterAllProducts=async(params)=>{
    const data= await instance.get(`products/seller/filter?${params}`)
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
    const data = await formInstance.post(`/products/seller/add`,payload)
    return data
}

export const editProduct=async(params,payload)=>{

    const data= await instance.put(`/products/seller/${params}`,payload,{
        headers:{
            'Content-Type': 'multipart/form-data',
          }
    })
    return data
}