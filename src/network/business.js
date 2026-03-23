import axios from "axios";
import { formInstance, instance } from "./axios";

export const handleCreatePersonalBusiness = async (payload) => {
  const data = await formInstance.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/seller/business-registration`,
    payload
  );
  return data;
};

export const getDocumentUploadUrls = async (payload) => {
  const { data } = await instance.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/seller/get-document-upload-urls`,
    payload
  );
  return data;
};

export const handleCreateBusinessJson = async (payload) => {
  const { data } = await instance.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/seller/business-registration`,
    payload
  );
  return data;
};
