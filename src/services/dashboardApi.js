import { AxiosInstance } from "./api";
export const getDashboardCounts = async (wardNo) => {
//   const response = await axios.post(
//     `${api/CouncillorWard}/${wardNo}`
//   );
const response = await AxiosInstance.post("/api/CouncillorWard/wardNo", {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("response",response)
  return response.data;
};