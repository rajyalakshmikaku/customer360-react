import { AxiosInstance } from "./api";
import { ResetURL } from "./api";
import { baseURL } from "./api";

const getApiErrorMessage = (error, fallback) => {
  const responseData = error?.response?.data;
  const status = error?.response?.status;

  if (typeof responseData === "string" && responseData.trim()) {
    return responseData;
  }

  if (responseData && typeof responseData === "object") {
    if (Array.isArray(responseData.errors) && responseData.errors.length > 0) {
      return String(responseData.errors[0]);
    }

    const validationBag = responseData.errors || responseData.Errors || responseData.ModelState;
    if (validationBag && typeof validationBag === "object") {
      const validationMessages = Object.values(validationBag)
        .flat()
        .map((entry) => (typeof entry === "string" ? entry : String(entry)))
        .filter((entry) => entry.trim());

      if (validationMessages.length > 0) {
        return validationMessages.join(" ");
      }
    }

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

const getHostCandidates = () =>
  Array.from(
    new Set([baseURL, ResetURL].filter((value) => typeof value === "string" && value.trim()))
  );

const postWithRouteFallback = async ({ endpoints, payload, fallbackMessage }) => {
  let lastError = null;

  for (const host of getHostCandidates()) {
    for (const endpoint of endpoints) {
      try {
        const response = await AxiosInstance.post(`${host}${endpoint}`, payload);
        const data = response?.data;
        const isSuccess = data?.success ?? data?.Success;
        const message = data?.message ?? data?.Message;

        if (isSuccess === false) {
          throw new Error(message || fallbackMessage);
        }

        return response.data;
      } catch (error) {
        lastError = error;

        if (error?.response?.status !== 404) {
          throw error;
        }
      }
    }
  }

  if (lastError?.response?.status === 404) {
    throw new Error(`${fallbackMessage} API endpoint not found (HTTP 404).`);
  }

  throw lastError || new Error(fallbackMessage);
};

export const forgotPassword = async (email) => {
  try {
    const normalizedEmail = email.trim();
    const appOrigin =
      typeof window !== "undefined" && window.location?.origin
        ? window.location.origin
        : ResetURL;
    const resetLink = `${appOrigin}/reset-password?email=${encodeURIComponent(
      normalizedEmail
    )}&resetCode={resetCode}`;

    return await postWithRouteFallback({
      endpoints: [
        "/api/Auth/ForgotPassword",
        "/api/Auth/forgotpassword",
        "/api/Auth/forgot-password",
        "/Auth/ForgotPassword",
        "/Auth/forgotpassword",
      ],
      payload: {
        email: normalizedEmail,
        resetLink,
      },
      fallbackMessage: "Failed to send reset link.",
    });
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to send reset link."));
  }
};

export const resetPassword = async ({ email, newPassword, confirmPassword, token, resetCode }) => {
  try {
    const normalizedEmail = email.trim();
    const confirmedPassword = confirmPassword ?? newPassword;
    const normalizedToken = typeof token === "string" ? token.trim() : "";
    const normalizedResetCode =
      typeof resetCode === "string" && resetCode.trim()
        ? resetCode.trim()
        : normalizedToken;

    return await postWithRouteFallback({
      endpoints: [
        "/api/Auth/ResetPassword",
        "/api/Auth/resetpassword",
        "/api/Auth/reset-password",
        "/Auth/ResetPassword",
        "/Auth/resetpassword",
      ],
      payload: {
        // Send common DTO variants to match different backend contracts.
        email: normalizedEmail,
        Email: normalizedEmail,
        newPassword,
        NewPassword: newPassword,
        confirmPassword: confirmedPassword,
        ConfirmPassword: confirmedPassword,
        password: newPassword,
        Password: newPassword,
        token: normalizedToken,
        Token: normalizedToken,
        code: normalizedToken,
        Code: normalizedToken,
        resetCode: normalizedResetCode,
        ResetCode: normalizedResetCode,
      },
      fallbackMessage: "Failed to reset password.",
    });
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
