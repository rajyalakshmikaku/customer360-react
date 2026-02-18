import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardCounts } from "../../redux/dashboardSlice";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { counts, loading } = useSelector((state) => state.dashboard);

  // const wardNo="123";
  const WardNo = "104";

  useEffect(() => {
    dispatch(fetchDashboardCounts(WardNo));
    // setDashboardData(res.data); // IMPORTANT

  }, [dispatch, WardNo]);
 const handleOutstandingClick = () => {
  navigate(`/details/${WardNo}/Outstanding`);
};

  const handleinterimsClick = () => {
  navigate(`/details/${WardNo}/Interims`);
  };
  const getValue = (name) => {
    const item = counts?.find((d) => d.name === name);
    return item ? Number(item.value).toLocaleString() : 0;
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <div className="layout-page">

          {/* ROW 1 */}
          <div className="row card-row mb-1">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="summary-card border-green"
                onClick={handleOutstandingClick}
                style={{ cursor: "pointer" }}>
                <div className="icon-circle">
                  <i className="fa fa-money" />
                </div>
                <div className="summary-title">Outstanding Debt</div>
                <div className="summary-value">
                  {getValue("Outstanding Amount")}

                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="summary-card border-blue" onClick={handleinterimsClick}
                style={{ cursor: "pointer" }}>
                <div className="icon-circle">
                  <i className="fa fa-file-text" />
                </div>
                <div className="summary-title">Interims</div>
                <div className="summary-value">
                  {getValue("Interims")}

                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="summary-card border-orange">
                <div className="icon-circle">
                  <i className="fa fa-warning" />
                </div>
                <div className="summary-title">Incidents</div>
                <div className="summary-value">
                  {getValue("IMS")}

                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="summary-card border-red">
                <div className="icon-circle">
                  <i className="fa fa-tachometer" />
                </div>
                <div className="summary-title">Meters</div>
                <div className="summary-value">
                  {getValue("Water and Electricity Meters")}
                </div>
              </div>
            </div>
          </div>

          {/* ROW 2 */}
          <div className="row card-row mb-1">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="summary-card border-green">
                <div className="icon-circle">
                  <i className="fa fa-building" />
                </div>
                <div className="summary-title">Properties</div>
                <div className="summary-value">
                  {getValue("Total Properties")}
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="summary-card border-blue">
                <div className="icon-circle">
                  <i className="fa fa-users" />
                </div>
                <div className="summary-title">Customers</div>
                <div className="summary-value">
                  {getValue("Total Customers")}
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="summary-card border-orange">
                <div className="icon-circle">
                  <i className="fa fa-exclamation-triangle" />
                </div>
                <div className="summary-title">Not Read</div>
                <div className="summary-value">
                  {getValue("Not Read Meters")}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="summary-card border-orange">
                <div className="icon-circle">
                  <i className="fa fa-exclamation-triangle" />
                </div>
                <div className="summary-title">Customer 360</div>
                <div className="summary-value">
                  View Insights
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="summary-card border-orange">
                <div className="icon-circle">
                  <i className="fa fa-exclamation-triangle" />
                </div>
                <div className="summary-title">Collections</div>
                <div className="summary-value">
                  Payments
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="summary-card border-orange">
                <div className="icon-circle">
                  <i className="fa fa-exclamation-triangle" />
                </div>
                <div className="summary-title">Indigent</div>
                <div className="summary-value">
                  {getValue("Indigent")}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;