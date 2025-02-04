import { formInstance } from "./axios";

export const UpdateProfilePicture=async(payload,params)=>{
    const data = await formInstance.put(`/settings/seller/profile-picture/${params}`,payload)
    return data
}