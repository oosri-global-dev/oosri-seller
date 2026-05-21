import { deleteDataInCookie, getDataInCookie } from "@/data-helpers/auth-session";
import axios from "axios";

const ACCESS_TOKEN_KEY = "access_token__seller";

const getSellerAccessToken = () =>
  typeof window !== "undefined" ? getDataInCookie(ACCESS_TOKEN_KEY) : null;

const redirectToLogin = () => {
  if (typeof window !== "undefined" && window.location.pathname !== "/login") {
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

// On 401, clear the stale token and send the user back to login.
// A proper silent refresh requires a backend /auth/seller/refresh-token endpoint
// which does not yet exist — this is a tracked follow-up task.
const handle401 = (err) => {
  const originalConfig = err?.config;

  if (
    err?.response?.status === 401 &&
    originalConfig &&
    !originalConfig._retry
  ) {
    originalConfig._retry = true;
    deleteDataInCookie(ACCESS_TOKEN_KEY);
    redirectToLogin();
  }

  return Promise.reject(err);
};

instance.interceptors.response.use((res) => res, handle401);
formInstance.interceptors.response.use((res) => res, handle401);
