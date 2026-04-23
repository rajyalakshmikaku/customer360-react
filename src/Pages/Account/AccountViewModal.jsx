import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchLinkedAccounts,
  fetchSaveAccountNumbers,
  fetchApproveAccountsInfo,
} from "../../redux/AccountListSlice";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

const AccountViewModal = ({ show, onClose, selectedItem, mode}) => {
  const dispatch = useDispatch();

  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [showAccountsTable, setShowAccountsTable] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const { linkedAccounts = {}, linkedLoading = false } =
    useSelector((state) => state.Account) || {};
   


  const [formData, setFormData] = useState({
    USERID: "",
    IDNUMBER: "",
    NAME: "",
    SURNAME: "",
    EMAIL: "",
    PHONENUMBER: "",
    CELLNUMBER: "",
    CREATEDDATE: "",
    ACTIVESTATUS: "",
  });

  const accountList = Array.isArray(linkedAccounts?.list)
    ? linkedAccounts.list
    : Array.isArray(linkedAccounts)
      ? linkedAccounts
      : [];

useEffect(() => {
  if (accountList && accountList.length > 0) {
    const mappedAccounts = accountList
      .filter(item => item.isMapped === 1)
      .map(item => item.accountNo);

    setSelectedAccounts(mappedAccounts);
  }
}, [accountList]);
  useEffect(() => {
    if (selectedItem) {
      setFormData({
        USERID: selectedItem.USERID || "",
        IDNUMBER: selectedItem.IDNUMBER || "",
        NAME: selectedItem.NAME || "",
        SURNAME: selectedItem.SURNAME || "",
        EMAIL: selectedItem.EMAIL || "",
        PHONENUMBER: selectedItem.PHONENUMBER || "",
        CELLNUMBER: selectedItem.CELLNUMBER || "",
        CREATEDDATE: selectedItem.CREATEDDATE || "",
        ACTIVESTATUS: selectedItem.ACTIVESTATUS || "",
        ADDRESS: selectedItem.ADDRESS || "",
        ADDRESS1: selectedItem.ADDRESS1 || "",
        ADDRESS2: selectedItem.ADDRESS2 || "",
        CITY: selectedItem.CITY || "",
        DISTRICT_NAME: selectedItem.DISTRICT_NAME || "",
        PROVINCE: selectedItem.PROVINCE || "",
      });
    }

    if (mode === "link" && selectedItem?.IDNUMBER) {
      dispatch(fetchLinkedAccounts(selectedItem.IDNUMBER));
    }
  }, [mode, selectedItem, dispatch]);

  if (!show || !selectedItem) return null;

  const handleCheckboxChange = (accountNo) => {
    setSelectedAccounts((prev) =>
      prev.includes(accountNo)
        ? prev.filter((x) => x !== accountNo)
        : [...prev, accountNo]
    );
  };

  const handleMapping = () => {
    const payload = {
      UserID: selectedItem.USERID,
      AccountNumbers: selectedAccounts,
    };

    dispatch(fetchSaveAccountNumbers(payload))
      .unwrap()
      .then((res) => {
        let message = "";

        if (res.savedAccounts?.length > 0) {
          message += `Saved Successfully:\n${res.savedAccounts.join(", ")}\n\n`;
        }

        if (res.existingAccounts?.length > 0) {
          message += `Already Exists:\n${res.existingAccounts.join(", ")}`;
        }

        alertify.alert(
          "Account Mapping Result",
          message || "No accounts processed."
        );

        setSelectedAccounts([]);
      })
      .catch(() => {
        alertify.alert("Error", "Failed to save account numbers");
      });
  };

const handleUpdate = async () => {
  try {
    const mappedAccounts = accountList.map((item) => ({
      AccountNumber: item.accountNo,
      IsActive: selectedAccounts.includes(item.accountNo) ? "Yes" : "No",
    }));

    const payload = {
      ...formData,
      AccountNumbers: mappedAccounts,
    };

    console.log("FINAL PAYLOAD:", payload);

    const result = await dispatch(fetchApproveAccountsInfo(payload)).unwrap();
    if (result?.success) {
  alertify.alert("Success", result.Message || "Updated successfully ");
      onClose();
    } 
    else {
  alertify.alert("Error", result?.Message || "Update failed ");
    }

  } catch (error) {
    console.error("FULL ERROR:", error);

    let errorMessage = "Something went wrong ❌";

    if (error?.message) {
      errorMessage = error.message;
    }

    alertify.error(errorMessage);
  }
};


  return (
    <div className="modal fade show d-block">
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header bg-light">
            <h5 className="modal-title text-capitalize">
              {mode} Account Details
            </h5>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={onClose}
            >
              X
            </button>
          </div>

          <div className="modal-body">

            {/* Show details only for view/edit */}
            {(mode === "view" || mode === "edit") && (
              <div style={{ maxHeight: "450px", overflowY: "auto", padding: "10px 20px" }}>
                <table className="table table-borderless align-middle">
                  <tbody>

                    {/* User ID */}
                    {/* <tr>
                      <td style={{ width: "300px" }}><b>User ID</b></td>
                      {mode === "view" && <td style={{ width: "20px" }}>:</td>}
                      <td>
                        {mode === "edit" ? (
                          <input
                            type="text"
                            className="form-control"
                            value={formData.USERID || ""}
                            onChange={(e) =>
                              setFormData({ ...formData, USERID: e.target.value })
                            }
                          />
                        ) : (
                          formData.USERID
                        )}
                      </td>
                    </tr> */}

                    {/* ID Number */}
                    <tr>
                      <td style={{ width: "300px" }}><b>ID Number</b></td>
                      {mode === "view" && <td style={{ width: "20px" }}>:</td>}
                      <td>
                        {mode === "edit" ? (
                          <input
                            type="text"
                            className="form-control"
                            value={formData.IDNUMBER || ""}
                            onChange={(e) =>
                              setFormData({ ...formData, IDNUMBER: e.target.value })
                            }
                          />
                        ) : (
                          formData.IDNUMBER
                        )}
                      </td>
                    </tr>

                    {/* Name */}
                    <tr>
                      <td><b>Name</b></td>
                      {mode === "view" && <td>:</td>}
                      <td>
                        {mode === "edit" ? (
                          <input
                            type="text"
                            className="form-control"
                            value={formData.NAME || ""}
                            onChange={(e) =>
                              setFormData({ ...formData, NAME: e.target.value })
                            }
                          />
                        ) : (
                          formData.NAME
                        )}
                      </td>
                    </tr>

                    {/* Surname */}
                    <tr>
                      <td><b>Surname</b></td>
                      {mode === "view" && <td>:</td>}
                      <td>
                        {mode === "edit" ? (
                          <input
                            type="text"
                            className="form-control"
                            value={formData.SURNAME || ""}
                            onChange={(e) =>
                              setFormData({ ...formData, SURNAME: e.target.value })
                            }
                          />
                        ) : (
                          formData.SURNAME
                        )}
                      </td>
                    </tr>

                    {/* Email */}
                    <tr>
                      <td><b>Email</b></td>
                      {mode === "view" && <td>:</td>}
                      <td>
                        {mode === "edit" ? (
                          <input
                            type="email"
                            className="form-control"
                            value={formData.EMAIL || ""}
                            onChange={(e) =>
                              setFormData({ ...formData, EMAIL: e.target.value })
                            }
                          />
                        ) : (
                          formData.EMAIL
                        )}
                      </td>
                    </tr>

                    {/* Cell Number */}
                    <tr>
                      <td><b>Cell Number</b></td>
                      {mode === "view" && <td>:</td>}
                      <td>
                        {mode === "edit" ? (
                          <input
                            type="text"
                            className="form-control"
                            value={formData.PHONENUMBER || formData.CELLNUMBER || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                PHONENUMBER: e.target.value,
                              })
                            }
                          />
                        ) : (
                          formData.PHONENUMBER || formData.CELLNUMBER
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td><b>Address</b></td>
                      {mode === "view" && <td>:</td>}
                      <td>
                        {mode === "edit" ? (
                          <input
                            type="text"
                            className="form-control"
                            value={[
                              formData.ADDRESS,
                              formData.ADDRESS1,
                              formData.ADDRESS2,
                              formData.CITY,
                              formData.DISTRICT_NAME,
                              formData.PROVINCE,
                            ]
                              .filter(Boolean)
                              .join(", ")} // show concatenated in input
                            onChange={(e) => {
                              const parts = e.target.value.split(",").map(p => p.trim());
                              setFormData({
                                ...formData,
                                ADDRESS: parts[0] || "",
                                ADDRESS1: parts[1] || "",
                                ADDRESS2: parts[2] || "",
                                CITY: parts[3] || "",
                                DISTRICT_NAME: parts[4] || "",
                                PROVINCE: parts[5] || "",
                              });
                            }}
                          />
                        ) : (
                          // view mode: just show concatenated
                          [
                            formData.ADDRESS,
                            formData.ADDRESS1,
                            formData.ADDRESS2,
                            formData.CITY,
                            formData.DISTRICT_NAME,
                            formData.PROVINCE,
                          ]
                            .filter(Boolean)
                            .join(", ")
                        )}
                      </td>
                    </tr>


                    {/* Status */}
                    <tr>
                      <td><b>Status</b></td>
                      {mode === "view" && <td>:</td>}
                      <td>
                        {mode === "edit" ? (
                          <select
                            className="form-control"
                            value={formData.ACTIVESTATUS || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                ACTIVESTATUS: e.target.value,
                              })
                            }
                          >
                            <option value="Y">Completed</option>
                            <option value="P">Pending</option>
                            <option value="N">Inactive</option>
                          </select>
                        ) : (
                          <span
                            className="badge"
                            style={{
                              backgroundColor:
                                formData.ACTIVESTATUS === "Y"
                                  ? "green"
                                  : formData.ACTIVESTATUS === "P"
                                    ? "orange"
                                    : "red",
                              color: "white",
                              padding: "6px 12px",
                              borderRadius: "12px",
                            }}
                          >
                            {{
                              Y: "Completed",
                              P: "Pending",
                              N: "Inactive",
                            }[formData.ACTIVESTATUS] || "-"}
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td><b>Account No</b></td>
                      {mode === "view" && <td>:</td>}
                      <td>
                        <input
                          type="text" placeholder="Select Account Number"
                          className="form-control"
                          value={formData.accountNo}
                          readOnly
                          onClick={() => {
                            setShowModal(true);

                            if (selectedItem?.IDNUMBER) {
                              dispatch(fetchLinkedAccounts(selectedItem.IDNUMBER));
                            }
                          }}
                        />
                        {showModal && (
                          <div className="modal-overlay">
                            <div className="modal-box">
                              <div className="modal-header">
                                <b>Linked Accounts</b>
                                {/* <button onClick={() => setShowModal(false)}>X</button> */}
            <button
  className="btn btn-outline-danger btn-sm"
  onClick={() => setShowModal(false)}
>
  X
</button>
                              </div>

                              {linkedLoading ? (
                                <div className="d-flex justify-content-center align-items-center py-3">
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
                              ) : (
                                <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                                  <table className="table table-bordered mt-2">
                                    <thead>
                                      <tr style={{ background: "#346ba2", color: "#fff" }}>
                                        <th>Select</th>
                                        <th>Account Number</th>
                                      </tr>
                                      
                                    </thead>
                                    

                                    <tbody>
                                      {accountList.length > 0 ? (
                                        accountList.map((item, i) => (
                                          <tr key={i}>
                                            <td>
                                              <input
                                                type="checkbox"
                                                //  disabled={mode === "view"} 
                                                checked={selectedAccounts.includes(item.accountNo)}
                                                onChange={(e) => {
                                                  const checked = e.target.checked;

                                                  setSelectedAccounts((prev) =>
                                                    checked
                                                      ? [...prev, item.accountNo]
                                                      : prev.filter((acc) => acc !== item.accountNo)
                                                  );
                                                }}
                                              />
                                            </td>

                                            <td>{item.accountNo}</td>
                                          </tr>
                                        ))
                                      ) : (
                                        <tr>
                                          <td colSpan="2">No data found</td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              )}

                              <div className="modal-footer">
                                <button
                                  className="btn btn-primary"
                                  disabled={mode === "view"} 
                                  onClick={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      accountNo: selectedAccounts.join(", "),
                                    }));
                                    setShowModal(false);
                                  }}
                                >
                                  OK
                                </button>
                              </div>
                            </div>
                          </div>
                        )}


                      </td>
                    </tr>


                  </tbody>
                </table>

                {mode === "edit" && (
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleUpdate} // ✅ correct
                    >
                      Update
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Link mode only linked accounts */}
            {mode === "link" && (
              <>
                <label><b>Linked Accounts</b></label>

                {linkedLoading ? (
                  <div className="text-center py-4">
                    <div
                      className="spinner-border text-primary"
                      role="status"
                      style={{ width: "2rem", height: "2rem" }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading linked accounts...</p>
                  </div>
                ) : (
                  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    <table className="table table-bordered">
                      <thead style={{ position: "sticky", top: 0 }}>
                        <tr style={{ backgroundColor: "#346ba2", color: "white" }}>
                          <th>Select</th>
                          <th>Account Number</th>
                        </tr>
                      </thead>

                      <tbody>
                        {Array.isArray(linkedAccounts.list) &&
                          linkedAccounts.list.length > 0 ? (
                          linkedAccounts.list.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <input
                                  type="checkbox"
                                  checked={selectedAccounts.includes(item.accountNo)}
                                  onChange={() =>
                                    handleCheckboxChange(item.accountNo)
                                  }
                                />
                              </td>
                              <td>{item.accountNo}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2">No data found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    <button
                      className="btn btn-success mt-2"
                      onClick={handleMapping}
                      disabled={selectedAccounts.length === 0}
                    >
                      Map Selected Accounts
                    </button>
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountViewModal;