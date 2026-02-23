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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Filters Section */}
      <div className="complaints-filters">
        <div className="filter-group">
          <label>🏢 Ward</label>
          <select
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

        <div className="filter-group">
          <label>👤 Users</label>
          <select
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

        <div className="filter-group">
          <label>&nbsp;</label>
          <div className="filter-buttons">
            <button className="btn-search" onClick={handleSearch}>
              <i className="fa fa-search"></i> Search
            </button>
            <button className="btn-clear" onClick={handleClear}>
              <i className="fa fa-refresh"></i> Clear
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div style={{ overflowX: 'auto' }}>
        <table className="complaints-table">
          <thead>
            <tr>
              <th width="10%">Activity</th>
              <th hidden>ID</th>
              <th width="12%">Ref No.</th>
              <th width="10%">Ward</th>
              <th width="15%">Status</th>
              {[
                "HOTSPOT",
                "ROADCLOSURE",
                "MEETING",
                "MISSINGPERSON",
              ].includes(WardType) && (
                <th width="15%">Type</th>
              )}
              <th width="20%">Details</th>
              <th width="12%">Created Date</th>
              <th width="12%">Time Elapsed</th>
            </tr>
          </thead>
          <tbody>
            {ComplaintsListInfo && ComplaintsListInfo.length > 0 ? (
              ComplaintsListInfo.map((item, index) => (
                <tr key={item.ID || index}>
                  <td>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <i
                        className="fa fa-eye"
                        style={{ cursor: "pointer", color: '#0d9488', fontSize: '16px' }}
                        onClick={() => handleView(item, "View")}
                        title="View details"
                      ></i>
                      {(item.STATUS === "Active" || item.STATUS === "Pending") && (
                        <i
                          className="fa fa-pencil"
                          style={{ cursor: "pointer", color: '#f97316', fontSize: '16px' }}
                          onClick={() => handleView(item, "edit")}
                          title="Edit complaint"
                        ></i>
                      )}
                    </div>
                  </td>
                  <td hidden>{item.ID}</td>
                  <td><strong>{item.REFNUMBER}</strong></td>
                  <td>{item.WARD_NO}</td>
                  <td>
                    <span className={`status-badge ${item.STATUS?.toLowerCase()}`}>
                      {item.STATUS}
                    </span>
                  </td>

                  {WardType === "HOTSPOT" && (
                    <>
                      <td><strong>{item.CRIME_TYPE}</strong></td>
                      <td>{item.CRIME_DETAILS}</td>
                    </>
                  )}

                  {WardType === "ROADCLOSURE" && (
                    <>
                      <td><strong>{item.ROAD_NAME}</strong></td>
                      <td>{item.ROADCLOUSER_DETAILS}</td>
                    </>
                  )}

                  {WardType === "MEETING" && (
                    <>
                      <td><strong>{item.SUBJECT}</strong></td>
                      <td>{item.MEETING_DETAILS}</td>
                    </>
                  )}

                  {WardType === "MISSINGPERSON" && (
                    <>
                      <td><strong>{item.FULL_NAME}</strong></td>
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

                  {/* Fallback for types without Type column */}
                  {!["HOTSPOT", "ROADCLOSURE", "MEETING", "MISSINGPERSON"].includes(WardType) && (
                    <td>-</td>
                  )}

                  <td>
                    {new Date(item.CREATED_DATE).toLocaleDateString()}
                  </td>
                  <td>
                    <span className="time-elapsed-badge">
                      <i className="fa fa-clock-o"></i>
                      {getDaysAndTime(item.CREATED_DATE)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '24px', color: '#9ca3af' }}>
                  <i className="fa fa-inbox" style={{ fontSize: '32px', marginBottom: '8px', display: 'block' }}></i>
                  <strong>No results found</strong>
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>

      <ViewModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        WardType={category} 
        mode={modalMode} 
        selectedItem={selectedItem} 
        selectedItemImages={selectedItemImages} 
        formatDotNetDate={formatDotNetDate} 
        formatTimeSpan={formatTimeSpan} 
        onStatusChange={onStatusChange} 
        approveSuccess={approveSuccess} 
      />
    </div>
  );
};

export default ComplaintsTable;
