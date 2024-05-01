import axios from "axios";
import { instance } from "./axios";

export const handleRegistration = async (payload) => {
  const data = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/seller/signup`,
    payload
  );
  return data;
};

export const handleOTP = async (payload) => {
  const data = await instance.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/seller/check-pin`,
    payload
  );
  return data;
};

export const handleLogin = async (payload) => {
  const data = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/seller/login`,
    payload
  );
  return data;
};
