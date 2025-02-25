import { formInstance, instance } from "./axios";

export const UpdateProfilePicture=async(payload,params)=>{
    const data = await formInstance.put(`/settings/seller/profile-picture/${params}`,payload)
    return data
}

export const UpdateProfileData=async(payload,params)=>{
    const data= await instance.put(`/settings/seller/profile/${params}`,payload)
    return data
}