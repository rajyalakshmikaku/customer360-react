import { AxiosInstance } from "./api";



export const saveRegistration = async (userdata) => {
  const response = await AxiosInstance.post(
    "/api/User/Registration",
    userdata,
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );

  return response.data;
};