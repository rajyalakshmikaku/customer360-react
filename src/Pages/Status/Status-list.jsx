import { useEffect, useState } from "react";
import "./Status.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatusListInfo } from "../../redux/StatusListSlice";
import StatusViewModal from "./StatusViewModal";

const StatusList = () => {
  const dispatch = useDispatch();

  const { StatusListInfo = [], loading, totalCount = 0 } =
    useSelector((state) => state.StatusList || {});

  // DATE FILTER
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // MODAL
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemImages, setSelectedItemImages] = useState([]);

  // PAGING / SEARCH
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState("USERID");
  
  useEffect(() => {
    dispatch(fetchStatusListInfo({
      pageIndex,
      pageSize,
      search,
      sorting
    }));
  }, [dispatch, pageIndex, pageSize, search, sorting]);

  // FETCH DATA
  // useEffect(() => {
  //   dispatch(
  //     fetchStatusListInfo({
  //       pageIndex,
  //       pageSize,
  //       search,
  //       sorting
  //     })
  //   );
  // }, [dispatch, pageIndex, pageSize, search, sorting]);

  // SEARCH CLICK
  const handleSearch = () => {
    setPageIndex(1);
    dispatch(
      fetchStatusListInfo({
        pageIndex: 1,
        pageSize,
        search,
        sorting
      })
    );
  };

  // CLEAR
  const handleClear = () => {
    // setFromDate("");
    // setToDate("");
    setSearch("");
    setPageIndex(1);
  };

  // VIEW
  const handleView = (item) => {
    setSelectedItem(item);
    setSelectedItemImages(item?.Images || []);
    setShowModal(true);
  };

  // FORMATTERS
  const formatDotNetDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  const formatTimeSpan = (timeString) => {
    if (!timeString) return "";
    return timeString.substring(0, 5);
  };

  return (
    <div className="layout-container">
      <div className="layout-page">
        <h3>Account List</h3>
        {/* FILTERS */}
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
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div> 
              <div className="d-flex gap-2">
                <button className="btn btn-success" onClick={handleSearch}>
                  Search
                </button>
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
              {StatusListInfo.length > 0 ? (
                StatusListInfo.map((item, index) => (
                  <tr key={item.USERID || index}>
                    <td>
                      <i
                        className="fa fa-eye text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleView(item)}
                      ></i>
                    </td>
                    <td>{item.WARD_NO}</td>
                    <td>{item.NAME}</td>
                    <td>{item.SURNAME}</td>
                    <td>{item.EMAIL}</td>
                    <td>{item.CELLNUMBER}</td>
                    <td>{item.ACTIVESTATUS}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No Status Found
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
          formatDotNetDate={formatDotNetDate}
          formatTimeSpan={formatTimeSpan}
        />
      </div>
    </div>
  );
};

export default StatusList;
