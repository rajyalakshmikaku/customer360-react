import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWardDetails } from "../../redux/wardDetailsSlice";
import "./InterimsDetails.css";

function DashboardDetails() {
  const { wardNo, type } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { details, loading, error, lastFetchedWardNo, lastFetchedType } = useSelector(
    (state) => state.wardDetails
  );

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
      color: "#FF6B6B",
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
      color: "#45B7D1",
      label: "Number of Meters",
    },
    Meters: {
      title: " Total Water and Electricity Meters",
      icon: "fa-tachometer",
      color: "#45B7D1",
      label: "Number of Meters",
    },
    Property: {
      title: "City's Total Properties",
      icon: "fa-building",
      color: "#96CEB4",
      label: "Number of Properties",
    },
    Properties: {
      title: "City's Total Properties",
      icon: "fa-building",
      color: "#96CEB4",
      label: "Number of Properties",
    },
    Customer: {
      title: "City's Total Customers",
      icon: "fa-users",
      color: "#9B59B6",
      label: "Number of Customers",
    },
    Indigent: {
      title: "Indigent Support",
      icon: "fa-heart",
      color: "#E74C3C",
      label: "Indigent Cases",
    },
    IMS: {
      title: "IMS Departments",
      icon: "fa-warning",
      color: "#F39C12",
      label: "Number of Incidents",
    },
    MetersNotRead: {
      title: "Meters Not Read",
      icon: "fa-exclamation-triangle",
      color: "#E67E22",
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
      <div className="details-header">
        <div className="header-content">
          <div>
            <h1 className="page-title">{wardNo}</h1>
            <p className="page-subtitle">{current.title}</p>
          </div>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <i className="fa fa-arrow-left"></i> Back
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="summary-section">
        <div className="summary-card">
          <div className="stat-value">{details?.length || 0}</div>
          <div className="stat-label">Total Items</div>
        </div>
        <div className="summary-card">
          <div className="stat-value">{wardNo}</div>
          <div className="stat-label">Ward Number</div>
        </div>
      </div>

      {/* Grid Layout - 4 Columns */}
      <div className="items-grid">
        {details?.map((item, index) => (
          <div className="grid-item" key={index}>
            <div className="item-card" style={{ borderTopColor: current.color }}>
              <div className="item-icon-wrapper" style={{ backgroundColor: `${current.color}20` }}>
                <i className={`fa ${current?.icon || "fa-list"}`} style={{ color: current.color }}></i>
              </div>
              <div className="item-content">
                <h3 className="item-name">{item.name}</h3>
                <div className="item-value">{Number(item.value).toLocaleString()}</div>
                <p className="item-label">{current.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardDetails;