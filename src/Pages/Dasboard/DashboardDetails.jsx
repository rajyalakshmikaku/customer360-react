import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWardDetails } from "../../redux/wardDetailsSlice";
import "./InterimsDetails.css";

function DashboardDetails() {
  const { wardNo, type } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (wardNo && type) {
      dispatch(fetchWardDetails({ wardNo, type }));
    }
  }, [dispatch, wardNo, type]);

  const { details } = useSelector((state) => state.wardDetails);

  const getAmount = (key) => {
    const item = details?.find((x) => x.name === key);
    return item ? Number(item.value).toLocaleString() : "0";
  };

  /* ---------------------------------
     CONFIG BASED ON TYPE
  ---------------------------------- */

  const config = {
    Outstanding: {
      title: "Outstanding Categories",
      icon: "fa-money",
    
    },

    Interims: {
      title: "Interims Categories",
      icon: "fa-file",
     
    },
    
    Meters: {
      title: "Meters",
      icon: "fa-tachometer",
     
    },
  };

  const current = config[type];

  if (!current) return <h2>Invalid Type</h2>;

  return (
    <div className="details-container">

      {/* Header */}
      <div className="page-header">
        <h2>{wardNo} - {current.title}</h2>

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back
        </button>
      </div>

      {/* Overview */}
      <div className="card debt-style">
        <div className="overview-row">
          <div>
            <span>Total Items</span>
            <h3>{details?.length || 0}</h3>
          </div>

          <div className="divider"></div>

          <div style={{ textAlign: "right" }}>
            <span>Ward Number</span>
            <h3>{wardNo}</h3>
          </div>
        </div>
      </div>

    {details?.map((item, index) => (
  <div className="debt-card" key={index}>
    <div className="card-left">
      <div className="icon-circle">
        <i className={`fa ${current?.icon || "fa-list"}`}></i>
      </div>
      <div className="card-title">
        {item.name}
      </div>
    </div>

    <div className="card-right">
      <div className="amount-label">Customers</div>
      <div className="amount">
        {Number(item.value).toLocaleString()}
      </div>
    </div>
  </div>
))}

    </div>
  );
}

export default DashboardDetails;