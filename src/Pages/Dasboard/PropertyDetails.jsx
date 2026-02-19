import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWardDetails } from "../../redux/wardDetailsSlice";
import "./InterimsDetails.css";
import { useNavigate } from "react-router-dom";

function PropertyDetails() {
  const dispatch = useDispatch();
      const navigate = useNavigate();
      const { wardNo, type , search} = useParams();
  
  
    useEffect(() => {
      if (wardNo && type) {
        dispatch(fetchWardDetails({ wardNo, type , search: ""}));
      }
    }, [dispatch, wardNo, type,search]);
  const { details } = useSelector((state) => state.wardDetails);
  console.log("COUNTS ARRAY:", details);
  
   const getAmount = (key) => {
    const item = details?.find((x) => x.name === key);
    return item ? Number(item.value).toLocaleString() : "0";
  };
    return (
        <div className="outstanding-container">
            <div className="page-header">



                <h2>{wardNo} - City's Total Properties </h2>
                <button
                    className="back-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    <i className="fa fa-arrow-left"></i>
                    <span>Back to Dashboard</span>
                </button>
            </div>
          
 <div className="card debt-style">

  {/* Title Row */}
  <div className="card-header">
    <div className="title-with-icon">
      <i className="fa fa-database title-icon"></i>
      <h3>Data Overview</h3>
    </div>
  </div>

  {/* Overview Row */}
  <div className="overview-row">

    <div className="overview-item">
      <div className="item-header">
        <i className="fa fa-list item-icon"></i>
        <span>Total Items</span>
      </div>
      <h3>{details.length}</h3>
    </div>

    <div className="divider"></div>

    <div className="overview-item right">
      <div className="item-header">
        <i className="fa fa-map-marker item-icon"></i>
        <span>Ward Number</span>
      </div>
      <h3>{wardNo}</h3>
    </div>

  </div>

</div>
            {/* Dynamic Category Cards */}
{details?.length > 0 ? (
  details.map((item, index) => (
    <div className="debt-card" key={index}>
      <div className="card-left">
        <div className="icon-circle">
          <i className="fa fa-building"></i>
        </div>
        <div className="card-title">
          {item.name}
        </div>
      </div>

      <div className="card-right">
        <div className="amount-label">No. of Properties</div>
        <div className="amount">
          {Number(item.value).toLocaleString()}
        </div>
      </div>
    </div>
  ))
) : (
  <p>No Data Available</p>
)}
        </div>
    );
}

export default PropertyDetails;