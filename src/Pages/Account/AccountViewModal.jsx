import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLinkedAccounts } from "../../redux/AccountListSlice";

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
    const [selectedAccount, setSelectedAccount] = useState("");

   const dispatch = useDispatch();

const { linkedAccounts = [], linkedLoading = false } = useSelector(
  (state) => state.account || {}
);

useEffect(() => {
  if (mode === "link" && selectedItem?.IDNUMBER) {
    dispatch(fetchLinkedAccounts(selectedItem.IDNUMBER));
  }
}, [mode, selectedItem, dispatch]);

    if (!show || !selectedItem) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content shadow-lg">

                    <div className="modal-header bg-light">
                        <h5 className="modal-title">
                            {mode === "edit"
                                ? "Edit"
                                : mode === "link"
                                ? "Link"
                                : "View"} Account Details
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

                            {/* LINK POPUP */}
                            {mode === "link" && (
                                <div className="mt-3 border rounded p-3 bg-light">
                                    {/* <h6 className="mb-3">Link Account</h6> */}

                                    <label><b>Select Account Number</b></label>
                                  <select
  className="form-select"
  value={selectedAccount}
  onChange={(e) => setSelectedAccount(e.target.value)}
>
  <option value="">
    {linkedLoading ? "Loading..." : "Select Account Number"}
  </option>

  {linkedAccounts?.map((item, index) => (
    <option key={index} value={item.AccountNo}>
      {item.AccountNo}
    </option>
  ))}
</select>

                                    <div className="mt-3 text-center">
                                        <button className="btn btn-primary btn-sm">
                                            Link Account
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {mode === "edit" && selectedItem && (
                        <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">

                            {selectedItem.ACTIVESTATUS === "P" && (
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm"
                                    onClick={() =>
                                        onStatusChange(selectedItem.USERID, "APPROVE", WardType)
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

                            {selectedItem.ACTIVESTATUS === "Y" && (
                                <button
                                    type="button"
                                    disabled={approveLoading}
                                    className="btn btn-success btn-sm"
                                    onClick={() =>
                                        onStatusChange(selectedItem.USERID, "COMPLETED", WardType)
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