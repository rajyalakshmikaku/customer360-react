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


export const GetGISData = async (wardNo, page = 1, pageSize = 10) => {
  const response = await AxiosInstance.get("/api/User/GetGISData", {
    params: {
      wardNo: wardNo || "",
      page,
      pageSize
    }
  });

  return response.data;
};