import { AxiosInstance } from "./api";

export const getUsersList = async ({
  pageIndex,
  pageSize,
  search,
  sorting
}) => {
  const response = await AxiosInstance.post(
    "/api/User/GetUsers",
    null,
  
    {
      params: {
        pageIndex,
        pageSize,
        search,
        sorting
      }
    }
  );

  return response.data;
};
