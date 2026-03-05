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
      {clickable && <div className="card-action">View Details</div>}
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
          <div className="header-top">
            <div className="header-content">
              <h1 className="dashboard-title">Dashboard</h1>
              <p className="dashboard-subtitle">Ward #{WardNo} • Report & Analytics</p>
            </div>
            <div className="header-stats">
              <div className="stat-badge">
                <span className="stat-label">Total Items</span>
                <span className="stat-value">{counts?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-main">
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
              icon="fa-exchange"
              title="Customer 360"
              value="View Insights"
              color="teal"
              clickable={false}
            />
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
  );
}

export default Dashboard;