import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerDashboardCounts } from "../../redux/customerDashboardSlice";
import { fetchAccountMappings } from "../../redux/accountMappingSlice";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { counts, loading } = useSelector((state) => state.customerDashboard);
  const { accounts, loading: accountsLoading } = useSelector((state) => state.accountMapping);
  const { user } = useSelector((state) => state.auth);
  
  const WardNo = 0;
  const [selectedAccountNo, setSelectedAccountNo] = useState(0); // Start with "All Accounts"
  const [accountOptions, setAccountOptions] = useState([]);
  const userId = sessionStorage.getItem("LoggeduserId");

  // Fetch account mappings when component mounts
  useEffect(() => {
    // Try to get userId from different possible property names
    console.log("Detected userId:", userId);
    if (userId) {
      dispatch(fetchAccountMappings(userId));
    }
  }, [dispatch, user]);

  // Transform API response to dropdown options and include "Select All"
  useEffect(() => {
    if (accounts && accounts.length > 0) {
      const options = [
        { accountNo: 0, name: "All Accounts", isAll: true, uniqueId: "all-accounts" },
        ...accounts.map((acc) => ({
          accountNo: acc.accountNumber,
          name: `Account ${acc.accountNumber}`,
          id: acc.id,
          uniqueId: `account-${acc.id}`
        }))
      ];
      console.log("Transformed account options:", options);
      setAccountOptions(options);
      // Reset selected account to "All Accounts" when new accounts are fetched
      setSelectedAccountNo(0);
    } else {
      // Fallback to default options if no accounts are returned
      setAccountOptions([
        { accountNo: 0, name: "All Accounts", isAll: true, uniqueId: "all-accounts" }
      ]);
    }
  }, [accounts]);

  // Fetch account data when selected account changes
  useEffect(() => {
    // When "Select All" is chosen, pass all accounts for aggregation
    const payload = {
      wardNo: WardNo,
      accountNo: selectedAccountNo,
      accountsList: selectedAccountNo === 0 ? accounts : []
    };
    dispatch(fetchCustomerDashboardCounts(payload));
  }, [dispatch, selectedAccountNo, accounts]);

  const handleAccountChange = (e) => {
    setSelectedAccountNo(Number(e.target.value));
  };

  const handleNavigate = (type) => {
    const routeMap = {
      Outstanding: "/outstanding-details",
      Property: "/properties-details",
      Customer: "/customers-details",
      Meter: "/meters-details",
      Interims: "/interims-details",
      Indigent: "/indigent-details",
    };

    const route = routeMap[type] || `/details/${WardNo}/${type}`;
    navigate(route, { 
      state: { 
        accountNo: selectedAccountNo, 
        wardNo: WardNo,
        accountsList: selectedAccountNo === 0 ? accounts : []
      } 
    });
  };

  const formatNumber = (num) => {
    if (!num) return 0;
    const number = Number(num);
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    }
    return number.toLocaleString();
  };

  // Calculate total outstanding by summing all day amounts
  const totalOutstanding = (() => {
    if (!counts || !counts.outstandingData || counts.outstandingData.length === 0) {
      return 0;
    }
    const outstanding = counts.outstandingData[0];
    return (
      parseFloat(outstanding.days30Amount || 0) +
      parseFloat(outstanding.days60Amount || 0) +
      parseFloat(outstanding.days90Amount || 0) +
      parseFloat(outstanding.days120plusAmount || 0)
    );
  })();

  const propertiesCount = counts?.propertyData?.length || 0;
  const customersCount = counts?.customerData?.length || 0;
  const metersCount = counts?.meterData?.length || 0;
  const interimsCount = counts?.interimsData?.length || 0;
  const indigentCount = counts?.indigentData?.length || 0;

  const DashboardCard = ({ icon, title, value, color, onClick, clickable = true, isLoading = false }) => (
    <div
      className={`dashboard-card card-${color} ${clickable ? "clickable" : "static"}`}
      onClick={clickable && !isLoading ? onClick : undefined}
      role={clickable ? "button" : undefined}
    >
      <div className="card-top">
        <div className={`icon-box icon-${color}`}>
          <i className={`fa ${icon}`} />
        </div>
        <h4 className="card-title">{title}</h4>
      </div>
      <div className="card-middle">
        {isLoading ? (
          <div className="card-loader">
            <div className="spinner-small"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <p className="card-value">{value}</p>
        )}
      </div>
      {clickable && !isLoading && (
        <div className="card-action">
          <span>View Details</span>
          <i className="fa fa-angle-right"></i>
        </div>
      )}
    </div>
  );

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        
        {/* Header Section */}
        <div className="dashboard-header-section">
          <div className="header-wrapper">
            <div className="header-title-section">
              <div>
                <h1 className="dashboard-title">Dashboard</h1>
                <p className="dashboard-subtitle">Ward Management Analytics & Insights</p>
              </div>
            </div>
            
            <div className="header-stats-wrapper">
             
              
              <div className="stat-card items-card">
                <div className="stat-icon">
                  <i className="fa fa-mobile"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-label">Selected Account</span>
                  <span className="stat-value">
                    {selectedAccountNo === 0 ? "All Accounts" : selectedAccountNo}
                  </span>
                </div>
              </div>

              <div className="stat-card metrics-card">
                <div className="stat-icon">
                  <i className="fa fa-line-chart"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-label">Status</span>
                  <span className="stat-value">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Filter Dropdown */}
        <div className="account-filter-dropdown">
          <label htmlFor="account-select" className="filter-label">
            <i className="fa fa-filter"></i> Select Account:
          </label>
          <select 
            id="account-select"
            className="account-dropdown"
            value={selectedAccountNo}
            onChange={handleAccountChange}
            disabled={accountsLoading}
          >
            {accountsLoading ? (
              <option value="">Loading accounts...</option>
            ) : (
              accountOptions.map((account) => (
                <option key={account.uniqueId} value={account.accountNo}>
                  {account.isAll ? "Select All Accounts (Summary)" : `${account.accountNo}`}
                </option>
              ))
            )}
          </select>
          {accountsLoading && (
            <span className="account-info-badge loading">
              <i className="fa fa-spinner fa-spin"></i> Fetching your accounts...
            </span>
          )}
          {selectedAccountNo === 0 && !accountsLoading && accountOptions.length > 1 && (
            <span className="account-info-badge">
              <i className="fa fa-info-circle"></i> Showing summarized data for all accounts
            </span>
          )}
        </div>

        {/* Main Content */}
        <div className="dashboard-main">
        
          {/* Operations Section */}
          <div className="dashboard-section">
            <div className="section-header">
              <div className="section-header-left">
                <div className="section-icon-wrapper operations">
                  <i className="fa fa-building"></i>
                </div>
                <div>
                  <h2 className="section-title">Operations</h2>
                  <p className="section-subtitle">Properties, customers, and utilities management</p>
                </div>
              </div>
            </div>
            <div className="cards-grid">
               <DashboardCard
                icon="fa-money"
                title="Total Outstanding"
                value={formatNumber(totalOutstanding)}
                color="red"
                onClick={() => handleNavigate("Outstanding")}
                isLoading={loading}
              />
              <DashboardCard
                icon="fa-file-text"
                title="Interims"
                value={formatNumber(interimsCount)}
                color="purple"
                onClick={() => handleNavigate("Interims")}
                isLoading={loading}
              />
              <DashboardCard
                icon="fa-building"
                title="Properties"
                value={formatNumber(propertiesCount)}
                color="green"
                onClick={() => handleNavigate("Property")}
                isLoading={loading}
              />
              <DashboardCard
                icon="fa-users"
                title="Customers"
                value={formatNumber(customersCount)}
                color="blue"
                onClick={() => handleNavigate("Customer")}
                isLoading={loading}
              />
              <DashboardCard
                icon="fa-tachometer"
                title="Meters"
                value={formatNumber(metersCount)}
                color="orange"
                onClick={() => handleNavigate("Meter")}
                isLoading={loading}
              />
              <DashboardCard
                icon="fa-heart"
                title="Indigent Support"
                value={formatNumber(indigentCount)}
                color="red"
                onClick={() => handleNavigate("Indigent")}
                isLoading={loading}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


export default Dashboard;
