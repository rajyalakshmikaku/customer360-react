import React from "react";

const AccountViewModal = ({ show, onClose, selectedItem }) => {
  if (!show || !selectedItem) return null;

 
  return (
          <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog modal-xl modal-dialog-centered">
                  <div className="modal-content shadow-lg">
  
                     <div className="modal-header bg-light">
                       <h5 className="modal-title">Account Details</h5>

                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={onClose}
                            style={{ width: "35px", height: "35px", padding: 0 }}
                        >
                            <i className="bx bx-x" style={{ fontSize: "18px" }}></i>
                        </button>
                    
          
            {/* <h5 className="modal-title">Account Details</h5> */}
            {/* <button className="btn-close" onClick={onClose}></button> */}
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
                                        <td>: {selectedItem?.ACTIVESTATUS}</td>
                                    </tr>
                                    <tr>
                                        <td><b>CREATED DATE</b></td>
                                        <td>: {selectedItem?.CREATEDDATE}</td>
                                    </tr>

                                   <tr>
                                        <td><b>USER TYPE</b></td>
                                        <td>: {selectedItem?.USERTYPE}</td>
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

          {/* <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div> */}

  
  
                  </div>
              </div>
          </div>
      );
};


export default AccountViewModal;
