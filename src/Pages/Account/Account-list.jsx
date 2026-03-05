import { useEffect, useState } from "react";
import "./AccountList.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountListInfo, fetchApproveAccountsInfo } from "../../redux/AccountListSlice";
import AccountViewModal from "./AccountViewModal";
import Pagination from "../../Components/Pagination";


const AccountList = ({ category, onStatusChange, approveSuccess }) => {
  const dispatch = useDispatch();

  const { loading, totalCount, AccountsListInfo, activestatus = [], ApproveInfo } =
    useSelector((state) => state.Account || {});


  console.log('AccountsListInfo', AccountsListInfo)
  console.log('active status', activestatus)

  const [modalMode, setModalMode] = useState("");

  const handleStatusChange = (USERID, status = "") => {
    //console.log('userid',USERID);
    return dispatch(
      fetchApproveAccountsInfo({
        USERID: USERID,
        Status: status
      })
    ).unwrap();
  };


  // ✅ ADD THIS FUNCTION HERE
  const handlePageChange = (newPage) => {
    setPageIndex(newPage);
  };

  const handleSearch = () => {
    console.log("Search Clicked");

    setPageIndex(1);  // reset to first page

    dispatch(fetchAccountListInfo({
      pageIndex: 1,
      pageSize,
      search,
      sorting,
      fromDate,
      toDate,
      status
    }));
  };

  //  const handleSearch = () => {
  //   dispatch(fetchAccountList({ search: "" }));
  // };

  // FILTERS
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");

  // MODAL
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemImages, setSelectedItemImages] = useState([]);

  // PAGING
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState("USERID");

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
  }, [dispatch, pageIndex, pageSize, search, sorting]);

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setStatus("");
    setSearch("");
    setPageIndex(1);
  };

  const handleView = (item, mode) => {
    setSelectedItem(item);
    setShowModal(true);
    setModalMode(mode);
  };


  //   return (
  //     <div className="layout-container">
  //       <div className="layout-page">
  //         <h3>Account List</h3>

  //         {/* FILTER SECTION */}
  //         <div className="row mb-4">
  //           <div className="col-12">
  //             <div className="card-body d-flex align-items-end flex-wrap gap-3">

  //               <div>
  //                 <label className="form-label fw-semibold">From Date</label>
  //                 <input
  //                   type="date" style={{ minWidth: '230px' }}
  //                   className="form-selectAccount"
  //                   value={fromDate}
  //                   onChange={(e) => setFromDate(e.target.value)}
  //                 />
  //               </div>

  //               <div>
  //                 <label className="form-label fw-semibold">To Date</label>
  //                 <input
  //                   type="date" style={{ minWidth: '230px' }}
  //                   className="form-selectAccount"
  //                   value={toDate}
  //                   onChange={(e) => setToDate(e.target.value)}
  //                 />
  //               </div>

  //               <div>
  //                 <label className="form-label fw-semibold">Status</label>
  //                 <select type="text" style={{ minWidth: '230px' }}
  //                   className="form-select"
  //                   value={status}
  //                   onChange={(e) => setStatus(e.target.value)}>
  //                   <option selected>Select Status</option>
  //                   <option value="Y">Active</option>
  //                   <option value="N">Inactive</option>
  //                   <option value="P">Pending</option>
  //                 </select>
  //               </div>

  //               <div className="d-flex gap-2">
  //                 <button className="btn btn-success" >
  //                   <i className="bx bx-search me-1"></i> Search
  //                 </button>

  //                 <button className="btn btn-warning" onClick={handleClear}>
  //                   <i className="bx bx-reset me-1"></i> Clear
  //                 </button>
  //               </div>

  //             </div>
  //           </div>
  //         </div>

  //         {/* TABLE */}
  //         <div className="table-responsive">
  //           <table className="table table-hover table-bordered align-middle">
  //             <thead className="table-dark">
  //               <tr>
  //                 <th>Activity</th>
  //                 {/* <th>Ward</th> */}
  //                   {/* <th>User Id</th> */}
  //                 <th>Name</th>
  //                 <th>Surname</th>
  //                 <th>Email</th>
  //                 <th>PHONE NO</th>
  //                 <th>CREATED DATE</th>
  //                 <th>Status</th>
  //               </tr>
  //             </thead>

  //             <tbody>
  //               {AccountsListInfo.length > 0 ? (
  //                 AccountsListInfo.map((item, index) => (
  //                   <tr key={item.USERID || index}>
  //                     <td>
  //                       <i
  //                         className="fa fa-eye text-primary me-2"
  //                         style={{ cursor: "pointer", color: "teal" }}
  //                         onClick={() => handleView(item, "View")}
  //                       ></i>

  //                       {item.ACTIVESTATUS !== "Y" && (
  //                         <i
  //                           className="fa fa-edit"
  //                           style={{ cursor: "pointer", color: "blue" }}
  //                           onClick={() => handleView(item, "edit")}
  //                         ></i>
  //                       )}
  //                     </td>
  //                     {/* <td>{item.USERREFNUMBER }</td>    */}
  //                     {/* <td>{item.WARD_NO?.NUMBER ?? ""}</td> */}
  //                     {/* <td>{item.USERID}</td> */}
  //                     <td>{item.NAME}</td>
  //                     <td>{item.SURNAME}</td>
  //                     <td>{item.EMAIL}</td>
  //                     <td>{item.PHONENUMBER}</td>
  //                     <td>{item.CREATEDDATE}</td>
  //                     <td>{item.ACTIVESTATUS}</td>
  //                     {/* <td>
  //                       {typeof item?.ACTIVESTATUS === "object"
  //                         ? item?.ACTIVESTATUS?.STATUSNAME ?? ""
  //                         : item?.ACTIVESTATUS ?? ""}
  //                     </td> */}
  //                   </tr>
  //                 ))
  //               ) : (
  //                 <tr>
  //                   <td colSpan="7" className="text-center">
  //                     {loading ? "Loading..." : "No Status Found"}
  //                   </td>
  //                 </tr>
  //               )}
  //             </tbody>
  //           </table>
  //           <Pagination
  //   pageIndex={pageIndex}
  //   pageSize={pageSize}
  //   totalCount={totalCount}
  //   onPageChange={handlePageChange}
  // />
  //         </div>

  //         {/* MODAL */}
  //         <AccountViewModal
  //           show={showModal} onClose={() => setShowModal(false)} WardType={category} mode={modalMode} selectedItem={selectedItem} onStatusChange={handleStatusChange} approveSuccess={ApproveInfo?.success}

  //         />
  //       </div>
  //     </div>
  //   );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="complaints-header">
        <h2>Account List</h2>
      </div>
      {/* Filters Section */}
      <div className="complaints-filters">
        <div className="filter-group">

          <label> 📅 From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label> 📅 To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />

        </div>

        {/* <div className="filter-group">
          <label>🔄 Status</label>
          <select type="text" style={{ minWidth: '230px' }}
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            <option selected>Select Status</option>
            <option value="Y">Active</option>
            <option value="N">Inactive</option>
            <option value="P">Pending</option>
          </select>
        </div> */}
        <div className="filter-group">
          <label>🔄 Status</label>
          <select type="text" style={{ minWidth: '230px' }}
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            <option selected>Select Status</option>

            {activestatus.map((item, index) => (
              <option key={index} value={item}>
                {item === "Y"
                  ? "Active"
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
            <button
              className="btn-search"
              onClick={handleSearch}
            >
              <i className="fa fa-search"></i> Search
            </button>
            <button className="btn-clear" onClick={handleClear} style={{ color: "white", backgroundColor: "orange" }}>
              <i className="fa fa-refresh"></i> Clear
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div style={{ overflowX: 'auto' }}>
        <table className="Account-table">
          <thead style={{ color: "teal" }}>
            <tr>
              <th width="10%">Activity</th>
              {/* <th>Ward</th> */}
              {/* <th>User Id</th> */}
              <th width="10%">Name</th>
              <th width="10%">Surname</th>
              <th width="12%">Email</th>
              <th width="10%">PHONE NO</th>
              <th width="10%">CREATED DATE</th>
              <th width="12%">Status</th>
            </tr>
          </thead>

          <tbody>
            {AccountsListInfo.length > 0 ? (
              AccountsListInfo.map((item, index) => (
                <tr key={item.USERID || index}>
                  <td>
                    <i
                      className="fa fa-eye text-primary me-2"
                      style={{ cursor: "pointer", color: "teal" }}
                      onClick={() => handleView(item, "View")}
                    ></i>

                    {item.ACTIVESTATUS !== "Y" && (
                      <i
                        className="fa fa-edit"
                        style={{ cursor: "pointer", color: "blue" }}
                        onClick={() => handleView(item, "edit")}
                      ></i>
                    )}
                  </td>
                  {/* <td>{item.USERREFNUMBER }</td>    */}
                  {/* <td>{item.WARD_NO?.NUMBER ?? ""}</td> */}
                  {/* <td>{item.USERID}</td> */}
                  <td>{item.NAME}</td>
                  <td>{item.SURNAME}</td>
                  <td>{item.EMAIL}</td>
                  <td>{item.PHONENUMBER}</td>
                  <td>{item.CREATEDDATE}</td>
                  <td>{item.ACTIVESTATUS}</td>
                  {/* <td>
                      {typeof item?.ACTIVESTATUS === "object"
                        ? item?.ACTIVESTATUS?.STATUSNAME ?? ""
                        : item?.ACTIVESTATUS ?? ""}
                    </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  {loading ? "Loading..." : "No Account Found"}
                </td>
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

      {/* MODAL */}
      <AccountViewModal
        show={showModal} onClose={() => setShowModal(false)} WardType={category} mode={modalMode} selectedItem={selectedItem} onStatusChange={handleStatusChange} approveSuccess={ApproveInfo?.success}

      />
    </div>
  );
};

export default AccountList;
