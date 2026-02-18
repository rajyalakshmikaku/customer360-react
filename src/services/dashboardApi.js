import { AxiosInstance } from "./api";
export const getDashboardCounts = async (wardNo) => {
  const response = await AxiosInstance.post(
    `/api/CouncillorWard/${wardNo}`
  );

  console.log("response", response);
  return response.data;
};
export const getWardDetailsByType = async (wardNo, type, search = "") => {
  const response = await AxiosInstance.post(
    "/api/CouncillorWard/GetCouncillorWardDetailsIfoByWardNo",
    null, // body must be null
    {
      params: {
        WardNo: wardNo,
        type: type,
        search: search
      }
    }
  );
 console.log("API FULL RESPONSE:", response);        // full axios response
  console.log("API DATA ONLY:", response.data);   
  return response.data;
};