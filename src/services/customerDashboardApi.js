import { AxiosInstance } from "./api";

// Aggregate data from multiple accounts
const aggregateAccountsData = (dataArray) => {
  if (!dataArray || dataArray.length === 0) {
    return {
      outstandingData: [],
      propertyData: [],
      customerData: [],
      meterData: [],
      interimsData: [],
      indigentData: []
    };
  }

  // Aggregate outstanding data
  const outstandingData = dataArray.reduce((acc, item) => {
    if (item.outstandingData && item.outstandingData.length > 0) {
      const outstanding = item.outstandingData[0];
      acc.days30Amount = (parseFloat(acc.days30Amount || 0) + parseFloat(outstanding.days30Amount || 0)).toString();
      acc.days60Amount = (parseFloat(acc.days60Amount || 0) + parseFloat(outstanding.days60Amount || 0)).toString();
      acc.days90Amount = (parseFloat(acc.days90Amount || 0) + parseFloat(outstanding.days90Amount || 0)).toString();
      acc.days120plusAmount = (parseFloat(acc.days120plusAmount || 0) + parseFloat(outstanding.days120plusAmount || 0)).toString();
    }
    return acc;
  }, {});

  // Aggregate interims data - sum the counts
  const interimsCount = dataArray.reduce((total, item) => {
    return total + (item.interimsData?.length || 0);
  }, 0);

  // Aggregate other data by concatenating arrays
  const propertyData = dataArray.flatMap(item => item.propertyData || []);
  const customerData = dataArray.flatMap(item => item.customerData || []);
  const meterData = dataArray.flatMap(item => item.meterData || []);
  const interimsData = dataArray.flatMap(item => item.interimsData || []);
  const indigentData = dataArray.flatMap(item => item.indigentData || []);

  return {
    outstandingData: [outstandingData],
    propertyData,
    customerData,
    meterData,
    interimsData,
    indigentData
  };
};

const getSingleAccountData = async (wardNo, accountNo) => {
  const response = await AxiosInstance.get(
    "/api/Customer360/get-customer360-data",
    {
      params: {
        wardNo: wardNo,
        accountNo: accountNo,
      },
    }
  );
  return response.data;
};

export const getCustomerDashboardCounts = async (wardNo, accountNo, accountsList = []) => {
  try {
    // If accountNo is 0, fetch and aggregate data for all accounts
    if (accountNo === 0 && accountsList.length > 0) {
      const allAccountsDataPromises = accountsList.map(account =>
        getSingleAccountData(wardNo, account.accountNumber).catch(error => {
          console.error(`Error fetching data for account ${account.accountNumber}:`, error);
          return {
            outstandingData: [],
            propertyData: [],
            customerData: [],
            meterData: [],
            interimsData: [],
            indigentData: []
          };
        })
      );

      const allAccountsData = await Promise.all(allAccountsDataPromises);
      const aggregatedData = allAccountsData.map(response => response.data || response);
      const result = aggregateAccountsData(aggregatedData);
      
      console.log("Aggregated all accounts data:", result);
      return { data: result };
    }

    // For single account, fetch normally
    const response = await getSingleAccountData(wardNo, accountNo);
    console.log("customer response", response);
    return response;
  } catch (error) {
    console.error("Error fetching dashboard counts:", error);
    throw error;
  }
};