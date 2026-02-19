import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWardDetails } from "../../redux/wardDetailsSlice";
import "./InterimsDetails.css";
import { useNavigate } from "react-router-dom";

function MeterDetails() {
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



                <h2>{wardNo} - Total Water and Electricity Meters</h2>
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
            {/* 30 Days */}
            <div class="debt-card">
                <div class="card-left">
                    <div class="icon-circle">
                        <i class="fa fa-file"></i>
                    </div>
                    <div class="card-title">Category 1 :4-6 months</div>
                </div>

                <div class="card-right">
                    <div class="amount-label">Amount</div>
                    <div class="amount">Customers : {getAmount("1 : 4-6")}</div>
                </div>
            </div>
            {/* 60 Days */}
            {/* 30 Days */}
            <div class="debt-card">
                <div class="card-left">
                    <div class="icon-circle">
                        <i class="fa fa-file"></i>
                    </div>
                    <div class="card-title">Category 2:7-12 months</div>
                </div>

                <div class="card-right">
                    <div class="amount-label">Amount</div>
                    <div class="amount">Customers : {getAmount("2 : 7-12")}</div>
                </div>
            </div>
            {/* 90 Days */}
            {/* 30 Days */}
            <div class="debt-card">
                <div class="card-left">
                    <div class="icon-circle">
                        <i class="fa fa-file"></i>
                    </div>
                    <div class="card-title">Category 3:13-24 months</div>
                </div>

                <div class="card-right">
                    <div class="amount-label">Amount</div>
                    <div class="amount">Customers : {getAmount("3 : 13-24")}</div>
                </div>
            </div>
           
        </div>
    );
}

export default MeterDetails;