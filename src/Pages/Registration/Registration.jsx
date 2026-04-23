import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import {
  clearRegistrationResult,
  registerUser,
  resetRegistrationState,
  fetchGISData
} from "../../redux/RegistrationSlice";
import Pagination from "../../Components/Pagination";
import CryptoJS from "crypto-js";


const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const backonClose = () => {
    navigate("/");   
  };

  const { registrationResult } = useSelector(
    (state) => state.registration || {}
  );


const gisData = useSelector(
  (state) => state.registration?.gisData || []
);
const gisLoading = useSelector(
  (state) => state.registration?.gisLoading || false
);

const totalCount = useSelector(
  (state) => state.registration?.totalCount || 0
);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{12,}$/;

  const [form, setForm] = useState({
    title: "",
    firstname: "",
    surname: "",
    emaail: "",
    mobile: "",
    gender: "",
    idnumber: "",
    ward: "",
    password: "",
    confirmPassword: "",
    username: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

const [showGISModal, setShowGISModal] = useState(false);
const [gisSearch, setGISSearch] = useState("");
const [pageIndex, setPageIndex] = useState(1);
const pageSize = 10;


  // Auto username from email (only if username empty)
  useEffect(() => {
    if (form.emaail && !form.username) {
      setForm((prev) => ({ ...prev, username: form.emaail }));
    }
  }, [form.emaail]);

  useEffect(() => {
    dispatch(resetRegistrationState());
  }, [dispatch]);

  

const handlePageChange = (newPage) => {
  setPageIndex(newPage);
  dispatch(fetchGISData({
    wardNo: gisSearch,
    page: newPage,
    pageSize: 10
  }));
};

  // useEffect(() => {
  //   if (registrationResult?.success === true) {
  //     alertify.alert("Success", "Customer registered successfully", () => {
  //       dispatch(clearRegistrationResult());
  //       navigate("/");
  //     });
  //     return;
  //   }

  //   if (registrationResult?.success === false) {
  //     alertify.alert("Error", registrationResult.message);
  //     dispatch(clearRegistrationResult());
  //   }
  // }, [registrationResult, dispatch, navigate]);

  useEffect(() => {
  if (registrationResult?.success === true) {
    alertify.alert(
      "Success",
      "Customer registered successfully",
      () => {
        dispatch(clearRegistrationResult());
        navigate("/"); // ✅ redirect ONLY on success
      }
    );
    return;
  }

  if (registrationResult?.success === false) {
    alertify.alert(
      "Error",
      registrationResult.message,
      () => {
        // ❌ NO redirect here
        // ✅ Stay on same page
        dispatch(clearRegistrationResult());
      }
    );
  }
}, [registrationResult, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    let errorMessage = "";

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^[0-9]{10}$/;
    const idRegex = /^[0-9]{13}$/;

    if (name === "username") {
      if (!value.trim()) errorMessage = "Username is required";
    }

    if (name === "firstname" || name === "surname") {
      if (!/^[A-Za-z\s]*$/.test(value)) return;
      if (!value.trim()) errorMessage = "This field is required";
    }

    if (name === "emaail") {
      if (!value) errorMessage = "Email is required";
      else if (!emailRegex.test(value))
        errorMessage = "Enter valid email";
    }

    if (name === "mobile") {
      updatedValue = value.replace(/\D/g, "").slice(0, 10);

      if (!updatedValue) errorMessage = "Mobile is required";
      else if (!mobileRegex.test(updatedValue))
        errorMessage = "Mobile must be 10 digits";
    }

    if (name === "idnumber") {
      updatedValue = value.replace(/\D/g, "").slice(0, 13);

      if (!updatedValue) errorMessage = "ID number is required";
      else if (!idRegex.test(updatedValue))
        errorMessage = "ID must be 13 digits";
    }

    // if (name === "password") {
    //   if (!value) errorMessage = "Password is required";
    //   else if (value.length < 12)
    //     errorMessage =
    //       "Password must be at least 12 characters";
    // }

    if (name === "password") {
  if (!value) {
    errorMessage = "Password is required";
  } else if (!strongPasswordRegex.test(value)) {
    errorMessage =
      "Password must be 12+ chars, include uppercase, lowercase, number & special character";
  }
}

    if (name === "confirmPassword") {
      if (!value)
        errorMessage = "Confirm password is required";
      else if (value !== form.password)
        errorMessage = "Passwords do not match";
    }

    if (name === "title" || name === "gender") {
      if (!value) errorMessage = "This field is required";
    }

    if (name === "ward") {
      if (!value.trim())
        errorMessage = "Ward number is required";
    }

    setForm((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const validate = () => {
    let newErrors = {};

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^[0-9]{10}$/;
    const idRegex = /^[0-9]{13}$/;

    if (!form.title) newErrors.title = "Title is required";

    if (!form.firstname.trim())
      newErrors.firstname = "Name is required";

    if (!form.surname.trim())
      newErrors.surname = "Surname is required";

    if (!form.username.trim())
      newErrors.username = "Username is required";

    if (!form.emaail)
      newErrors.emaail = "Email is required";
    else if (!emailRegex.test(form.emaail))
      newErrors.emaail = "Enter valid email";

    if (!form.mobile)
      newErrors.mobile = "Mobile number is required";
    else if (!mobileRegex.test(form.mobile))
      newErrors.mobile = "Mobile must be 10 digits";

    if (!form.gender)
      newErrors.gender = "Gender is required";

    if (!form.address.trim())
      newErrors.address = "Address is required";

    if (!form.idnumber)
      newErrors.idnumber = "ID number is required";
    else if (!idRegex.test(form.idnumber))
      newErrors.idnumber = "ID must be 13 digits";

    if (!form.ward.trim())
      newErrors.ward = "Ward number is required";

    // if (!form.password)
    //   newErrors.password = "Password is required";
    // else if (form.password.length < 12)
    //   newErrors.password =
    //     "Password must be at least 12 characters";

    if (!form.password) {
  newErrors.password = "Password is required";
} else if (!strongPasswordRegex.test(form.password)) {
  newErrors.password =
    "Password must be 12+ chars, include uppercase, lowercase, number & special character";
}

    if (!form.confirmPassword)
      newErrors.confirmPassword =
        "Confirm password is required";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword =
        "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validate()) return;

    const encryptedPassword =
      CryptoJS.SHA256(form.password).toString();

    setIsSubmitting(true);
    try {
      await dispatch(
        registerUser({
          title: form.title,
          firstname: form.firstname,
          lastname: form.surname,
          username: form.username,
          emaail: form.emaail,
          mobile: form.mobile,
          address: form.address,
          gender: form.gender,
          idnumber: form.idnumber,
          ward: form.ward,
          password: encryptedPassword,
        })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setForm({
      title: "",
      firstname: "",
      surname: "",
      emaail: "",
      mobile: "",
      gender: "",
      idnumber: "",
      ward: "",
      password: "",
      confirmPassword: "",
      username: "",
      address: "",
    });
    setErrors({});
  };

  return (
    <div className="register-wrapper">
      <span className="background-paint" />
      <form
        className="register-card"
        onSubmit={handleSubmit}
      >
        <div className="header">
          <div>
            <h2 style={{ marginLeft: "-8%" }}>Customer Registration</h2>
            {/* <div className="sub-title">Please fill in your details to create a new account</div> */}
          </div>
          <button
            type="button"
            className="backclose-button"
            onClick={backonClose}
            aria-label="Close registration"
          style={{ color: "red" }}
          >
            ✕
          </button>
        </div>
        <div className="form-grid">

          {/* TITLE */}
         <div className={`form-field ${errors.title ? "field-error" : ""}`}>
            <div className="field-control">
              <span className="icon-box"><i className="fas fa-id-badge"></i></span>
              <select name="title" value={form.title} onChange={handleChange}>
                <option value="">Select Title</option>
                <option value="Miss">Miss</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Dr">Dr</option>
                <option value="Prof">Prof</option>
              </select>
            </div>
            {errors.title && <div className="error-message">{errors.title}</div>}
          </div>
          {/* ID */}
        <div className={`form-field ${errors.idnumber ? "field-error" : ""}`}>
            <div className="field-control">
              <span className="icon-box"><i className="fas fa-id-card"></i></span>
              <input name="idnumber" value={form.idnumber} onChange={handleChange} placeholder="ID Number" />
            </div>
            {errors.idnumber && <div className="error-message">{errors.idnumber}</div>}
          </div>

          {/* FIRSTNAME */}
          <div className={`form-field ${errors.firstname ? "field-error" : ""}`}>
            <div className="field-control">
              <span className="icon-box"><i className="fas fa-user"></i></span>
              <input name="firstname" value={form.firstname} onChange={handleChange} placeholder="Name" />
            </div>
            {errors.firstname && <div className="error-message">{errors.firstname}</div>}
          </div>

          {/* SURNAME */}
          <div className={`form-field ${errors.surname ? "field-error" : ""}`}>
            <div className="field-control">
              <span className="icon-box"><i className="fas fa-user-tag"></i></span>
              <input name="surname" value={form.surname} onChange={handleChange} placeholder="Surname" />
            </div>
            {errors.surname && <div className="error-message">{errors.surname}</div>}
          </div>

          {/* EMAIL */}
          <div className={`form-field ${errors.emaail ? "field-error" : ""}`}>
            <div className="field-control">
              <span className="icon-box"><i className="fas fa-envelope"></i></span>
              <input type="email" name="emaail" value={form.emaail} onChange={handleChange} placeholder="Email" />
            </div>
            {errors.emaail && <div className="error-message">{errors.emaail}</div>}
          </div>

          {/* USERNAME */}
          <div className={`form-field ${errors.username ? "field-error" : ""}`}>
            <div className="field-control">
              <span className="icon-box"><i className="fas fa-user-circle"></i></span>
              <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Username" />
            </div>
            {errors.username && <div className="error-message">{errors.username}</div>}
          </div>

          {/* MOBILE */}
          <div className={`form-field ${errors.mobile ? "field-error" : ""}`}>
            <div className="field-control">
              <span className="icon-box"><i className="fas fa-phone"></i></span>
              <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" />
            </div>
            {errors.mobile && <div className="error-message">{errors.mobile}</div>}
          </div>

          {/* GENDER */}
          <div className={`form-field ${errors.gender ? "field-error" : ""}`}>
            <div className="field-control">
              <span className="icon-box"><i className="fas fa-venus-mars"></i></span>
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
            {errors.gender && <div className="error-message">{errors.gender}</div>}
          </div>

         {/* ADDRESS */}
          {/* <div className={`form-field ${errors.address ? "field-error" : ""}`}>
            <div className="field-control">
              <span className="icon-box"><i className="fas fa-home"></i></span>
              <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
            </div>
            {errors.address && <div className="error-message">{errors.address}</div>}
          </div> */}

          {/* WARD */}
          {/* <div className={`form-field ${errors.ward ? "field-error" : ""}`}>
            <div className="field-control">
              <span className="icon-box"><i className="fas fa-map-marker-alt"></i></span>
              <input name="ward" value={form.ward} onChange={handleChange} placeholder="Ward Number" />
            </div>
            {errors.ward && <div className="error-message">{errors.ward}</div>}
          </div> */}

 <div className="form-field">
  <div className="field-control">
    <span className="icon-box">
      <i className="fas fa-home"></i>
    </span>
    <input
      name="address"
      value={form.address}
      placeholder="Address"
      readOnly
      style={{
        backgroundColor: "#f2f2f2",
        color: "#4f4d4d",
        cursor: "not-allowed"
      }}
    />
    <button
      type="button"
      className="gis-search-trigger"
      aria-label="Search property"
      onClick={() => {
        setShowGISModal(true);
        dispatch(fetchGISData({
          wardNo: "",
          page: 1,
          pageSize: 10
        }));
      }}
    >
      <i className="fa fa-search" />
    </button>
  </div>
</div>

<div className="form-field">
  <div className="field-control">
    <span className="icon-box">
      <i className="fas fa-map-marker-alt"></i>
    </span>
    <input
      name="ward"
      value={form.ward}
      placeholder="Ward No"
      readOnly
      style={{
        backgroundColor: "#f2f2f2",
        color: "#4f4d4d",
        cursor: "not-allowed"
      }}
    />
  </div>
</div>

          {/* PASSWORD */}
          <div className={`form-field ${errors.password ? "field-error" : ""}`}>
            <div className="field-control">
              <span className="icon-box"><i className="fas fa-lock"></i></span>
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
            </div>
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className={`form-field ${errors.confirmPassword ? "field-error" : ""}`}>
            <div className="field-control">
              <span className="icon-box"><i className="fas fa-lock"></i></span>
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
            </div>
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>

        </div>

        <div className="form-actions">
          <button
  className={`btn-register ${isSubmitting ? "loading" : ""}`}
  type="submit"
  disabled={isSubmitting} >
  {isSubmitting && <span className="register-spinner"></span>}
  {isSubmitting ? "Registering..." : "Register"}
</button>
          <button
            className="btn-clear"
            type="button"
            onClick={handleClear}
            disabled={isSubmitting}
          >
            Clear
          </button>
        </div>

      </form>

{showGISModal && (
  <div className="gis-overlay">
    <div className="gis-modal">
      
      {/* Header */}
      <div className="modal-header">
        <h3>Customer Details</h3>
    <button
  className="close-btn"
  onClick={() => setShowGISModal(false)}
>
  ✕
</button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search"
        value={gisSearch}
        onChange={(e) => {
          setGISSearch(e.target.value);
          setPageIndex(1); // reset page

dispatch(fetchGISData({
  wardNo: e.target.value,
  page: 1,
  pageSize: 10
}));
        }}
        className="modal-search"
      />

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Ward Number</th>
              <th>Address</th>
             
            </tr>
          </thead>

         <tbody>
  {gisLoading ? (
    <tr>
      <td colSpan="2" className="gis-loading-cell">
        <div className="gis-loading-wrap">
          <span className="gis-loading-spinner" aria-hidden="true" />
        </div>
      </td>
    </tr>
  ) : gisData?.length > 0 ? (
    gisData.map((item) => (
      <tr
        key={item.id}
        onClick={() => {
          setForm((prev) => ({
            ...prev,
            ward: item.wardNo,
            address: item.address,
          }));
          setShowGISModal(false);
        }}
      >
        <td>{item.wardNo}</td>
        <td>{item.address}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="2" style={{ textAlign: "center" }}>
        No Data Found
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

    </div>
  </div>
)}
    </div>
  );
};

export default Registration;