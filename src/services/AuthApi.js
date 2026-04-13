import { AxiosInstance ,ResetURL} from "./api";


/* ---------------- ERROR HANDLER ---------------- */
const getApiErrorMessage = (error, fallback) => {
  const responseData = error?.response?.data;
  const status = error?.response?.status;

  if (typeof responseData === "string" && responseData.trim()) {
    return responseData;
  }

  if (responseData && typeof responseData === "object") {
    const validationErrors = responseData.errors || responseData.Errors;
    if (validationErrors && typeof validationErrors === "object") {
      const messages = Object.values(validationErrors)
        .flatMap((value) => (Array.isArray(value) ? value : [value]))
        .filter((value) => typeof value === "string" && value.trim());

      if (messages.length > 0) return messages[0];
    }

    const directMessage =
      responseData.message ||
      responseData.Message ||
      responseData.title ||
      responseData.detail ||
      responseData.error ||
      responseData.Error;

    if (directMessage) return directMessage;
  }

  if (!error?.response) {
    return "Server not reachable";
  }

  return `${fallback} (HTTP ${status})`;
};

/* ---------------- RESET PASSWORD (FIXED) ---------------- */
export const resetPassword = async ({ email, newPassword, confirmPassword, resetCode }) => {
  try {
    const normalizedEmail = (email || "").trim().toLowerCase();
    const normalizedResetCode = (resetCode || "").trim();

    const response = await AxiosInstance.post(
      "/api/Auth/ResetPassword",
      {
        Email: normalizedEmail,
        NewPassword: newPassword,
        ConfirmPassword: confirmPassword,
        ResetCode: normalizedResetCode,
        email: normalizedEmail,
        newPassword,
        confirmPassword,
        resetCode: normalizedResetCode,
      }
    );

    const apiData = response?.data;
    if (apiData && typeof apiData === "object") {
      const successFlag = apiData.success ?? apiData.Success;
      if (successFlag === false) {
        throw new Error(apiData.message || apiData.Message || "Failed to reset password.");
      }
    }

    return apiData;
  } catch (error) {
    throw new Error(
      getApiErrorMessage(error, "Failed to reset password.")
    );
  }
};

/* ---------------- FORGOT PASSWORD (FIXED) ---------------- */
export const forgotPassword = async (email) => {
  try {
    const normalizedEmail = email.trim();

    // const appOrigin =
    //   typeof window !== "undefined" && window.location?.origin
    //     ? window.location.origin
    //     : ResetURL;

    // const resetLink = `${appOrigin}/reset-password?email=${encodeURIComponent(
    //   normalizedEmail
    // )}`;


//const ResetURL = "http://localhost:3000";

    const response = await AxiosInstance.post(
      "/api/Auth/ForgotPassword",
      {
        email: normalizedEmail,
       ResetLink:ResetURL,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      getApiErrorMessage(error, "Failed to send reset link.")
    );
  }
};

/* ---------------- CHANGE PASSWORD ---------------- */
export const changePassword = async ({ userId, oldPassword, newPassword }) => {
  try {
    const response = await AxiosInstance.post(
      "/api/Auth/changepassword",
      null,
      {
        params: {
          userId,
          oldpassword: oldPassword,
          newpassword: newPassword,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      getApiErrorMessage(error, "Failed to change password.")
    );
  }
};