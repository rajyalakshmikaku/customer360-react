// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import "./Registration.css";
// import { useNavigate } from "react-router-dom";



// const Registration = () => {
 
//     const navigate = useNavigate();
//      const handleBack = () => {
//      navigate('/'); 

//   };

//   return (
//     <div className="register-wrapper">
//       <div className="register-card">
        
//         <div className="header">
//           <h2>Customer Registration</h2>
//              {/* <button
//             type="button"
//             className="close-btn"
//             onClick={() => navigate("/login")}  >
//           </button> */}
//         <button type="button" onClick={handleBack} className="back-button">
//           ✕
//         </button>
//         </div>


// <div className="form-grid">
//   <div className="form-field">
//     <span className="icon-box"><i className="fas fa-id-badge"></i></span>
//     <select>
//       <option>Select Title</option>
//        <option>Miss</option>
//       <option>Mr</option>
//       <option>Mrs</option>
//     </select>
//   </div>

//   <div className="form-field">
//     <span className="icon-box"><i className="fas fa-user"></i></span>
//     <input placeholder="Name" />
//   </div>

//   <div className="form-field">
//     <span className="icon-box"><i className="fas fa-user-tag"></i></span>
//     <input placeholder="Surname" />
//   </div>

//   <div className="form-field">
//     <span className="icon-box"><i className="fas fa-envelope"></i></span>
//     <input placeholder="Email" />
//   </div>

//   <div className="form-field">
//     <span className="icon-box"><i className="fas fa-phone"></i></span>
//     <input placeholder="Mobile" />
//   </div>

//   <div className="form-field">
//     <span className="icon-box"><i className="fas fa-venus-mars"></i></span>
//     <select>
//       <option>Select Gender</option>
//       <option>Male</option>
//       <option>Female</option>
//       <option>Others</option>
//     </select>
//   </div>

//   <div className="form-field">
//     <span className="icon-box"><i className="fas fa-id-card"></i></span>
//     <input placeholder="ID Number" />
//   </div>

//   <div className="form-field">
//     <span className="icon-box"><i className="fas fa-map-marker-alt"></i></span>
//     <input placeholder="Ward Number" />
//   </div>

//   <div className="form-field">
//     <span className="icon-box"><i className="fas fa-lock"></i></span>
//     <input type="password" placeholder="Password" />
//   </div>

//   <div className="form-field">
//     <span className="icon-box"><i className="fas fa-lock"></i></span>
//     <input type="password" placeholder="Confirm Password" />
//   </div>

//   <div className="form-field">
//     <span className="icon-box"><i className="fas fa-user-circle"></i></span>
//     <input type="text" placeholder="User Name"  
//      style={{ backgroundColor: "rgb(233, 236, 239)" }} readOnly  />
//   </div>

// </div>




//         <button className="btn-register">Register</button>
//       </div>
//     </div>
//   );
// }


// export default Registration;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/RegistrationSlice";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, registrationResult } = useSelector(
    (state) => state.registration || {}
  );

  const [form, setForm] = useState({
    title: "",
    firstname: "",
    surname: "",
    emaail: "",        // keep backend spelling
    mobile: "",
    gender: "",
    idnumber: "",
    ward: "",
    password: "",
    confirmPassword: "",
    username: ""
  });

  // Auto-generate username from email
  useEffect(() => {
    if (form.emaail) {
      setForm((prev) => ({ ...prev, username: prev.emaail }));
    }
  }, [form.emaail]);

  // Success redirect
  useEffect(() => {
    if (registrationResult?.success === true) {
      alert("Registration successful! Please check your email to activate your account.");
      navigate("/login");
    }
  }, [registrationResult, navigate]);

  const handleBack = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.firstname || !form.surname || !form.emaail) {
      alert("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(registerUser({
      firstname: form.firstname,
      surname: form.surname,
      emaail: form.emaail,
      mobile: form.mobile,
      gender: form.gender,
      idnumber: form.idnumber,
      ward: form.ward,
      password: form.password,
      title: form.title
    }));
  };

  return (
    <div className="register-wrapper">
      <form className="register-card" onSubmit={handleSubmit}>
        <div className="header">
          <h2>Customer Registration</h2>
          <button type="button" onClick={handleBack} className="back-button">
            ✕
          </button>
        </div>

        <div className="form-grid">

          <div className="form-field">
            <span className="icon-box"><i className="fas fa-id-badge"></i></span>
            <select name="title" value={form.title} onChange={handleChange} required>
              <option value="">Select Title</option>
              <option value="Miss">Miss</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
            </select>
          </div>

          <div className="form-field">
            <span className="icon-box"><i className="fas fa-user"></i></span>
            <input
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>

          <div className="form-field">
            <span className="icon-box"><i className="fas fa-user-tag"></i></span>
            <input
              name="surname"
              value={form.surname}
              onChange={handleChange}
              placeholder="Surname"
              required
            />
          </div>

          <div className="form-field">
            <span className="icon-box"><i className="fas fa-envelope"></i></span>
            <input
              type="email"
              name="emaail"
              value={form.emaail}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>

          <div className="form-field">
            <span className="icon-box"><i className="fas fa-phone"></i></span>
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              required
            />
          </div>

          <div className="form-field">
            <span className="icon-box"><i className="fas fa-venus-mars"></i></span>
            <select name="gender" value={form.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="form-field">
            <span className="icon-box"><i className="fas fa-id-card"></i></span>
            <input
              name="idnumber"
              value={form.idnumber}
              onChange={handleChange}
              placeholder="ID Number"
              required
            />
          </div>

          <div className="form-field">
            <span className="icon-box"><i className="fas fa-map-marker-alt"></i></span>
            <input
              name="ward"
              value={form.ward}
              onChange={handleChange}
              placeholder="Ward Number"
              required
            />
          </div>

          <div className="form-field">
            <span className="icon-box"><i className="fas fa-lock"></i></span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          <div className="form-field">
            <span className="icon-box"><i className="fas fa-lock"></i></span>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </div>

          <div className="form-field">
            <span className="icon-box"><i className="fas fa-user-circle"></i></span>
            <input
              type="text"
              name="username"
              value={form.username}
              placeholder="User Name"
              style={{ backgroundColor: "rgb(233, 236, 239)" }}
              readOnly
            />
          </div>

        </div>

        {/* {error && <p className="error-text">{error}</p>} */}

        <button className="btn-register" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Registration;