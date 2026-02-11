import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardCounts } from "../../redux/dashboardSlice";
import "./Dashboard.css";
import { fetchComplaintsCounts } from "../../redux/complaintListSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const { counts, loading } = useSelector((state) => state.dashboard);


  const wardNo = "123";

useEffect(() => {
  dispatch(fetchDashboardCounts(wardNo));
}, [dispatch, wardNo]);
  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <div className="layout-page">

          {/* ROW 1 */}
          <div className="row card-row mb-1">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="summary-card border-green">
                <div className="icon-circle">
                  <i className="fa fa-money" />
                </div>
                <div className="summary-title">Outstanding Debt</div>
                <div className="summary-value">
                  {counts?.outstandingDebt ?? 0}
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="summary-card border-blue">
                <div className="icon-circle">
                  <i className="fa fa-file-text" />
                </div>
                <div className="summary-title">Interims</div>
                <div className="summary-value">
                  {counts?.interims ?? 0}
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
                  {counts?.incidents ?? 0}
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
                  {counts?.meters ?? 0}
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
                  {counts?.properties ?? 0}
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
                  {counts?.customers ?? 0}
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
                  {counts?.notRead ?? 0}
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