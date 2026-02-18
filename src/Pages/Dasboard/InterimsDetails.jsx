import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWardDetails } from "../../redux/wardDetailsSlice";
import "./InterimsDetails.css";
import { useNavigate } from "react-router-dom";

function InterimsDetails() {
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



                <h2>104 - Interims  Categories </h2>
                <button
                    className="back-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    <i className="fa fa-arrow-left"></i>
                    <span>Back to Dashboard</span>
                </button>
            </div>
            {/* Data Overview */}
            <div className="card debt-style">

                <div className="card-row">

                    <div className="card-left">
                        <div className="icon-circle">
                            <i className="fa fa-database"></i>
                        </div>
                        <div className="card-title">Data Overview</div>
                    </div>

                    <div className="card-right overview-data">
                        <div className="overview-item">

                            <span>Total Items</span>
                            <h3>0</h3>
                        </div>

                        <div className="overview-item">
                            <span>Ward Number</span>
                            <h3>104</h3>
                        </div>
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
                    <div class="amount">Customers : 162</div>
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
                    <div class="amount">Customers : 64</div>
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
                    <div class="amount">Customers : 11</div>
                </div>
            </div>
           
        </div>
    );
}

export default InterimsDetails;