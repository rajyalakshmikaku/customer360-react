import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerDashboardCounts } from "../../redux/customerDashboardSlice";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { counts, loading } = useSelector((state) => state.customerDashboard);
  
  const WardNo = 0;
  // Hardcoded account numbers for dropdown
  const linkedAccounts = [
    { accountNo: 2105186169, name: "Account 1" },
    { accountNo: 2105186170, name: "Account 2" },
    { accountNo: 2105186171, name: "Account 3" }
  ];
  
  const [selectedAccountNo, setSelectedAccountNo] = useState(linkedAccounts[0].accountNo);

  // Fetch account data when selected account changes
  useEffect(() => {
    dispatch(fetchCustomerDashboardCounts({ wardNo: WardNo, accountNo: selectedAccountNo }));
  }, [dispatch, selectedAccountNo]);

  const handleAccountChange = (e) => {
    setSelectedAccountNo(Number(e.target.value));
  };

  const handleNavigate = (type) => {
    if (type === "Outstanding") {
      navigate(`/outstanding-details`, { 
        state: { accountNo: selectedAccountNo, wardNo: WardNo } 
      });
    } else {
      navigate(`/details/${WardNo}/${type}`, { 
        state: { accountNo: selectedAccountNo, wardNo: WardNo } 
      });
    }
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
              <div className="stat-card ward-card">
                <div className="stat-icon">
                  <i className="fa fa-map-marker"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-label">Ward Number</span>
                  <span className="stat-value">{WardNo || 'N/A'}</span>
                </div>
              </div>
              
              <div className="stat-card items-card">
                <div className="stat-icon">
                  <i className="fa fa-mobile"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-label">Selected Account</span>
                  <span className="stat-value">{selectedAccountNo}</span>
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
          >
            {linkedAccounts.map((account) => (
              <option key={account.accountNo} value={account.accountNo}>
                {account.name} - {account.accountNo}
              </option>
            ))}
          </select>
        </div>

        {/* Main Content */}
        <div className="dashboard-main">
          {/* Outstanding Section */}
          <div className="dashboard-section">
            <div className="section-header">
              <div className="section-header-left">
                <div className="section-icon-wrapper">
                  <i className="fa fa-money"></i>
                </div>
                <div>
                  <h2 className="section-title">Outstanding Debt</h2>
                  <p className="section-subtitle">Amount overdue by number of days</p>
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
            </div>
          </div>

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
