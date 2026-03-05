import { AxiosInstance } from "./api";

export const Registration = async (data) => {
  const response = await AxiosInstance.post(
    "/api/User/Registration",
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
};