import { deleteDataInCookie, getDataInCookie } from "@/data-helpers/auth-session";
import axios from "axios";

const getSellerAccessToken = () =>
  typeof window !== "undefined"
    ? getDataInCookie("access_token__seller")
    : null;

export const publicInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const formInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const userToken = getSellerAccessToken();

    if (userToken) {
      config.headers["Authorization"] = `Bearer ${userToken}`;
    } else if (config.headers?.Authorization) {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;

    // Access Token was expired
    if (
      err?.response?.status === 401 &&
      !originalConfig._retry &&
      !!getSellerAccessToken()
    ) {
      originalConfig._retry = true;

      if (typeof window !== "undefined") {
        deleteDataInCookie("access_token__seller");
      }
      return Promise.reject(err);

      //   await getRefreshToken(refreshToken, err);
    } else {
      return Promise.reject(err);
    }
  }
);

formInstance.interceptors.request.use(
  async (config) => {
    const userToken = getSellerAccessToken();

    if (userToken) {
      config.headers["Authorization"] = `Bearer ${userToken}`;
    } else if (config.headers?.Authorization) {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

formInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;

    // Access Token was expired
    if (
      err?.response?.status === 401 &&
      !originalConfig._retry &&
      !!getSellerAccessToken()
    ) {
      originalConfig._retry = true;

      if (typeof window !== "undefined") {
        deleteDataInCookie("access_token__seller");
      }
      return Promise.reject(err);

      //   await getRefreshToken(refreshToken, err);
    } else {
      return Promise.reject(err);
    }
  }
);

// const getRefreshToken = async (token, err) => {
//   try {
//     const data = await axios.post(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
//       undefined,
//       {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }
//     );
//
//     sessionStorage.setItem("user_token", data?.data?.data?.tokens?.accessToken);
//     sessionStorage.setItem(
//       "refresh_token",
//       data?.data?.data?.tokens?.refreshToken
//     );
//
//     userToken = data?.data?.data?.tokens?.accessToken;
//     return await instance(err.config);
//   } catch (_error) {
//     if (
//       _error?.response?.status === 401 &&
//       window.location.pathname !== "/login"
//     ) {
//       window.location.pathname = "/login";
//       sessionStorage.removeItem("user_token");
//       sessionStorage.removeItem("refresh_token");
//     }
//   }
// };
