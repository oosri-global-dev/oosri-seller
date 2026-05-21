import {
  deleteDataInCookie,
  getDataInCookie,
  storeDataInCookie,
  storeRefreshToken,
  getRefreshToken,
  deleteRefreshToken,
} from "@/data-helpers/auth-session";
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

// Prevents multiple simultaneous refresh calls when several requests 401 at once
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const redirectToLogin = () => {
  if (typeof window !== "undefined" && window.location.pathname !== "/login") {
    deleteDataInCookie("access_token__seller");
    deleteRefreshToken();
    window.location.href = "/login";
  }
};

const attemptTokenRefresh = async (originalConfig, axiosInstance) => {
  const storedRefreshToken = getRefreshToken();

  if (!storedRefreshToken) {
    redirectToLogin();
    return Promise.reject(new Error("No refresh token available"));
  }

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then((newToken) => {
      originalConfig.headers["Authorization"] = `Bearer ${newToken}`;
      return axiosInstance(originalConfig);
    });
  }

  originalConfig._retry = true;
  isRefreshing = true;

  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/seller/refresh-token`,
      { refreshToken: storedRefreshToken }
    );

    const newAccessToken = data.token;
    const newRefreshToken = data.refreshToken;

    storeDataInCookie("access_token__seller", newAccessToken, 1);
    if (newRefreshToken) {
      storeRefreshToken(newRefreshToken);
    }

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
    processQueue(null, newAccessToken);

    originalConfig.headers["Authorization"] = `Bearer ${newAccessToken}`;
    return axiosInstance(originalConfig);
  } catch (refreshError) {
    processQueue(refreshError, null);
    redirectToLogin();
    return Promise.reject(refreshError);
  } finally {
    isRefreshing = false;
  }
};

const attachRequestInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const userToken = getSellerAccessToken();
      if (userToken) {
        config.headers["Authorization"] = `Bearer ${userToken}`;
      } else if (config.headers?.Authorization) {
        delete config.headers.Authorization;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

const attachResponseInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalConfig = err.config;
      if (err?.response?.status === 401 && !originalConfig._retry) {
        return attemptTokenRefresh(originalConfig, axiosInstance);
      }
      return Promise.reject(err);
    }
  );
};

attachRequestInterceptor(instance);
attachResponseInterceptor(instance);

attachRequestInterceptor(formInstance);
attachResponseInterceptor(formInstance);
