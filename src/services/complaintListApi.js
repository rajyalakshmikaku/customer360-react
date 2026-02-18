import { AxiosInstance } from "./api";

export const getComplaintsCounts = async (wardNo) => {
  const userType = sessionStorage.getItem("LoggedUserType");

  const response = await AxiosInstance.get(
    "/api/Complaints/GetComplaintsCount",
    {
      params: {
        role: userType,
        wardNo: wardNo
      }
    }
  );

  console.log("response", response);
  return response.data;
};

export const getWardInfo = async (type) => {
  const response = await AxiosInstance.post(
    "/api/Complaints/GetWardInfo",
    null,
    {
      params: {
        Type: type
      }
    }
  );

  //console.log("response", response);
  return response.data;
};

export const getUserInfo = async () => {
  const response = await AxiosInstance.get(
    `/api/Complaints/getUserInfo`
  );

  return response.data;
};


export const getComplaintsList = async ({
  pageIndex,
  pageSize,
  search,
  type,
  status,
  role,
  wardId,
  userId
}) => {
  debugger
  const response = await AxiosInstance.post(
    "/api/Complaints/GetComplaintslist",
    null,
    {
      params: {
        pageIndex,
        pageSize,
        search,
        Type: type,
        Status: status,
        Role: role,
        wardId,
        userId
      }
    }
  );

  return response.data;
};


