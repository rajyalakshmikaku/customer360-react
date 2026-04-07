import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchCustomerDashboardCounts } from "../../redux/customerDashboardSlice";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { FaChartPie, FaChartBar } from "react-icons/fa";
import "./DetailsView.css";

function InterimsDetailsView() {
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

  const interimsData = counts?.interimsData || [];
  const totalInterims = interimsData.length;
  const totalAmount = interimsData.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  const formatNumber = (num) => {
    if (!num) return "0";
    const number = Number(num);
    if (number >= 1000000) {
      return (number / 1000000).toFixed(2) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(2) + "K";
    }
    return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  const statusColors = {
    Pending: "#f59e0b",
    Approved: "#10b981",
    Rejected: "#ef4444",
    Processing: "#3b82f6",
  };

  // Create chart data
  const pieData = interimsData.slice(0, 10).map((item, index) => ({
    name: item.name || `Interim ${index + 1}`,
    value: parseFloat(item.amount || 0),
  }));

  if (loading) {
    return (
      <div className="details-view-container">
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading Interims...</p>
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
            <h1 className="details-title">Interims Management</h1>
            <p className="details-subtitle">Ward {wardNo} - Account {accountNo}</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-section">
        <div className="summary-card total-card">
          <div className="summary-icon">
            <i className="fa fa-file-text"></i>
          </div>
          <div className="summary-content">
            <span className="summary-label">Total Interims</span>
            <h2 className="summary-value">{formatNumber(totalInterims)}</h2>
            <p className="summary-description">All interims in this account</p>
          </div>
        </div>

        <div className="summary-card amount-card">
          <div className="summary-icon">
            <i className="fa fa-money"></i>
          </div>
          <div className="summary-content">
            <span className="summary-label">Total Amount</span>
            <h2 className="summary-value">{formatNumber(totalAmount)}</h2>
            <p className="summary-description">Sum of all interim amounts</p>
          </div>
        </div>
      </div>

      {/* Interims Grid */}
      <div className="items-section">
        <h2 className="section-title">Interims List</h2>
        <p className="section-description">View all interim bills associated with this account</p>
        
        <div className="items-grid">
          {interimsData.map((interim, index) => {
            const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6'];
            const color = colors[index % colors.length];
            
            return (
              <div className="grid-item" key={index} style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="item-card" style={{ borderLeftColor: color }}>
                  <div className="item-icon-wrapper" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
                    <i className="fa fa-file-text-o"></i>
                  </div>
                  <div className="item-content">
                    <h3 className="item-name">{interim.name || `Interim ${index + 1}`}</h3>
                    <p className="item-amount">{formatNumber(interim.amount)}</p>
                    <div className="item-details">
                      {interim.status && <span className="item-status">{interim.status}</span>}
                      {interim.date && <span className="item-date">{interim.date}</span>}
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
                      label={({ percentage }) => `${percentage}%`}
                    >
                      {pieData.map((entry, index) => {
                        const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6'];
                        return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                      })}
                    </Pie>
                    <Tooltip formatter={(value) => formatNumber(value)} />
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
                    <Tooltip formatter={(value) => formatNumber(value)} />
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
                <th>Interim Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {interimsData.map((interim, index) => (
                <tr key={index}>
                  <td className="interim-name">{interim.name || `Interim ${index + 1}`}</td>
                  <td className="amount-cell">{formatNumber(interim.amount)}</td>
                  <td>{interim.date || "N/A"}</td>
                  <td>
                    {interim.status && (
                      <span className="status-badge" style={{ backgroundColor: statusColors[interim.status] || '#ccc' }}>
                        {interim.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              <tr className="total-row">
                <td className="total-label">Total</td>
                <td className="total-amount">{formatNumber(totalAmount)}</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InterimsDetailsView;
