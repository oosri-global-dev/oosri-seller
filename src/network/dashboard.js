import { instance } from "./axios";

export const getDashboardSummary=async()=>{
    const data = await instance.get("/seller/dashboard/summary")
    return data
}
export const getDashboardOverview=async(params)=>{
    const data = await instance.get(`/seller/dashboard/sales-overview?period=${params}`)
    return data
}