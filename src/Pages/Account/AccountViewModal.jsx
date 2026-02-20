import React, { useState } from "react";
import ReactDOM from "react-dom";

const AccountViewModal = ({
    show,
    onClose,
    selectedItem,
    mode,
    WardType,
    onStatusChange,
    setShowRejectModal,
    approveLoading,
    showRejectModal
}) => {
    const [rejectComment, setRejectComment] = useState("");

    if (!show || !selectedItem) return null;


    return (
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content shadow-lg">

                    <div className="modal-header bg-light">

                        <h5 className="modal-title">Account Details
                            {mode === "edit" ? "Edit" : "View"} 
                        </h5>

                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={onClose}
                            style={{ width: "35px", height: "35px", padding: 0 }}
                        >
                            <i className="bx bx-x" style={{ fontSize: "18px" }}></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">

                            <table className="table table-borderless mb-3">
                                <tbody>

                                    {/* COMMON FIELDS */}
                                    <tr>
                                        <td><b>REF NO</b></td>
                                        <td>: {selectedItem?.USERREFNUMBER}</td>
                                    </tr>

                                    {/* <tr>
                                        <td><b>Ward No.</b></td>
                                        <td>: {selectedItem?.WARD_NO}</td>
                                    </tr> */}

                                    <tr>
                                        <td><b>NAME</b></td>
                                        <td>: {selectedItem?.NAME}</td>
                                    </tr>
                                    <tr>
                                        <td><b>SURNAME</b></td>
                                        <td>: {selectedItem?.SURNAME}</td>
                                    </tr>
                                    <tr>
                                        <td><b>EMAIL</b></td>
                                        <td>: {selectedItem?.EMAIL}</td>
                                    </tr>
                                    <tr>
                                        <td><b>PHONE NUMBER</b></td>
                                        <td>: {selectedItem?.PHONENUMBER}</td>
                                    </tr>
                                    {/* <tr>
                                        <td><b>GENDER</b></td>
                                        <td>: {selectedItem?.GENDER}</td>
                                    </tr> */}
                                    <tr>
                                        <td><b>ACTIVE STATUS</b></td>
                                        <td>
                                            :{" "}
                                            {(() => {
                                                const raw = selectedItem?.ACTIVESTATUS;
                                                const value =
                                                    typeof raw === "object" ? raw?.STATUSNAME : raw;

                                                const normalized = String(value || "")
                                                    .trim()
                                                    .toLowerCase();

                                                if (normalized === "y" || normalized === "active") {
                                                    return <span className="badge bg-success">Active</span>;
                                                }
                                                if (normalized === "p" || normalized === "pending") {
                                                    return <span className="badge bg-warning text-dark">Pending</span>;
                                                }
                                                if (normalized === "n" || normalized === "inactive") {
                                                    return <span className="badge bg-danger">Inactive</span>;
                                                }

                                                return value || "-";
                                            })()}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>CREATED DATE</b></td>
                                        <td>: {selectedItem?.CREATEDDATE}</td>
                                    </tr>

                                    <tr>
                                        <td><b>USER TYPE</b></td>
                                        <td>
                                            :{" "}
                                            {(() => {
                                                const raw = selectedItem?.USERTYPE;
                                                const value =
                                                    typeof raw === "object" ? raw?.TYPENAME : raw;

                                                const normalized = String(value || "")
                                                    .trim()
                                                    .toLowerCase();

                                                if (normalized === "c" || normalized === "councilour") {
                                                    return "Councilor";
                                                }

                                                if (normalized === "a" || normalized === "admin") {
                                                    return "Admin";
                                                }

                                                if (normalized === "u" || normalized === "user") {
                                                    return "User";
                                                }

                                                return value || "-";
                                            })()}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>ADDRESS </b></td>
                                        <td>: {selectedItem?.ADDRESS}</td>
                                    </tr>
                                    <tr>
                                        <td><b>CITY </b></td>
                                        <td>: {selectedItem?.CITY}</td>
                                    </tr>
                                    <tr>
                                        <td><b>DISTRICT NAME</b></td>
                                        <td>: {selectedItem?.DISTRICT_NAME}</td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>
                    </div>

                    {mode === "edit" && selectedItem && (
  <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">

    {/* APPROVE only if Pending (P) */}
    {selectedItem.ACTIVESTATUS === "P" && (
      <button
        type="button"
        className="btn btn-success btn-sm"
        onClick={() =>
          onStatusChange(selectedItem.ID, "APPROVE", WardType)
        }
      >
        {approveLoading ? (
          <>
            <i className="fa fa-spinner fa-spin"></i> Approve
          </>
        ) : (
          "Approve"
        )}
      </button>
    )}

    {/* COMPLETE only if Active (Y) */}
    {selectedItem.ACTIVESTATUS === "Y" && (
      <button
        type="button"
        disabled={approveLoading}
        className="btn btn-success btn-sm"
        onClick={() =>
          onStatusChange(selectedItem.ID, "COMPLETED", WardType)
        }
      >
        {approveLoading ? (
          <>
            <i className="fa fa-spinner fa-spin"></i> Complete
          </>
        ) : (
          "Complete"
        )}
      </button>
    )}

    {/* REJECT for Y or P */}
    {(selectedItem.ACTIVESTATUS === "Y" ||
      selectedItem.ACTIVESTATUS === "P") && (
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => setShowRejectModal(true)}
      >
        Reject
      </button>
    )}
  </div>
)}

                </div>
            </div>
        </div>
    );
};


export default AccountViewModal;
