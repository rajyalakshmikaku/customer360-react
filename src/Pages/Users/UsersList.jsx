import { useState } from "react";
import "./UsersList.css";

const UsersList = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="users-page">

      {/* ================= HEADER ================= */}
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

      {/* ================= USER LIST PAGE ================= */}
      {!showForm && (
        <div className="users-list-section">

          <div className="table-top">
            <div>
              Records per page
              <select>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>

            <input type="text" placeholder="Search" />
          </div>
          <br/>
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
      <tr>
        <td>Nancy</td>
        <td>A</td>
        <td>nancy12@gmail.com</td>
        <td>Hyderabad</td>
        <td>9876543210</td>
        <td>Active</td>
        <td className="action-col">
          <i className="fa fa-edit edit-icon" title="Edit"></i>
          <i className="fa fa-trash delete-icon" title="Delete"></i>
        </td>
      </tr>

      <tr>
        <td>Demon</td>
        <td>B</td>
        <td>demon33@mail.com</td>
        <td>Bangalore</td>
        <td>9123456780</td>
        <td>Active</td>
        <td className="action-col">
          <i className="fa fa-edit edit-icon" title="Edit"></i>
          <i className="fa fa-trash delete-icon" title="Delete"></i>
        </td>
      </tr>
    </tbody>
  </table>
</div>

          
        </div>
      )}
    </div>
  );
};

export default UsersList;
