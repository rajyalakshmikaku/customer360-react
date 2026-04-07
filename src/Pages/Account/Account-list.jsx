import { useEffect, useState } from "react";
import "./AccountList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccountListInfo,
  fetchApproveAccountsInfo,
  fetchLinkedAccounts
} from "../../redux/AccountListSlice";
import AccountViewModal from "./AccountViewModal";
import Pagination from "../../Components/Pagination";

const AccountList = ({ category }) => {
  const dispatch = useDispatch();

 

// const accountState = useSelector((state) => state.Account);
const accountState = useSelector((state) => state.Account);

const {
  linkedAccounts,
  linkedLoading,
  loading,
  totalCount,
  AccountsListInfo = [],
  activestatus = [],
  ApproveInfo
} = accountState || {};

// console.log("Redux State:", accountState);
// console.log("AccountsListInfo:", AccountsListInfo);
console.log("Linked Accounts:", linkedAccounts);

const LinkedAccounts = async (idNumber, mode) => {
  if (mode !== "link") return;

  const result = await dispatch(fetchLinkedAccounts(idNumber));

  console.log("Redux API Result:", result);
};

  const [modalMode, setModalMode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [search] = useState("");
  const [sorting] = useState("USERID");
  
 

  useEffect(() => {
    dispatch(
      fetchAccountListInfo({
        pageIndex,
        pageSize,
        search,
        sorting,
        fromDate,
        toDate,
        status
      })
    );
  }, [dispatch, pageIndex, pageSize, search, sorting, fromDate, toDate, status]);

  const handleSearch = () => {
    setPageIndex(1);
  };

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setStatus("");
    setPageIndex(1);
  };

  const handlePageChange = (newPage) => {
    setPageIndex(newPage);
  };

  const handleView = (item, mode) => {
    setSelectedItem(item);
    setModalMode(mode);
    setShowModal(true);
  };

  const handleStatusChange = (USERID, status = "") => {
    return dispatch(
      fetchApproveAccountsInfo({
        USERID,
        Status: status
      })
    ).unwrap();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div className="complaints-header">
        <h2>Account List</h2>
      </div>

      <div className="complaints-filters">
        <div className="filter-group">
          <label>📅 From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>📅 To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>🔄 Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            {activestatus.map((item, index) => (
              <option key={index} value={item}>
                {item === "Y"
                  ? "Completed"
                  : item === "N"
                  ? "Inactive"
                  : item === "P"
                  ? "Pending"
                  : item}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>&nbsp;</label>
          <div className="filter-buttons">
            <button className="btn-search" onClick={handleSearch}>
              Search
            </button>
            <button
              className="btn-clear"
              onClick={handleClear}
              style={{ backgroundColor: "orange", color: "white" }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="Account-table">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>ID No</th>
              <th>Created Date</th>
              <th>Status</th>
            </tr>
          </thead>

<tbody>
  {AccountsListInfo?.length > 0 ? (
    AccountsListInfo.map((item, index) => (
      <tr key={item.USERID || index}>
        <td>
          <i
            className="fa fa-eye me-2"
            style={{ cursor: "pointer" }}
            onClick={() => handleView(item, "View")}
          ></i>

          {item.ACTIVESTATUS !== "Y" && (
            <i
              className="fa fa-edit me-2"
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => handleView(item, "edit")}
            ></i>
          )}

          {item.IDNUMBER !== "NULL" && (
            <i
              className="fa fa-link"
              style={{ cursor: "pointer", color: "purple" }}
              onClick={() => LinkedAccounts(item.IDNUMBER, "link")}
            ></i>
          )}
        </td>

        <td>{item.NAME}</td>
        <td>{item.SURNAME}</td>
        <td>{item.EMAIL}</td>
        <td>{item.IDNUMBER}</td>
        {/* <td>{item.PHONENUMBER || item.CELLNUMBER}</td> */}
        <td>{item.CREATEDDATE}</td>

        <td>
          {item.ACTIVESTATUS === "Y"
            ? "Completed"
            : item.ACTIVESTATUS === "P"
            ? "Pending"
            : "Inactive"}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7">{loading ? "Loading..." : "No Account Found"}</td>
    </tr>
  )}
</tbody>
        </table>

        <Pagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={handlePageChange}
        />
      </div>

      <AccountViewModal
        show={showModal}
        onClose={() => setShowModal(false)}
        WardType={category}
        mode={modalMode}
        selectedItem={selectedItem}
        onStatusChange={handleStatusChange}
        approveSuccess={ApproveInfo?.success}
      />
    </div>
  );
};

export default AccountList;