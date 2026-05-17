import { deleteDataInCookie, getDataInCookie, storeDataInCookie } from "@/data-helpers/auth-session";
import axios from "axios";

const ACCESS_TOKEN_KEY = "access_token__seller";

const getSellerAccessToken = () =>
  typeof window !== "undefined" ? getDataInCookie(ACCESS_TOKEN_KEY) : null;

const REFRESH_TOKEN_KEY = "refresh_token__seller";

const redirectToLogin = () => {
  if (typeof window !== "undefined" && window.location.pathname !== "/login") {
    deleteDataInCookie(ACCESS_TOKEN_KEY);
    deleteDataInCookie(REFRESH_TOKEN_KEY);
    window.location.replace("/login");
  }
};

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

const attachToken = (config) => {
  const token = getSellerAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete config.headers["Authorization"];
  }
  return config;
};

instance.interceptors.request.use(attachToken, (error) => Promise.reject(error));
formInstance.interceptors.request.use(attachToken, (error) => Promise.reject(error));

let refreshPromise = null;

const silentRefresh = async () => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refreshToken = typeof window !== "undefined" ? getDataInCookie(REFRESH_TOKEN_KEY) : null;
    if (!refreshToken) throw new Error("no refresh token");

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/seller/refresh-token`,
      { refreshToken }
    );

    const { token, refreshToken: newRefreshToken } = res.data;
    storeDataInCookie(ACCESS_TOKEN_KEY, token, 1);
    if (newRefreshToken) storeDataInCookie(REFRESH_TOKEN_KEY, newRefreshToken, 30);
    return token;
  })().finally(() => { refreshPromise = null; });

  return refreshPromise;
};

const handle401 = async (err) => {
  const originalConfig = err?.config;

  if (err?.response?.status === 401 && originalConfig && !originalConfig._retry) {
    originalConfig._retry = true;
    try {
      const newToken = await silentRefresh();
      originalConfig.headers["Authorization"] = `Bearer ${newToken}`;
      return axios(originalConfig);
    } catch (_) {
      redirectToLogin();
    }
  }

  return Promise.reject(err);
};

instance.interceptors.response.use((res) => res, handle401);
formInstance.interceptors.response.use((res) => res, handle401);
