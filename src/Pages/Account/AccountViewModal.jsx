import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLinkedAccounts } from "../../redux/AccountListSlice";

const AccountViewModal = ({ show, onClose, selectedItem, mode }) => {
  const dispatch = useDispatch();

  // ✅ Step 4.1: Hooks always at top
  const [selectedAccounts, setSelectedAccounts] = useState([]);

  const { linkedAccounts = [], linkedLoading = false } =
  useSelector((state) => state.Account) || {};

  console.log("linkedAccountsinpopup",linkedAccounts);
  // ✅ Step 4.2: API call
  useEffect(() => {
    if (mode === "link" && selectedItem?.IDNUMBER) {
      dispatch(fetchLinkedAccounts(selectedItem.IDNUMBER));
    }
  }, [mode, selectedItem, dispatch]);

  // ✅ Step 4.3: Return AFTER hooks
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
    userId: selectedItem.USERID,
    accounts: selectedAccounts
  };

  console.log("Mapping Payload:", payload);

  
};

  return (
    <div className="modal fade show d-block">
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5>{mode} Account Details</h5>
            <button onClick={onClose}>X</button>
          </div>

          <div className="modal-body">
           {mode === "link" && (
  <>
    <label>Linked Accounts</label>

    {linkedLoading ? (
      <p>Loading...</p>
    ) : linkedAccounts.length === 0 ? (
      <p>No linked accounts found</p>
    ) : (
     <div style={{ maxHeight: "300px", overflowY: "auto" }}>
  <table className="table table-bordered">  
        <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <tr style={{backgroundColor : "#346ba2",color:"white"}}>
            <th>Select</th>
            <th>Account Number</th>
          </tr>
        </thead>
       <tbody>
  {Array.isArray(linkedAccounts.list) && linkedAccounts.list.length > 0 ? (
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
  onClick={() => handleMapping()}
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