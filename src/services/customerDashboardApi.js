import { AxiosInstance } from "./api";
export const getCustomerDashboardCounts = async (wardNo, accountNo) => {
  const response = await AxiosInstance.get(
    "/api/Customer360/get-customer360-data",
    {
      params: {
        wardNo: wardNo,
        accountNo: accountNo,
      },
    }
  );

  console.log("customer response", response);
  return response.data;
};