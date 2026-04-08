import { AxiosInstance } from "./api";


// export const GetStatuslist = async ({
//   pageIndex,
//   pageSize,
//   search,
//   sorting,
//   fromDate,
//   toDate,
//   status
// }) => {
//   debugger;
//   const response = await AxiosInstance.get(
//     "/api/Status/GetStatuslist",
//     {
//       params: {
//         fetch: pageSize,     // map correctly
//         offset: pageIndex,   // map correctly
//         search: search,
//         sort: sorting,       // match backend name
//         fromDate: fromDate || null,
//         toDate: toDate || null,
//         status: status || null
//       }
//     }
//   );

//   return response.data;
// };
export const GetStatuslist = async ({
  pageIndex,
  pageSize,
  search,
  sorting,
  fromDate,
  toDate,
  status
}) => {
  const response = await AxiosInstance.get("/api/Status/GetStatuslist", {
    params: {
      fetch: pageSize,
      offset: (pageIndex - 1) * pageSize,
      search,
      sort: sorting,
      fromDate: fromDate || null,
      toDate: toDate || null,
      status: status || null
    }
  });

  console.log("API RESPONSE:", response.data);

  return response.data;
};
export const PostApproveAccounts = async ({ USERID, Status }) => {
  debugger
  const response = await AxiosInstance.post(
    "/api/Status/PostApproveAccounts",
    null,
    {
      params: { USERID, Status }
    }
  );

  return response.data;
};

// export const GetStatuslist = async (params) => {
//   const response = await AxiosInstance.post(
//     "/api/Status/GetStatuslist",
//     null,
//     { params }
//   );

//   console.log("API RAW RESPONSE:", response.data);
//   return response.data;
// };
export const GetAccountlist = async (idNumber) => {
  const response = await AxiosInstance.post(
    "/api/Status/GetAccountlist",
    null,
    {
      params: { idNumber }
    }
  );

  console.log("LINK API RESPONSE:", response.data);

  return response.data;
};
export const SaveAccountNumbers = async ({ UserID, AccountNumbers }) => {
  const response = await AxiosInstance.post(
    "/api/Status/SaveAccountNumbers",
    {
      UserID,
      AccountNumbers
    }
  );

  return response.data;
};