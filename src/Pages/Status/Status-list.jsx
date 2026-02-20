import { useEffect, useState } from "react";
import "./Status.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatusListInfo } from "../../redux/StatusListSlice";
import StatusViewModal from "./StatusViewModal";

const StatusList = () => {
  const dispatch = useDispatch();

  const { loading, totalCount, AccountsListInfo } = useSelector(
    (state) => state.Status
  );

  console.log('AccountsListInfo',AccountsListInfo)

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
      fetchStatusListInfo({
        pageIndex,
        pageSize,
        search,
        sorting,
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

  const handleView = (item) => {
    setSelectedItem(item);
    setSelectedItemImages(item?.Images || []);
    setShowModal(true);
  };

  return (
    <div className="layout-container">
      <div className="layout-page">
        <h3>Account List</h3>

        {/* FILTER SECTION */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card-body d-flex align-items-end flex-wrap gap-3">

              <div>
                <label className="form-label fw-semibold">From Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label fw-semibold">To Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label fw-semibold">Status</label>
                <input
                  type="text"
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-warning" onClick={handleClear}>
                  Clear
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Activity</th>
                <th>Ward</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Cell</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {AccountsListInfo.length > 0 ? (
                AccountsListInfo.map((item, index) => (
                  <tr key={item.USERID || index}>
                    <td>
                      <i
                        className="fa fa-eye text-primary"
                        style={{ cursor: "pointer" }}
                        // onClick={() => handleView(item)}
                      ></i>
                    </td>

                   <td>{item.WARD_NO?.NUMBER ?? ""}</td>

                     <td>{item.ACTIVESTATUS }</td>
                    {/* <td>{item?.NAME ?? ""}</td>
                    <td>{item?.SURNAME ?? ""}</td>
                    <td>{item?.EMAIL ?? ""}</td>
                    <td>{item?.CELLNUMBER ?? ""}</td> */}

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
                    {loading ? "Loading..." : "No Status Found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        <StatusViewModal
          show={showModal}
          onClose={() => setShowModal(false)}
          selectedItem={selectedItem}
          selectedItemImages={selectedItemImages}
        />
      </div>
    </div>
  );
};

export default StatusList;
