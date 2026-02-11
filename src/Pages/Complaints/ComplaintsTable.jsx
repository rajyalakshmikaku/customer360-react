import { useState } from "react";

const ComplaintsTable = ({ category, status ,wardInfo,UserInfo}) => {
  const [ward, setWard] = useState("");
  const [user, setUser] = useState("");

  const handleSearch = () => {
    console.log({
      category,
      status,
      ward,
      user
    });
    // call API here
  };

  const handleClear = () => {
    setWard("");
    setUser("");
  };


  return (


    <div className="layout-container">
      <div className="layout-page">
        
        <div className="row mb-4">
          <div className="col-12">
            <div className="card-body d-flex align-items-end flex-wrap gap-3">
              <div className="me-3">
                <label className="form-label fw-semibold text-teal">Status</label>
                <input style={{ minWidth: '230px' }}
                  className="form-control"
                  value={status}
                  readOnly
                />
              </div>

              {/* WARD */}
              <div className="me-3">
                <label className="form-label fw-semibold text-teal">Ward</label>
                <select
                  style={{ minWidth: '230px' }}
                  className="form-select"
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                >
                  <option value="">Select option</option>
                  {wardInfo &&
                    wardInfo.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* USERS */}
              <div className="me-3">
                <label className="form-label fw-semibold text-teal">Users</label>
                <select
                  style={{ minWidth: '230px' }}
                  className="form-select"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                >
                  <option value="">Select option</option>
                   {UserInfo &&
                    UserInfo.map((item, index) => (
                      <option key={index} value={item.userid}>
                        {item.email}
                      </option>
                    ))}
                </select>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-success" onClick={handleSearch}>
                  <i className="bx bx-search me-1"></i> Search
                </button>

                <button className="btn btn-warning" onClick={handleClear}>
                  <i className="bx bx-reset me-1"></i> Clear
                </button>
              </div>

            </div>




            {/* ACTIONS */}

          </div>
        </div>
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
                <td>
                  <i className="fa fa-eye text-primary"></i>
                </td>
                <td>101</td>
                <td>5</td>
                <td>Water Leakage</td>
                <td>{status}</td>
                <td>admin@mail.com</td>
              </tr>
              <tr>
                <td>
                  <i className="fa fa-eye text-primary"></i>
                </td>
                <td>101</td>
                <td>5</td>
                <td>Water Leakage</td>
                <td>{status}</td>
                <td>admin@mail.com</td>
              </tr>
              <tr>
                <td>
                  <i className="fa fa-eye text-primary"></i>
                </td>
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

export default ComplaintsTable;
