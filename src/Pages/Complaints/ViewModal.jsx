import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";

const ViewModal = ({
    show,
    onClose,
    WardType,
    mode,
    selectedItem,
    selectedItemImages,
    formatDotNetDate,
    formatTimeSpan,
    onStatusChange,
    approveSuccess
}) => {

    const [rejectComment, setRejectComment] = useState("");
    const [showRejectBox, setShowRejectBox] = useState(false);

    const [showRejectModal, setShowRejectModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { approveLoading } = useSelector((state) => state.complaints);

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "Pending":
                return "badge bg-warning text-dark";
            case "Active":
                return "badge bg-primary";
            case "Completed":
                return "badge bg-success";
            case "In-Active":
                return "badge bg-secondary";
            case "Rejected":
                return "badge bg-danger";
            default:
                return "badge bg-light text-dark";
        }
    };

    useEffect(() => {
        if (approveSuccess) {
            setShowRejectModal(false);  // close reject popup
            setRejectComment("");       // clear textarea
        }

    }, [approveSuccess]);



    if (!show) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content shadow-lg">

                    {/* HEADER */}
                    <div className="modal-header bg-light">
                        <h5 className="modal-title">
                            {mode === "edit" ? "Edit" : "View"} - {WardType}
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

                    {/* BODY */}
                    <div className="modal-body">
                        <div className="container-fluid">

                            <table className="table table-borderless mb-3">
                                <tbody>

                                    {/* COMMON FIELDS */}
                                    <tr>
                                        <td><b>Ref No.</b></td>
                                        <td>: {selectedItem?.REFNUMBER}</td>
                                    </tr>

                                    <tr>
                                        <td><b>Ward No.</b></td>
                                        <td>: {selectedItem?.WARD_NO}</td>
                                    </tr>

                                    {/* HOTSPOT */}
                                    {WardType === "HOTSPOT" && (
                                        <>
                                            <tr>
                                                <td><b>Crime Type</b></td>
                                                <td>: {selectedItem?.CRIME_TYPE}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Crime Date</b></td>
                                                <td>: {formatDotNetDate(selectedItem?.CRIME_DATE)}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Location</b></td>
                                                <td>: {selectedItem?.LOCATION}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Crime Details</b></td>
                                                <td>: {selectedItem?.CRIME_DETAILS}</td>
                                            </tr>
                                        </>
                                    )}

                                    {/* ROADCLOSURE */}
                                    {WardType === "ROADCLOSURE" && (
                                        <>
                                            <tr>
                                                <td><b>Road Closure Start Date</b></td>
                                                <td>: {formatDotNetDate(selectedItem?.ROADCLOUSER_STARTDATE)}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Road Closure Start Time</b></td>
                                                <td>: {formatTimeSpan(selectedItem?.ROADCLOUSER_STARTIME)}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Road Closure End Date</b></td>
                                                <td>: {formatDotNetDate(selectedItem?.ROADCLOUSER_ENDDATE)}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Road Closure End Time</b></td>
                                                <td>: {formatTimeSpan(selectedItem?.ROADCLOUSER_ENDTIME)}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Location</b></td>
                                                <td>: {selectedItem?.LOCATION}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Longitude</b></td>
                                                <td>: {selectedItem?.LONGITUDE}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Latitude</b></td>
                                                <td>: {selectedItem?.LATITUDE}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Road Name</b></td>
                                                <td>: {selectedItem?.ROAD_NAME}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Road Closure Details</b></td>
                                                <td>: {selectedItem?.ROADCLOUSER_DETAILS}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Expire Date</b></td>
                                                <td>: {formatDotNetDate(selectedItem?.EXPIRE_DATE)}</td>
                                            </tr>
                                        </>
                                    )}

                                    {/* MEETING */}
                                    {WardType === "MEETING" && (
                                        <>
                                            <tr>
                                                <td><b>Meeting Start Date</b></td>
                                                <td>: {formatDotNetDate(selectedItem?.MEETING_STARTDATE)}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Meeting Start Time</b></td>
                                                <td>: {formatTimeSpan(selectedItem?.MEETING_STARTIME)}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Meeting End Date</b></td>
                                                <td>: {formatDotNetDate(selectedItem?.MEETING_ENDDATE)}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Meeting End Time</b></td>
                                                <td>: {formatTimeSpan(selectedItem?.MEETING_ENDTIME)}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Location</b></td>
                                                <td>: {selectedItem?.LOCATION}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Longitude</b></td>
                                                <td>: {selectedItem?.LONGITUDE}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Latitude</b></td>
                                                <td>: {selectedItem?.LATITUDE}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Subject</b></td>
                                                <td>: {selectedItem?.SUBJECT}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Meeting Details</b></td>
                                                <td>: {selectedItem?.MEETING_DETAILS}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Expire Date</b></td>
                                                <td>: {formatDotNetDate(selectedItem?.EXPIRE_DATE)}</td>
                                            </tr>
                                        </>
                                    )}

                                    {/* MISSING PERSON */}
                                    {WardType === "MISSINGPERSON" && (
                                        <>
                                            <tr>
                                                <td><b>Missing Date</b></td>
                                                <td>: {formatDotNetDate(selectedItem?.MISSING_DATE)}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Missing Time</b></td>
                                                <td>: {formatTimeSpan(selectedItem?.MISSING_TIME)}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Location</b></td>
                                                <td>: {selectedItem?.LOCATION}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Longitude</b></td>
                                                <td>: {selectedItem?.LONGITUDE}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Latitude</b></td>
                                                <td>: {selectedItem?.LATITUDE}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Full Name</b></td>
                                                <td>: {selectedItem?.FULL_NAME}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Missing Person Details</b></td>
                                                <td>: {selectedItem?.MISSINGPERSON_DETAILS}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Expire Date</b></td>
                                                <td>: {formatDotNetDate(selectedItem?.EXPIRE_DATE)}</td>
                                            </tr>
                                        </>
                                    )}

                                    {/* HEALTHCARE */}
                                    {WardType === "HEALTHCARE" && (
                                        <>
                                            <tr>
                                                <td><b>Health Care Date</b></td>
                                                <td>: {formatDotNetDate(selectedItem?.HEALTHCARE_DATE)}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Location</b></td>
                                                <td>: {selectedItem?.LOCATION}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Longitude</b></td>
                                                <td>: {selectedItem?.LONGITUDE}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Latitude</b></td>
                                                <td>: {selectedItem?.LATITUDE}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Health Care Details</b></td>
                                                <td>: {selectedItem?.HEALTHCARE_DETAILS}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Expire Date</b></td>
                                                <td>: {formatDotNetDate(selectedItem?.EXPIRE_DATE)}</td>
                                            </tr>
                                        </>
                                    )}

                                    {/* WORKSHOP */}
                                    {WardType === "WORKSHOP" && (
                                        <>
                                            <tr>
                                                <td><b>Workshop Start Date</b></td>
                                                <td>: {formatDotNetDate(selectedItem?.WORKSHOP_STARTDATE)}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Workshop Start Time</b></td>
                                                <td>: {formatTimeSpan(selectedItem?.WORKSHOP_STARTIME)}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Workshop End Date</b></td>
                                                <td>: {formatDotNetDate(selectedItem?.WORKSHOP_ENDDATE)}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Workshop End Time</b></td>
                                                <td>: {formatTimeSpan(selectedItem?.WORKSHOP_ENDTIME)}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Location</b></td>
                                                <td>: {selectedItem?.LOCATION}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Longitude</b></td>
                                                <td>: {selectedItem?.LONGITUDE}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Latitude</b></td>
                                                <td>: {selectedItem?.LATITUDE}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Workshop Details</b></td>
                                                <td>: {selectedItem?.WORKSHOP_DETAILS}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Expire Date</b></td>
                                                <td>: {formatDotNetDate(selectedItem?.EXPIRE_DATE)}</td>
                                            </tr>
                                        </>
                                    )}

                                    {/* WARNING */}
                                    {WardType === "WARNING" && (
                                        <>
                                            <tr>
                                                <td><b>Warning Date</b></td>
                                                <td>: {formatDotNetDate(selectedItem?.WARNING_DATE)}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Warning Time</b></td>
                                                <td>: {formatTimeSpan(selectedItem?.WARNING_TIME)}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Location</b></td>
                                                <td>: {selectedItem?.LOCATION}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Longitude</b></td>
                                                <td>: {selectedItem?.LONGITUDE}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Latitude</b></td>
                                                <td>: {selectedItem?.LATITUDE}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Type of Warning</b></td>
                                                <td>: {selectedItem?.TYPEOFWARNING}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Warning Details</b></td>
                                                <td>: {selectedItem?.WARNING_DETAILS}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Expire Date</b></td>
                                                <td>: {formatDotNetDate(selectedItem?.EXPIRE_DATE)}</td>
                                            </tr>
                                        </>
                                    )}

                                    {/* STATUS */}
                                    <tr>
                                        <td><b>Status</b></td>
                                        <td>
                                            : <span className={getStatusBadgeClass(selectedItem?.STATUS)}>
                                                {selectedItem?.STATUS}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Created Name</b></td>
                                        <td>: {selectedItem.NAME} {selectedItem.SURNAME}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Created Email</b></td>
                                        <td>: {selectedItem.EMAIL}</td>
                                    </tr>

                                    <tr>
                                        <td><b>Created Date</b></td>
                                        <td>: {selectedItem.CREATED_DATE}</td>
                                    </tr>
                                    <tr>
                                        <td><b>No of Days</b></td>
                                        <td>: {selectedItem.DAYS_TIME}</td>
                                    </tr>


                                    {selectedItem?.STATUS === "In-Active" && (
                                        <>
                                            <tr>
                                                <td><b>Comments</b></td>
                                                <td>: {typeof selectedItem?.Comments === "string"
                                                    ? selectedItem?.Comments
                                                    : selectedItem?.Comments?.comment || ""}</td>


                                            </tr>
                                            <tr>
                                                <td><b>Comments Date</b></td>
                                                <td>: {formatDotNetDate(selectedItem?.CommentsDate)}</td>
                                            </tr>
                                        </>
                                    )}



                                </tbody>
                            </table>


                            {/* ATTACHMENTS */}
                            <div className="mt-3">
                                <h6 className="mb-2">Attachments</h6>

                                {selectedItemImages && selectedItemImages.length > 0 ? (
                                    <div className="row">
                                        {selectedItemImages.map((img, index) => (
                                            <div
                                                className="col-lg-2 col-md-3 col-sm-4 col-6 mb-3"
                                                key={index}
                                            >
                                                <a
                                                    href={img.ATTACHMENT_IMAGE}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="d-block"
                                                >
                                                    <img
                                                        src={img.ATTACHMENT_IMAGE}
                                                        alt={`Attachment ${index + 1}`}
                                                        className="img-fluid rounded shadow-sm"
                                                    />
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center text-muted">
                                        No attachments available
                                    </div>
                                )}
                            </div>

                            {mode === "edit" &&
                                selectedItem &&
                                (selectedItem.STATUS === "Pending" || selectedItem.STATUS === "Active") && (
                                    <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">

                                        {selectedItem.STATUS === "Pending" && (
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

                                        {selectedItem.STATUS === "Active" && (
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

                                        {/* Reject Button */}
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => setShowRejectModal(true)}
                                        >
                                            Reject
                                        </button>




                                    </div>
                                )}


                        </div>
                    </div>
                    {showRejectModal &&
                        ReactDOM.createPortal(
                            <>
                                <div className="modal-backdrop fade show"></div>

                                <div className="modal fade show d-block" tabIndex="-1">
                                    <div className="modal-dialog modal-sm modal-dialog-centered">
                                        <div className="modal-content shadow">

                                            <div className="modal-header bg-danger text-white py-2">
                                                <h6 className="modal-title">Reject Complaint</h6>
                                                <button
                                                    type="button"
                                                    className="btn-close btn-close-white"
                                                    onClick={() => setShowRejectModal(false)}
                                                ></button>
                                            </div>

                                            <div className="modal-body py-2">
                                                <textarea
                                                    className="form-control form-control-sm"
                                                    rows="3"
                                                    placeholder="Enter reject reason"
                                                    value={rejectComment}
                                                    onChange={(e) => setRejectComment(e.target.value)}
                                                />
                                            </div>

                                            <div className="modal-footer py-2">
                                                <button
                                                    className="btn btn-damger btn-sm"
                                                    onClick={() => setShowRejectModal(false)}
                                                    disabled={loading}
                                                >
                                                    Cancel
                                                </button>

                                                <button
                                                    className="btn btn-success btn-sm"
                                                    disabled={approveLoading || !rejectComment}
                                                    onClick={() =>
                                                        onStatusChange(
                                                            selectedItem.ID,
                                                            "REJECT",
                                                            WardType,
                                                            rejectComment
                                                        )
                                                    }
                                                >
                                                    {loading ? (
                                                        <span className="fa fa-spinner fa-spin"></span>
                                                    ) : (
                                                        "Submit"
                                                    )}
                                                </button>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </>,
                            document.body
                        )
                    }



                </div>
            </div>
        </div>
    );
};

export default ViewModal;
