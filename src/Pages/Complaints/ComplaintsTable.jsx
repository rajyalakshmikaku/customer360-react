import { useState } from "react";
import ViewModal from "./ViewModal";



const ComplaintsTable = ({ category, status, wardInfo, UserInfo, ComplaintsListInfo, WardType, totalCount, onSearch,onStatusChange  }) => {
  const [ward, setWard] = useState("");
  const [user, setUser] = useState("");
  const [modalMode, setModalMode] = useState("");
  console.log('Ward',WardType);
  const handleSearch = () => {
    onSearch(ward, user);
  };


  const handleClear = () => {
    setWard("");
    setUser("");
    onSearch("", "");
  };
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemImages, setSelectedItemImages] = useState([]);
  const [type, setType] = useState("");

  const handleView = (item, mode) => {
    setSelectedItem(item);
    setType(WardType);
    setModalMode(mode);
    setSelectedItemImages(item.Images || []); // adjust if needed
    setShowModal(true);
  };
  const formatDotNetDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTimeSpan = (timeString) => {
    if (!timeString) return "";
    return timeString.substring(0, 5); // HH:mm
  };




  return (


    <div className="layout-container">
      <div className="layout-page">

        <div className="row mb-4">
          <div className="col-12">
            <div className="card-body d-flex align-items-end flex-wrap gap-3">
              {/* <div className="me-3">
                <label className="form-label fw-semibold text-teal">Status</label>
                <input style={{ minWidth: '230px' }}
                  className="form-control"
                  value={status}
                  readOnly
                />
              </div> */}

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

          <table className="table table-hover table-bordered align-middle">

            <thead className="table-dark">
              <tr>
                <th>Activity</th>
                <th>ID</th>
                <th>Ward</th>
                {[
                  "HOTSPOT",
                  "ROADCLOSURE",
                  "MEETING",
                  "MISSINGPERSON",
                  // "HEALTH",
                   //"WARNING",
                  //"WORKSHOP",
                  
                  
                ].includes(WardType) && (
                    <th>Type</th>
                  )}
           
                <th>Details</th>
                <th>Status</th>
                <th>Created By</th>
              </tr>
            </thead>

            <tbody>
              {ComplaintsListInfo && ComplaintsListInfo.length > 0 ? (
                ComplaintsListInfo.map((item, index) => (
                  <tr key={item.ID || index}>
                   
                    <td>
                      <i
                        className="fa fa-eye text-primary me-2"
                        style={{ cursor: "pointer", color: 'blue' }}
                        onClick={() => handleView(item, "View")}
                      ></i>
                      {(item.STATUS === "Active" || item.STATUS === "Pending") && (
                        <i
                          className="fa fa-edit"
                          style={{ cursor: "pointer", color: "blue" }}
                          onClick={() => handleView(item, "edit")}
                        ></i>
                      )}
                 
                    </td>

                    <td>{item.ID}</td>
                    <td>{item.WARD_NO}</td>

                    {WardType === "HOTSPOT" && (
                      <>
                        <td>{item.CRIME_TYPE}</td>
                        <td>{item.CRIME_DETAILS}</td>
                      </>
                    )}

                    {WardType === "ROADCLOSURE" && (
                      <>
                        <td>{item.ROAD_NAME}</td>
                        <td>{item.ROADCLOUSER_DETAILS}</td>
                      </>
                    )}

                    {WardType === "MEETING" && (
                      <>
                        <td>{item.SUBJECT}</td>
                        <td>{item.MEETING_DETAILS}</td>
                      </>
                    )}

                    {WardType === "MISSINGPERSON" && (
                      <>
                        <td>{item.FULL_NAME}</td>
                        <td>{item.MISSINGPERSON_DETAILS}</td>
                      </>
                    )}

                    {WardType === "HEALTHCARE" && (
                      <td>{item.HEALTHCARE_DETAILS}</td>
                    )}

                    {WardType === "WORKSHOP" && (
                      <td>{item.WORKSHOP_DETAILS}</td>
                    )}

                    {WardType === "WARNING" && (
                      <td>{item.WARNING_DETAILS}</td>
                    )}

                    <td>{item.STATUS}</td>
                    <td>{item.EMAIL}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Users Found
                  </td>
                </tr>
              )}
            </tbody>


          </table>
          <ViewModal show={showModal} onClose={() => setShowModal(false)} WardType={category} mode={modalMode} selectedItem={selectedItem} selectedItemImages={selectedItemImages} formatDotNetDate={formatDotNetDate} formatTimeSpan={formatTimeSpan} onStatusChange={onStatusChange}/>

        </div>
      </div>


    </div>



  );
};

export default ComplaintsTable;
