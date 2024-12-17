import { instance } from "./axios";

export const getDashboardSummary=async()=>{
    const data = await instance.get("/seller/dashboard/summary")
    return data
}
export const getDashboardOverview=async()=>{
    const data = await instance.get("/seller/dashboard/sales-overview")
    return data
}