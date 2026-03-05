import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { registerUser } from "../../redux/RegistrationSlice";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, registrationResult } = useSelector(
    (state) => state.registration || {}
  );

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

  // Auto username from email
  useEffect(() => {
    if (form.emaail) {
      setForm((prev) => ({ ...prev, username: prev.emaail }));
    }
  }, [form.emaail]);

 useEffect(() => {

  if (registrationResult?.success === true) {
    alertify.alert("Success", "Customer registered successfully", () => {
      navigate("/Login");
    });
  }

  if (registrationResult?.success === false) {
    alertify.alert("Error", registrationResult.message);
  }

}, [registrationResult]);

  // ✅ CORRECT HANDLE CHANGE
const handleChange = (e) => {
  const { name, value } = e.target;
  let updatedValue = value;
  let errorMessage = "";

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^[0-9]{10}$/;
  const idRegex = /^[0-9]{13}$/;

  // Name & Surname → only letters
  if (name === "firstname" || name === "surname") {
    if (!/^[A-Za-z\s]*$/.test(value)) return;
    if (!value.trim()) errorMessage = "This field is required";
  }

  // Email
  if (name === "emaail") {
    if (!value) errorMessage = "Email is required";
    else if (!emailRegex.test(value)) errorMessage = "Enter valid email";
  }

  // Mobile
  if (name === "mobile") {
    updatedValue = value.replace(/\D/g, "").slice(0, 10);

    if (!updatedValue)
      errorMessage = "Mobile is required";
    else if (!mobileRegex.test(updatedValue))
      errorMessage = "Mobile must be 10 digits";
  }

  // ID Number
  if (name === "idnumber") {
    updatedValue = value.replace(/\D/g, "").slice(0, 13);

    if (!updatedValue)
      errorMessage = "ID number is required";
    else if (!idRegex.test(updatedValue))
      errorMessage = "ID must be 13 digits";
  }

  // Password
  if (name === "password") {
    if (!value) errorMessage = "Password is required";
  }

  // Confirm Password
  if (name === "confirmPassword") {
    if (!value)
      errorMessage = "Confirm password is required";
    else if (value !== form.password)
      errorMessage = "Passwords do not match";
  }

  // Dropdowns
  if (name === "title" || name === "gender") {
    if (!value) errorMessage = "This field is required";
  }

  if (name === "ward") {
    if (!value.trim()) errorMessage = "Ward number is required";
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

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^[0-9]{10}$/;
  const idRegex = /^[0-9]{13}$/;

  if (!form.title) newErrors.title = "Title is required";

  if (!form.firstname.trim())
    newErrors.firstname = "Name is required";

  if (!form.surname.trim())
    newErrors.surname = "Surname is required";

  if (!form.emaail)
    newErrors.emaail = "Email is required";
  else if (!emailRegex.test(form.emaail))
    newErrors.emaail = "Enter valid email (e.g. user@gmail.com)";

  if (!form.mobile)
    newErrors.mobile = "Mobile number is required";
  else if (!mobileRegex.test(form.mobile))
    newErrors.mobile = "Mobile must be exactly 10 digits";

  if (!form.gender)
    newErrors.gender = "Gender is required";

  if (!form.address.trim())
    newErrors.address = "Address is required";

  if (!form.idnumber)
    newErrors.idnumber = "ID number is required";
  else if (!idRegex.test(form.idnumber))
    newErrors.idnumber = "ID must be exactly 13 digits";

  if (!form.ward.trim())
    newErrors.ward = "Ward number is required";

  if (!form.password)
    newErrors.password = "Password is required";

  if (!form.confirmPassword)
    newErrors.confirmPassword = "Confirm password is required";
  else if (form.password !== form.confirmPassword)
    newErrors.confirmPassword = "Passwords do not match";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

dispatch(
  registerUser({
    title: form.title,
    firstname: form.firstname,
    lastname: form.surname,     
    username: form.username,
    emaail: form.emaail,
    mobile: form.mobile,
    address: form.address , 
    gender: form.gender,
    idnumber: form.idnumber,
    ward: form.ward,
    password: form.password,
    confirmpassword: form.confirmPassword,
  })
);
  };

  return (
      <div className="register-wrapper">
      <form className="register-card" onSubmit={handleSubmit}>
        <div className="header">
          <h2>Customer Registration</h2>
          <button type="button" onClick={() => navigate("/")} className="back-button">
            ✕
          </button>
        </div>

        <div className="form-grid">

          {/* TITLE */}
          <div className={`form-field ${errors.title ? "field-error" : ""}`}>
            <span className="icon-box"><i className="fas fa-id-badge"></i></span>
            <select name="title" value={form.title} onChange={handleChange}>
              <option value="">Select Title</option>
              <option value="Miss">Miss</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
            </select>
            {errors.title && <div className="error-message">{errors.title}</div>}
          </div>

          {/* FIRSTNAME */}
          <div className={`form-field ${errors.firstname ? "field-error" : ""}`}>
            <span className="icon-box"><i className="fas fa-user"></i></span>
            <input name="firstname" value={form.firstname} onChange={handleChange} placeholder="Name" />
            {errors.firstname && <div className="error-message">{errors.firstname}</div>}
          </div>

          {/* SURNAME */}
          <div className={`form-field ${errors.surname ? "field-error" : ""}`}>
            <span className="icon-box"><i className="fas fa-user-tag"></i></span>
            <input name="surname" value={form.surname} onChange={handleChange} placeholder="Surname" />
            {errors.surname && <div className="error-message">{errors.surname}</div>}
          </div>

          {/* EMAIL */}
          <div className={`form-field ${errors.emaail ? "field-error" : ""}`}>
            <span className="icon-box"><i className="fas fa-envelope"></i></span>
            <input type="email" name="emaail" value={form.emaail} onChange={handleChange} placeholder="Email" />
            {errors.emaail && <div className="error-message">{errors.emaail}</div>}
          </div>

          {/* MOBILE */}
          <div className={`form-field ${errors.mobile ? "field-error" : ""}`}>
            <span className="icon-box"><i className="fas fa-phone"></i></span>
            <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" />
            {errors.mobile && <div className="error-message">{errors.mobile}</div>}
          </div>

          {/* GENDER */}
          <div className={`form-field ${errors.gender ? "field-error" : ""}`}>
            <span className="icon-box"><i className="fas fa-venus-mars"></i></span>
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            {errors.gender && <div className="error-message">{errors.gender}</div>}
          </div>

           
          <div className={`form-field ${errors.ward ? "field-error" : ""}`}>
             <span className="icon-box"><i className="fas fa-home"></i></span>
            <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
            {errors.address && <div className="error-message">{errors.address}</div>}
          </div>

          {/* ID NUMBER */}
          <div className={`form-field ${errors.idnumber ? "field-error" : ""}`}>
            <span className="icon-box"><i className="fas fa-id-card"></i></span>
            <input name="idnumber" value={form.idnumber} onChange={handleChange} placeholder="ID Number" />
            {errors.idnumber && <div className="error-message">{errors.idnumber}</div>}
          </div>

          {/* WARD */}
          <div className={`form-field ${errors.ward ? "field-error" : ""}`}>
            <span className="icon-box"><i className="fas fa-map-marker-alt"></i></span>
            <input name="ward" value={form.ward} onChange={handleChange} placeholder="Ward Number" />
            {errors.ward && <div className="error-message">{errors.ward}</div>}
          </div>

          {/* PASSWORD */}
          <div className={`form-field ${errors.password ? "field-error" : ""}`}>
            <span className="icon-box"><i className="fas fa-lock"></i></span>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className={`form-field ${errors.confirmPassword ? "field-error" : ""}`}>
            <span className="icon-box"><i className="fas fa-lock"></i></span>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>

          {/* USERNAME */}
          <div className="form-field">
            <span className="icon-box"><i className="fas fa-user-circle"></i></span>
            <input type="text" name="username" value={form.username} placeholder="Username" readOnly style={{ background: "#e9ecef" }} />
          </div>


        </div>

       <button className="btn-register" type="submit" disabled={loading}>
  {loading && <span className="spinner"></span>} Register
  
</button>

      </form>
    </div>
  );
};

export default Registration;