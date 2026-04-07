import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLinkedAccounts } from "../../redux/AccountListSlice";

const AccountViewModal = ({ show, onClose, selectedItem, mode }) => {
  const dispatch = useDispatch();
  const [selectedAccount, setSelectedAccount] = useState("");

  const { linkedAccounts = [], linkedLoading = false } =
    useSelector((state) => state.account) || {};

  useEffect(() => {
    if (mode === "link" && selectedItem?.IDNUMBER) {
      dispatch(fetchLinkedAccounts(selectedItem.IDNUMBER));
    }
  }, [mode, selectedItem, dispatch]);

  if (!show || !selectedItem) return null;

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
                <label>Select Account Number</label>

                <select
                  className="form-select"
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                >
                  <option value="">
                    {linkedLoading ? "Loading..." : "Select Account"}
                  </option>

                 {linkedAccounts.map((item, index) => (
 <option key={index} value={item.ACCOUNTNO}>
  {item.ACCOUNTNO}
</option>
))}
                </select>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountViewModal;