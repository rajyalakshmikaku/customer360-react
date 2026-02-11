import axios from "axios";
import alertify from "alertifyjs";


//export const baseURL = "http://localhost:5055";
export const baseURL = "http://102.130.114.194:1510";

export const AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =================== Logout helper (optional) ===================
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
    // 🔹 No token handling at all
    return config;
  },
  (error) => Promise.reject(error)
);

// =================== Response interceptor ===================
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optional: redirect to login
      logout();
    }
    return Promise.reject(error);
  }
);
