import React from "react";

const ViewModal = ({
    show,
    onClose,
    WardType,
    selectedItem,
    selectedItemImages,
    formatDotNetDate,
    formatTimeSpan
}) => {

    if (!show) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content shadow-lg">

                    {/* HEADER */}
                    <div className="modal-header bg-light">
                        <h5 className="modal-title">View - {WardType}</h5>
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
                                        <td>: {selectedItem?.STATUS}</td>
                                    </tr>

                                    {selectedItem?.STATUS === "In-Active" && (
                                        <>
                                            <tr>
                                                <td><b>Comments</b></td>
                                                <td>: {selectedItem?.Comments}</td>
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

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewModal;
