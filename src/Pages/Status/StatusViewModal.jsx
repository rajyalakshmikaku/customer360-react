import React from "react";

const StatusViewModal = ({
  show,
  onClose,
  selectedItem,
  selectedItemImages = [],
  formatDotNetDate,
  formatTimeSpan,
}) => {
  if (!show || !selectedItem) return null;

  return (
    <div className="modal fade show" style={{ display: "block", background: "#00000066" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">User Details</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <p><b>Ward:</b> {selectedItem.WARD_NO}</p>
                <p><b>Name:</b> {selectedItem.NAME}</p>
                <p><b>Surname:</b> {selectedItem.SURNAME}</p>
                <p><b>Email:</b> {selectedItem.EMAIL}</p>
              </div>

              <div className="col-md-6">
                <p><b>Cell:</b> {selectedItem.CELLNUMBER}</p>
                <p><b>Status:</b> {selectedItem.ACTIVESTATUS}</p>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StatusViewModal;
