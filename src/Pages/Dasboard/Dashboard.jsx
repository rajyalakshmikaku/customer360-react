import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardCounts } from "../../redux/dashboardSlice";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { counts, loading } = useSelector((state) => state.dashboard);
  const WardNo = sessionStorage.getItem("LoggedWardId");

  useEffect(() => {
    dispatch(fetchDashboardCounts(WardNo));
  }, [dispatch, WardNo]);

  const handleNavigate = (type) => {
    navigate(`/details/${WardNo}/${type}`);
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

  const getValue = (name) => {
    const item = counts?.find((d) => d.name === name);
    return item ? formatNumber(item.value) : 0;
  };

  const DashboardCard = ({ icon, title, value, color, onClick, clickable = true }) => (
    <div
      className={`dashboard-card card-${color} ${clickable ? "clickable" : "static"}`}
      onClick={clickable ? onClick : undefined}
      role={clickable ? "button" : undefined}
    >
      <div className="card-top">
        <div className={`icon-box icon-${color}`}>
          <i className={`fa ${icon}`} />
        </div>
        <h4 className="card-title">{title}</h4>
      </div>
      <div className="card-middle">
        <p className="card-value">{value}</p>
      </div>
      {clickable && (
        <div className="card-action">
          <span>View Details</span>
          <i className="fa fa-angle-right"></i>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="dashboard-wrapper">
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
                  <i className="fa fa-th"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-label">Total Items</span>
                  <span className="stat-value">{counts?.length || 0}</span>
                </div>
              </div>

              <div className="stat-card metrics-card">
                <div className="stat-icon">
                  <i className="fa fa-line-chart"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-label">Metrics</span>
                  <span className="stat-value">10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-main">
          {/* Finance Section */}
          <div className="dashboard-section">
            <div className="section-header">
              <div className="section-header-left">
                <div className="section-icon-wrapper">
                  <i className="fa fa-money"></i>
                </div>
                <div>
                  <h2 className="section-title">Finances & Payments</h2>
                  <p className="section-subtitle">Outstanding debt and collection metrics</p>
                </div>
              </div>
            </div>
            <div className="cards-grid">
              <DashboardCard
                icon="fa-money"
                title="Outstanding Debt"
                value={getValue("Outstanding Amount")}
                color="green"
                onClick={() => handleNavigate("Outstanding")}
              />
              <DashboardCard
                icon="fa-file-text"
                title="Interims"
                value={getValue("Interims")}
                color="blue"
                onClick={() => handleNavigate("Interims")}
              />
              <DashboardCard
                icon="fa-credit-card"
                title="Collections"
                value="Payments"
                color="purple"
                clickable={false}
              />
              <DashboardCard
                icon="fa-arrow-right"
                title="Customer 360"
                value="View Insights"
                color="teal"
                clickable={false}
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
                value={getValue("Total Properties")}
                color="green"
                onClick={() => handleNavigate("Property")}
              />
              <DashboardCard
                icon="fa-users"
                title="Customers"
                value={getValue("Total Customers")}
                color="blue"
                onClick={() => handleNavigate("Customer")}
              />
              <DashboardCard
                icon="fa-tachometer"
                title="Meters"
                value={getValue("Water and Electricity Meters")}
                color="orange"
                onClick={() => handleNavigate("Meter")}
              />
              <DashboardCard
                icon="fa-heart"
                title="Indigent Support"
                value={getValue("Indigent")}
                color="red"
                onClick={() => handleNavigate("Indigent")}
              />
            </div>
          </div>

          {/* Issues Section */}
          <div className="dashboard-section">
            <div className="section-header">
              <div className="section-header-left">
                <div className="section-icon-wrapper issues">
                  <i className="fa fa-exclamation-circle"></i>
                </div>
                <div>
                  <h2 className="section-title">Issues & Incidents</h2>
                  <p className="section-subtitle">Reported incidents and unread meters</p>
                </div>
              </div>
            </div>
            <div className="cards-grid">
              <DashboardCard
                icon="fa-warning"
                title="Incidents (IMS)"
                value={getValue("IMS")}
                color="orange"
                onClick={() => handleNavigate("IMS")}
              />
              <DashboardCard
                icon="fa-exclamation-triangle"
                title="Meters Not Read"
                value={getValue("Not Read Meters")}
                color="red"
                onClick={() => handleNavigate("MetersNotRead")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;