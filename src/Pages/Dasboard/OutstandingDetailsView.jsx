import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchCustomerDashboardCounts } from "../../redux/customerDashboardSlice";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { FaChartPie, FaChartBar } from "react-icons/fa";
import "./OutstandingDetailsView.css";

function OutstandingDetailsView() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { counts, loading } = useSelector((state) => state.customerDashboard);
  
  const wardNo = location.state?.wardNo || 0;
  const accountNo = location.state?.accountNo;
  const [selectedRange, setSelectedRange] = useState(null);
  const [showChart, setShowChart] = useState("pie");

  useEffect(() => {
    if (wardNo && accountNo) {
      dispatch(fetchCustomerDashboardCounts({ wardNo, accountNo }));
    }
  }, [dispatch, wardNo, accountNo]);

  const outstandingData = counts?.outstandingData?.[0] || {};

  const dayRanges = [
    {
      id: "days30",
      label: "0-30 Days",
      amount: parseFloat(outstandingData.days30Amount || 0),
      color: "#10b981",
      description: "Outstanding amount for 0-30 days",
    },
    {
      id: "days60",
      label: "31-60 Days",
      amount: parseFloat(outstandingData.days60Amount || 0),
      color: "#3b82f6",
      description: "Outstanding amount for 31-60 days",
    },
    {
      id: "days90",
      label: "61-90 Days",
      amount: parseFloat(outstandingData.days90Amount || 0),
      color: "#f59e0b",
      description: "Outstanding amount for 61-90 days",
    },
    {
      id: "days120plus",
      label: "90+ Days",
      amount: parseFloat(outstandingData.days120plusAmount || 0),
      color: "#ef4444",
      description: "Outstanding amount for 90+ days (Most critical)",
    },
  ];

  const totalOutstanding = dayRanges.reduce((sum, range) => sum + range.amount, 0);

  const pieData = dayRanges.map((range) => ({
    name: range.label,
    value: range.amount,
    percentage: totalOutstanding > 0 ? ((range.amount / totalOutstanding) * 100).toFixed(1) : 0,
  }));

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

  const handleCardClick = (range) => {
    setSelectedRange(selectedRange?.id === range.id ? null : range);
  };

  if (loading) {
    return (
      <div className="outstanding-details-container">
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading Outstanding Details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="outstanding-details-container">
      {/* Header */}
      <div className="outstanding-header">
        <div className="header-content">
          <button className="back-btn" onClick={() => navigate("/CustomerDashboard")}>
            <i className="fa fa-arrow-left"></i>
            <span>Back to Dashboard</span>
          </button>
          <div className="header-title-section">
            <h1 className="outstanding-title">Outstanding Debt Analysis</h1>
            <p className="outstanding-subtitle">Ward {wardNo} - Account {accountNo}</p>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="outstanding-summary">
        <div className="summary-card total-outstanding">
          <div className="summary-icon">
            <i className="fa fa-money"></i>
          </div>
          <div className="summary-content">
            <span className="summary-label">Total Outstanding</span>
            <h2 className="summary-value">{formatNumber(totalOutstanding)}</h2>
            <p className="summary-description">Sum of all outstanding amounts</p>
          </div>
        </div>
        
        <div className="summary-card ranges-count">
          <div className="summary-icon">
            <i className="fa fa-calendar"></i>
          </div>
          <div className="summary-content">
            <span className="summary-label">Date Ranges</span>
            <h2 className="summary-value">{dayRanges.length}</h2>
            <p className="summary-description">Different aging periods</p>
          </div>
        </div>

        <div className="summary-card critical-count">
          <div className="summary-icon">
            <i className="fa fa-exclamation-triangle"></i>
          </div>
          <div className="summary-content">
            <span className="summary-label">Critical (90+)</span>
            <h2 className="summary-value">{formatNumber(outstandingData.days120plusAmount)}</h2>
            <p className="summary-description">Amount overdue 90+ days</p>
          </div>
        </div>
      </div>

      {/* Day Range Cards */}
      <div className="day-ranges-section">
        <h2 className="section-title">Outstanding by Age</h2>
        <p className="section-description">Click on any card to view more details</p>
        
        <div className="day-ranges-grid">
          {dayRanges.map((range) => (
            <div
              key={range.id}
              className={`day-range-card ${selectedRange?.id === range.id ? "selected" : ""}`}
              onClick={() => handleCardClick(range)}
              style={{ borderTopColor: range.color }}
            >
              <div className="card-header">
                <div className="range-badge" style={{ backgroundColor: range.color }}>
                  <i className="fa fa-calendar-days"></i>
                </div>
                <h3 className="range-label">{range.label}</h3>
              </div>

              <div className="card-body">
                <div className="amount-display">
                  <span className="amount-value" style={{ color: range.color }}>
                    {formatNumber(range.amount)}
                  </span>
                  <span className="amount-unit">Amount</span>
                </div>
                <div className="percentage-display">
                  <span className="percentage-value">
                    {totalOutstanding > 0 ? ((range.amount / totalOutstanding) * 100).toFixed(1) : 0}%
                  </span>
                  <span className="percentage-label">of total</span>
                </div>
              </div>

              {selectedRange?.id === range.id && (
                <div className="card-details">
                  <p className="detail-description">{range.description}</p>
                  <div className="detail-action">
                    <button className="detail-btn">
                      <i className="fa fa-magnifying-glass"></i>
                      View Accounts
                    </button>
                  </div>
                </div>
              )}

              <div className="card-footer">
                <i className={`fa fa-chevron-${selectedRange?.id === range.id ? "up" : "down"}`}></i>
              </div>
            </div>
          ))}
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
                    {dayRanges.map((range, index) => (
                      <Cell key={`cell-${index}`} fill={range.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatNumber(value)}
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "8px" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="bar-chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={pieData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatNumber(value)} />
                  <Bar dataKey="value" fill="#4ECDC4" radius={[8, 8, 0, 0]}>
                    {dayRanges.map((range, index) => (
                      <Cell key={`cell-${index}`} fill={range.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Chart Statistics */}
        <div className="chart-stats">
          {dayRanges.map((range, index) => (
            <div key={range.id} className="stat-item" style={{ borderLeftColor: range.color }}>
              <div className="stat-dot" style={{ backgroundColor: range.color }}></div>
              <div className="stat-info">
                <span className="stat-name">{range.label}</span>
                <span className="stat-amount">{formatNumber(range.amount)}</span>
              </div>
              <div className="stat-percentage">{((range.amount / totalOutstanding) * 100).toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Table */}
      <div className="summary-table-section">
        <h2 className="section-title">Summary Table</h2>
        <div className="table-wrapper">
          <table className="summary-table">
            <thead>
              <tr>
                <th>Age Range</th>
                <th>Amount</th>
                <th>Percentage</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dayRanges.map((range) => (
                <tr key={range.id}>
                  <td>
                    <div className="table-range">
                      <span className="range-dot" style={{ backgroundColor: range.color }}></span>
                      {range.label}
                    </div>
                  </td>
                  <td className="amount-cell">{formatNumber(range.amount)}</td>
                  <td className="percentage-cell">{((range.amount / totalOutstanding) * 100).toFixed(1)}%</td>
                  <td>
                    <span className={`status-badge status-${range.id}`}>
                      {range.id === "days30" && "Normal"}
                      {range.id === "days60" && "Attention"}
                      {range.id === "days90" && "Warning"}
                      {range.id === "days120plus" && "Critical"}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="total-row">
                <td className="total-label">Total Outstanding</td>
                <td className="total-amount">{formatNumber(totalOutstanding)}</td>
                <td className="total-percentage">100%</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OutstandingDetailsView;
