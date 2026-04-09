import axios from "axios";
import alertify from "alertifyjs";

export const ResetURL = "http://localhost:5055";
//export const baseURL = "http://localhost:5055";
export const baseURL = "http://102.130.114.194:1541";
//export const baseURL = "http://102.130.114.194:1510";


export const AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =================== Logout helper ===================
export const logout = () => {
  sessionStorage.clear();
  localStorage.clear();

  alertify.alert(
    "Warning",
    "Unauthorized access. Please login again.",
    () => {
      window.location.href = "/";
    }
  );
};

// =================== Request interceptor ===================
AxiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// =================== Response interceptor ===================
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";
    const isAuthLoginRequest = requestUrl.includes("/api/Auth/Login");

    if (status === 401 && !isAuthLoginRequest) {
      logout();
    }

    return Promise.reject(error);
  }
);