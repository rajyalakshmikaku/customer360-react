import { useState } from "react";
import ViewModal from "./ViewModal";



const ComplaintsTable = ({ category, status, wardInfo, UserInfo, ComplaintsListInfo, WardType, totalCount, onSearch, onStatusChange, approveSuccess }) => {
  const [ward, setWard] = useState("");
  const [user, setUser] = useState("");
  const [modalMode, setModalMode] = useState("");
  console.log('Ward', WardType);
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
    const daysTime = getDaysAndTime(item.CREATED_DATE);
    setSelectedItem({
      ...item,
      DAYS_TIME: daysTime,
    });
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

  const getDaysAndTime = (createdDate) => {
    if (!createdDate) return "-";

    const created = new Date(createdDate);
    const now = new Date();

    let diffMs = now - created; // difference in milliseconds

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    diffMs -= days * 1000 * 60 * 60 * 24;

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    diffMs -= hours * 1000 * 60 * 60;

    const minutes = Math.floor(diffMs / (1000 * 60));

    return `${days}D ${hours}h ${minutes}m`;
  };




  return (


    <div className="layout-container">
      <div className="layout-page">

        <div className="row mb-4">
          <div className="col-12">
            <div className="card-body">
              <div className="row g-3 align-items-end">

                <div className="col-md-3">
                  <label className="form-label fw-semibold text-teal">Ward</label>
                  <select
                    className="form-select"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                  >
                    <option value="">Select option</option>
                    {wardInfo?.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label fw-semibold text-teal">Users</label>
                  <select
                    className="form-select"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  >
                    <option value="">Select option</option>
                    {UserInfo?.map((item, index) => (
                      <option key={index} value={item.userid}>
                        {item.email}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3 d-flex gap-2">
                  <button className="btn btn-success w-50" onClick={handleSearch}>
                    Search
                  </button>

                  <button className="btn btn-warning w-50" onClick={handleClear}>
                    Clear
                  </button>
                </div>

              </div>
            </div>


          </div>
        </div>
        <div className="table-responsive">

          <table className="table table-hover table-bordered align-middle">

            <thead className="table-dark">
              <tr>
                <th>Activity</th>
                <th hidden>ID</th>
                <th>Ref No.</th>
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
                <th>Created Date</th>
                <th>No.of Days & Time</th>
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

                    <td hidden>{item.ID}</td>
                    <td>{item.REFNUMBER}</td>
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

                    <td>{new Date(item.CREATED_DATE).toLocaleDateString()}</td>
                    {/* <td>{item.EMAIL}</td> */}
                    <td>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        {/* <span>{new Date(item.CREATED_DATE).toLocaleString()}</span> */}
                        <span className="badge bg-secondary">
                          {getDaysAndTime(item.CREATED_DATE)}
                        </span>
                      </div>
                    </td>


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
          <ViewModal show={showModal} onClose={() => setShowModal(false)} WardType={category} mode={modalMode} selectedItem={selectedItem} selectedItemImages={selectedItemImages} formatDotNetDate={formatDotNetDate} formatTimeSpan={formatTimeSpan} onStatusChange={onStatusChange} approveSuccess={approveSuccess} />

        </div>
      </div>


    </div>



  );
};

export default ComplaintsTable;
