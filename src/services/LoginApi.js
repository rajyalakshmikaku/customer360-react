import { AxiosInstance } from "./api";

export const loginUser = async (credentials) => {
  try {
    const response = await AxiosInstance.post("/api/Auth/Login", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const payload = response?.data;
    const isSuccess = payload?.success ?? payload?.Success;
    const message = payload?.message ?? payload?.Message;

    if (isSuccess === false) {
      throw new Error(message || "Login failed. Please try again.");
    }

    return payload;
  } catch (error) {
    let message = "Login failed. Please try again.";

    if (error.response) {
      const data = error.response.data;
      const status = error.response.status;

      if (typeof data === "string") {
        message = data;
      } else if (data?.message || data?.Message) {
        message = data.message || data.Message;
      } else if (status === 401) {
        message = "Invalid username or password.";
      } else if (status === 404) {
        message = "Login API endpoint not found.";
      } else if (status >= 500) {
        message = "Server error while processing login.";
      } else if (error.message) {
        message = data.message;
      }
    } else if (error.code === "ERR_NETWORK" || error.request) {
      message = "Unable to connect to server. Please check your internet connection.";
    } else {
      message = error.message || message;
    }

    throw new Error(message);
  }
};


