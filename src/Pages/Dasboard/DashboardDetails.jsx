import React, { useEffect ,useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWardDetails } from "../../redux/wardDetailsSlice";
import "./InterimsDetails.css";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FaChartPie } from "react-icons/fa";
function DashboardDetails() {
  const { wardNo, type } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
const [showChart, setShowChart] = useState(false);
  const { details, loading, error, lastFetchedWardNo, lastFetchedType } = useSelector(
    (state) => state.wardDetails
  );
const totalOutstanding = details?.reduce(
  (sum, item) => sum + Number(item.value || 0),
  0
);

const pieData = details?.map((item) => ({
  name: item.name,
  value: Number(item.value || 0),
  percentage: totalOutstanding
    ? ((item.value / totalOutstanding) * 100).toFixed(1)
    : 0,
}));
  // Format numbers to use K, M notation for values >= 1000
  const formatNumber = (num) => {
    if (!num) return '0';
    const number = Number(num);
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    }
    return number.toLocaleString();
  };

  useEffect(() => {
    if (wardNo && type) {
      // Check if data is already cached for this wardNo and type
      const isCached = 
        lastFetchedWardNo === wardNo && 
        lastFetchedType === type && 
        details?.length > 0;

      if (!isCached) {
        dispatch(fetchWardDetails({ wardNo, type }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wardNo, type]);

  /* ---------------------------------
     CONFIG BASED ON TYPE
  ---------------------------------- */

  const config = {
    Outstanding: {
      title: "Outstanding Categories",
      icon: "fa-money",
      color: "#4ECDC4",
      label: "Outstanding Debt",
    },
    Interims: {
      title: "Interims Categories",
      icon: "fa-file",
      color: "#4ECDC4",
      label: "Interim Amount",
    },
    Meter: {
      title: "otal Water and Electricity Meters",
      icon: "fa-tachometer",
      color: "#4ECDC4",
      label: "Number of Meters",
    },
    Meters: {
      title: " Total Water and Electricity Meters",
      icon: "fa-tachometer",
      color: "#4ECDC4",
      label: "Number of Meters",
    },
    Property: {
      title: "City's Total Properties",
      icon: "fa-building",
      color: "#4ECDC4",
      label: "Number of Properties",
    },
    Properties: {
      title: "City's Total Properties",
      icon: "fa-building",
      color: "#4ECDC4",
      label: "Number of Properties",
    },
    Customer: {
      title: "City's Total Customers",
      icon: "fa-users",
      color: "#4ECDC4",
      label: "Number of Customers",
    },
    Indigent: {
      title: "Indigent Support",
      icon: "fa-heart",
      color: "#4ECDC4",
      label: "Indigent Cases",
    },
    IMS: {
      title: "IMS Departments",
      icon: "fa-warning",
      color: "#4ECDC4",
      label: "Number of Incidents",
    },
    MetersNotRead: {
      title: "Meters Not Read",
      icon: "fa-exclamation-triangle",
      color: "#4ECDC4",
      label: "Not Read Count",
    },
  };

  const current = config[type];

  if (!current) return <h2>Invalid Type</h2>;

  if (loading) {
    return (
      <div className="details-container">
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading {current.title}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-container">
        <div className="error-container">
          <i className="fa fa-exclamation-circle"></i>
          <h2>Error Loading Data</h2>
          <p>{error}</p>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <i className="fa fa-arrow-left"></i> Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="details-container">
      {/* Header Section */}
      {/* <div className="details-header"> */}
        <div className="header-wrapper">
          <div className="header-left">
            {/* <div className="header-icon-wrapper">
              <i className={`fa ${current?.icon || "fa-list"}`}></i>
            </div> */}
            <div>
              {/* <h1 className="page-title">Ward {wardNo}</h1>
              <p className="page-subtitle">{current.title}</p> */}
            </div>
          </div>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <i className="fa fa-arrow-left"></i> Back to Dashboard
          </button>
        </div>
      {/* </div> */}

      {/* Summary Stats */}
      <div className="summary-section">
        <div className="summary-card total-items">
          <div className="summary-icon">
            <i className="fa fa-list-ul"></i>
          </div>
          <div className="summary-content">
            <div className="stat-label">Total Items</div>
            <div className="stat-value">{details?.length || 0}</div>
          </div>
        </div>
        <div className="summary-card ward-info">
          <div className="summary-icon">
            <i className="fa fa-map-marker"></i>
          </div>
          <div className="summary-content">
            <div className="stat-label">Ward Number</div>
            <div className="stat-value">{wardNo}</div>
          </div>
        </div>
        <div className="summary-card quick-stat">
          <div className="summary-icon">
            <i className="fa fa-list"></i>
          </div>
          <div className="summary-content">
            <div className="stat-label">Category Type</div>
            <div className="stat-value" style={{ fontSize: '16px' }}>{type}</div>
          </div>
        </div>
      </div>

      {/* Grid Layout - Responsive */}
      <div className="items-section">
        <div className="items-header">
  <div className="items-header-left">
    <h2 className="items-title">
      <span className="items-count">{details?.length || 0}</span>
      {type} Categories
    </h2>
    <p className="items-description">
      Detailed breakdown of all {type.toLowerCase()} items in this ward
    </p>
  </div>

  {type === "Outstanding" && (
    <div className="chart-toggle">
     <FaChartPie
      className="chart-icon"
      onClick={() => setShowChart(!showChart)}
      title={showChart ? "Hide Chart" : "Show Chart"}
       style={{  color: "orange",fontSize: "40px",  borderRadius: "4px", cursor: "pointer" }}
    />
    </div>
  )}
</div>
        
        <div className="items-grid">
          {details?.map((item, index) => {
            const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6'];
            const color = colors[index % colors.length];
            
            return (
              <div className="grid-item" key={index} style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="item-card" style={{ borderLeftColor: color }}>
                  <div className="item-icon-wrapper" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
                    <i className={`fa ${current?.icon || "fa-list"}`}></i>
                  </div>
                  <div className="item-content">
                    <h3 className="item-name">{item.name}</h3>
                    <div className="item-value" style={{ color: color }}>{formatNumber(item.value)}</div>
                    <p className="item-label">{current.label}</p>
                  </div>
                  <div className="card-accent" style={{ backgroundColor: color }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
     {type === "Outstanding" && showChart && (
  <div className="chart-section" style={{ marginBottom: '20px' }}>
    <div className="chart-header">
      <h2>
        <FaChartPie style={{ marginRight: "8px" }} />
        Outstanding Distribution
      </h2>
      <p>
        Total Outstanding: <strong>{formatNumber(totalOutstanding)}</strong>
      </p>
    </div>

    <div className="chart-container">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
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
  </div>
)}
    </div>
  );
}

export default DashboardDetails;