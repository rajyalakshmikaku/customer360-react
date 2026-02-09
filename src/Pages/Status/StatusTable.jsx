import { useState } from "react";

const StatusTable = ({ category, status }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [ward, setWard] = useState("");
  const [user, setUser] = useState("");

  const handleSearch = () => {
    console.log({
      category,
      status,
      fromDate,
      toDate,
      ward,
      user
    });
  };

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setWard("");
    setUser("");
  };

  return (
    <div className="layout-container">
      <div className="layout-page">
        <div className="row mb-4">
          <div className="col-12">
            <div className="card-body d-flex align-items-end flex-wrap gap-3">

              {/* STATUS */}
              <div className="me-3">
                <label className="form-label fw-semibold">Status</label>
                <input
                  className="form-control"
                  value={status}
                  readOnly
                  style={{ minWidth: "230px" }}
                />
              </div>

              {/* FROM DATE */}
              <div className="me-3">
                <label className="form-label fw-semibold">From Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              {/* TO DATE */}
              <div className="me-3">
                <label className="form-label fw-semibold">To Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              {/* BUTTONS */}
              <div className="d-flex gap-2">
                <button className="btn btn-success" onClick={handleSearch}>
                  Search
                </button>
                <button className="btn btn-warning" onClick={handleClear}>
                  Clear
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Activity</th>
                <th>ID</th>
                <th>Ward</th>
                <th>Name</th>
                <th>Status</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><i className="fa fa-eye text-primary"></i></td>
                <td>101</td>
                <td>5</td>
                <td>Water Leakage</td>
                <td>{status}</td>
                <td>admin@mail.com</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default StatusTable;
