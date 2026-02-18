import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UsersList.css";
import { fetchUserListInfo } from "../../redux/UserListSlice";
import Pagination from "../../Components/Pagination";

const UsersList = () => {
  const dispatch = useDispatch();
  const { UserListInfo = [], loading, totalCount = 0 } = useSelector((state) => state.User || {});

  const [showForm, setShowForm] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState("USERID");

  useEffect(() => {
    dispatch(fetchUserListInfo({ pageIndex, pageSize, search, sorting }));
  }, [dispatch, pageIndex, pageSize, search, sorting]);

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return (
    <div className="users-page">

      {!showForm && (
        <div className="page-header">
          <h3>Users Details</h3>
          <button className="btn add" onClick={() => setShowForm(true)}>
            + Add User
          </button>
        </div>
      )}

       {/* ================= ADD USER PAGE ================= */}
      {showForm && (
        <div className="add-user-section">

          <div className="add-user-header">
            <h4>Add User</h4>
            <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>
          </div>

          <div className="form-grid">
            <div><label>Name </label><input type="text" /></div>
            <div><label>Surname </label><input type="" /></div>

            <div>
              <label>User Type </label>
              <select><option>Select User Type</option>
              <option>Admin</option>
              <option>Councillor</option>
              <option>User</option></select>
            </div>

            <div><label>Email </label><input type="email" /></div>
            <div><label>Password </label><input type="" /></div>

            <div>
              <label>Gender </label>
              <select><option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
              </select>
              
            </div>

            <div><label>Mobile </label><input type="text" /></div>
            <div><label>Id Number </label><input type="text" readOnly /></div>
            <div><label>Minicipality </label><input type="text" readOnly /></div>
            <div><label>Address </label><input type="text" readOnly /></div>
            <div><label>Ward No </label><input type="text" readOnly /></div>
            <div><label>District Name </label><input type="text" readOnly /></div>
            <div><label>City </label><input type="text" readOnly /></div>
            <div><label>Province </label><input type="text" readOnly /></div>
            <div><label>Pin </label><input type="text" readOnly /></div>

            <div>
              <label>Status </label>
              <select><option>Select Status</option><option>Active</option><option>Inactive</option></select>
            </div>
          </div>

          <div className="form-actions">
            <button className="btn save">Save</button>
            <button className="btn cancel" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}


      {!showForm && (
        <div className="users-list-section">

          <div className="table-top">
            <div>
              Records per page{" "}
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPageIndex(1); // 👈 page size change ayithe first page ki vellali
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPageIndex(1);
              }}
            />
          </div>

          {/* {loading && <p>Loading...</p>} */}

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>NAME</th>
                  <th>SURNAME</th>
                  <th>EMAIL</th>
                  <th>ADDRESS</th>
                  <th>MOBILE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {UserListInfo.length > 0 ? (
                  UserListInfo.map((item, index) => (
                    <tr key={item.USERID || index}>
                      <td>{item.NAME}</td>
                      <td>{item.SURNAME}</td>
                      <td>{item.EMAIL}</td>
                      <td>{item.ADDRESS}</td>
                      <td>{item.CELLNUMBER}</td>
                      <td>{item.ACTIVESTATUS}</td>
                      <td className="action-col">
                        <i className="fa fa-edit edit-icon" title="Edit"></i>
                        <i className="fa fa-trash delete-icon" title="Delete"></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No Users Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ✅ Pagination */}
        <Pagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={(page) => setPageIndex(page)}
      />

        </div>
      )}
    </div>
  );
};

export default UsersList;
