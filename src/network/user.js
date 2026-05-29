import axios from "axios";
import { instance, publicInstance } from "./axios";

export const handleRegistration = async (payload) => {
  const data = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/seller/sign-up`,
    payload
  );
  return data;
};

export const handleOTP = async (payload) => {
  const data = await publicInstance.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/seller/verify-otp`,
    payload
  );
  return data;
};

export const handleResendOTP = async (payload) => {
  const data = await publicInstance.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/seller/resend-otp`,
    payload
  );
  return data;
};

export const handleLogin = async (payload) => {
  const data = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/seller/sign-in`,
    payload
  );
  return data;
};

export const handleFetchUser = async () => {
  const data = await instance.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/seller/profile`
  );
  return data;
};

export const handleForgotPassword = async (payload) => {
  const data = await publicInstance.post(
    `/auth/seller/forgot-password`,
    payload
  );
  return data;
};

export const handleResetPassword = async (payload) => {
  const data = await publicInstance.post(
    `/auth/seller/reset-password`,
    payload
  );
  return data;
};

export const handleRefreshToken = async (refreshToken) => {
  const data = await publicInstance.post(`/auth/seller/refresh-token`, { refreshToken });
  return data;
};

export const handleSignOut = async (refreshToken) => {
  const data = await publicInstance.post(`/auth/seller/sign-out`, { refreshToken });
  return data;
};

export const acceptTerms = async () => {
  const data = await instance.post(`/auth/seller/accept-terms`);
  return data;
};
