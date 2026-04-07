import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchCustomerDashboardCounts } from "../../redux/customerDashboardSlice";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { FaChartPie, FaChartBar } from "react-icons/fa";
import "./DetailsView.css";

function MetersDetailsView() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { counts, loading } = useSelector((state) => state.customerDashboard);
  
  const wardNo = location.state?.wardNo || 0;
  const accountNo = location.state?.accountNo;
  const [showChart, setShowChart] = useState("pie");

  useEffect(() => {
    if (wardNo && accountNo) {
      dispatch(fetchCustomerDashboardCounts({ wardNo, accountNo }));
    }
  }, [dispatch, wardNo, accountNo]);

  const metersData = counts?.meterData || [];
  const totalMeters = metersData.length;

  const formatNumber = (num) => {
    if (!num) return "0";
    return Number(num).toLocaleString();
  };

  const statusColors = {
    Active: "#10b981",
    Inactive: "#ef4444",
    Maintenance: "#f59e0b",
    ReadyToRead: "#3b82f6",
  };

  // Create chart data by meter type
  const pieData = metersData.slice(0, 10).map((item, index) => ({
    name: item.meterType || `Meter ${index + 1}`,
    value: 1,
  }));

  if (loading) {
    return (
      <div className="details-view-container">
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading Meters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="details-view-container">
      {/* Header */}
      <div className="details-header">
        <div className="header-content">
          <button className="back-btn" onClick={() => navigate("/CustomerDashboard")}>
            <i className="fa fa-arrow-left"></i>
            <span>Back to Dashboard</span>
          </button>
          <div className="header-title-section">
            <h1 className="details-title">Meters Management</h1>
            <p className="details-subtitle">Ward {wardNo} - Account {accountNo}</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-section">
        <div className="summary-card total-card">
          <div className="summary-icon">
            <i className="fa fa-tachometer"></i>
          </div>
          <div className="summary-content">
            <span className="summary-label">Total Meters</span>
            <h2 className="summary-value">{formatNumber(totalMeters)}</h2>
            <p className="summary-description">All meters in this account</p>
          </div>
        </div>
      </div>

      {/* Meters Grid */}
      <div className="items-section">
        <h2 className="section-title">Meters List</h2>
        <p className="section-description">View all meters associated with this account</p>
        
        <div className="items-grid">
          {metersData.map((meter, index) => {
            const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6'];
            const color = colors[index % colors.length];
            
            return (
              <div className="grid-item" key={index} style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="item-card" style={{ borderLeftColor: color }}>
                  <div className="item-icon-wrapper" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
                    <i className="fa fa-gauge"></i>
                  </div>
                  <div className="item-content">
                    <h3 className="item-name">{meter.meterNumber || `Meter ${index + 1}`}</h3>
                    <p className="item-address">{meter.meterType || "Type not available"}</p>
                    <div className="item-details">
                      {meter.status && <span className="item-status">{meter.status}</span>}
                      {meter.reading && <span className="item-reading">Reading: {meter.reading}</span>}
                    </div>
                  </div>
                  <div className="card-accent" style={{ backgroundColor: color }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="charts-header">
          <h2 className="section-title">Visual Analysis</h2>
          <div className="chart-toggle-buttons">
            <button
              className={`toggle-btn ${showChart === "pie" ? "active" : ""}`}
              onClick={() => setShowChart("pie")}
            >
              <FaChartPie /> Pie Chart
            </button>
            <button
              className={`toggle-btn ${showChart === "bar" ? "active" : ""}`}
              onClick={() => setShowChart("bar")}
            >
              <FaChartBar /> Bar Chart
            </button>
          </div>
        </div>

        {pieData.length > 0 && (
          <div className="chart-wrapper">
            {showChart === "pie" ? (
              <div className="pie-chart-container">
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={130}
                    >
                      {pieData.map((entry, index) => {
                        const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6'];
                        return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                      })}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="bar-chart-container">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={pieData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4ECDC4" radius={[8, 8, 0, 0]}>
                      {pieData.map((entry, index) => {
                        const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6'];
                        return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Summary Table */}
      <div className="summary-table-section">
        <h2 className="section-title">Summary Table</h2>
        <div className="table-wrapper">
          <table className="summary-table">
            <thead>
              <tr>
                <th>Meter Number</th>
                <th>Meter Type</th>
                <th>Reading</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {metersData.map((meter, index) => (
                <tr key={index}>
                  <td className="meter-number">{meter.meterNumber || `Meter ${index + 1}`}</td>
                  <td>{meter.meterType || "N/A"}</td>
                  <td>{meter.reading || "N/A"}</td>
                  <td>
                    {meter.status && (
                      <span className="status-badge" style={{ backgroundColor: statusColors[meter.status] || '#ccc' }}>
                        {meter.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MetersDetailsView;
