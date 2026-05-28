import { formInstance, instance } from "./axios";

export const UpdateProfilePicture = async (payload, params) => {
    const data = await formInstance.put(`/settings/seller/profile-picture/${params}`, payload)
    return data
}

export const UpdateProfileData = async (payload, params) => {
    const data = await formInstance.put(`/settings/seller/profile/${params}`, payload)
    return data
}

export const UpdateSellerProfile = async (payload, params) => {
    const data = await instance.put(`/settings/seller/profile/${params}`, payload)
    return data
}

export const UpdateStoreProfile = async (payload, sellerId) => {
    const data = await instance.put(`/sellers/store-profile/${sellerId}`, payload)
    return data
}

export const getBannerUploadUrl = async (fileName) => {
    const data = await instance.get(`/sellers/banner-upload-url?fileName=${fileName}`);
    return data.data;
}