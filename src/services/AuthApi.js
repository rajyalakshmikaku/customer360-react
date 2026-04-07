import { AxiosInstance } from "./api";
import { ResetURL } from "./api";

const getApiErrorMessage = (error, fallback) => {
  const responseData = error?.response?.data;
  const status = error?.response?.status;

  if (typeof responseData === "string" && responseData.trim()) {
    return responseData;
  }

  if (responseData && typeof responseData === "object") {
    // Supports both camelCase and PascalCase API contracts.
    const directMessage =
      responseData.message ||
      responseData.Message ||
      responseData.error ||
      responseData.Error ||
      responseData.title ||
      responseData.Title;

    if (typeof directMessage === "string" && directMessage.trim()) {
      return directMessage;
    }

    if (Array.isArray(responseData.errors) && responseData.errors.length > 0) {
      return String(responseData.errors[0]);
    }
  }

  if (!error?.response && (error?.code === "ERR_NETWORK" || error?.request)) {
    return "Unable to reach server. Please check API URL and CORS settings.";
  }

  if (typeof error?.message === "string" && error.message.trim()) {
    return error.message;
  }

  if (status) {
    return `${fallback} (HTTP ${status})`;
  }

  return fallback;
};

export const forgotPassword = async (email) => {
  try {
     const resetLink = `${ResetURL}/reset-password?email=${email}`;

    const response = await AxiosInstance.post("/api/Auth/ForgotPassword", {
      email,
      resetLink, // 🔥 send to backend
    });

    const data = response?.data;
    const isSuccess = data?.success ?? data?.Success;
    const message = data?.message ?? data?.Message;

    if (isSuccess === false) {
      throw new Error(message || "Failed to send reset link.");
    }

    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to send reset link."));
  }
};

// confirmPassword is validated on frontend only — backend only needs email + newPassword
export const resetPassword = async ({ email, newPassword }) => {
  try {
    const response = await AxiosInstance.post("/api/Auth/ResetPassword", {
      email,
      newPassword,
    });

    const data = response?.data;
    const isSuccess = data?.success ?? data?.Success;
    const message = data?.message ?? data?.Message;

    if (isSuccess === false) {
      throw new Error(message || "Failed to reset password.");
    }

    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to reset password."));
  }
};

export const changePassword = async ({ userId, oldPassword, newPassword }) => {
  try {
    const response = await AxiosInstance.post(
      "/api/Auth/changepassword",
      null,
      {
        params: {
          UserId: userId,
          oldpassword: oldPassword,
          newpassword: newPassword,
        },
      }
    );

    const data = response?.data;
    const isSuccess = data?.success ?? data?.Success;
    const message = data?.message ?? data?.Message;

    if (isSuccess === false) {
      throw new Error(message || "Failed to change password.");
    }

    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to change password."));
  }
};
