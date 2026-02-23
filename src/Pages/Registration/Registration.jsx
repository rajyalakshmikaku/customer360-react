import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Registration.css";
import { useNavigate } from "react-router-dom";



const Registration = () => {
 
    const navigate = useNavigate();
     const handleBack = () => {
     navigate('/'); 

  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        
        <div className="header">
          <h2>Customer Registration</h2>
             {/* <button
            type="button"
            className="close-btn"
            onClick={() => navigate("/login")}  >
          </button> */}
        <button type="button" onClick={handleBack} className="back-button">
          ✕
        </button>
        </div>


<div className="form-grid">
  <div className="form-field">
    <span className="icon-box"><i className="fas fa-id-badge"></i></span>
    <select>
      <option>Select Title</option>
       <option>Miss</option>
      <option>Mr</option>
      <option>Mrs</option>
    </select>
  </div>

  <div className="form-field">
    <span className="icon-box"><i className="fas fa-user"></i></span>
    <input placeholder="Name" />
  </div>

  <div className="form-field">
    <span className="icon-box"><i className="fas fa-user-tag"></i></span>
    <input placeholder="Surname" />
  </div>

  <div className="form-field">
    <span className="icon-box"><i className="fas fa-envelope"></i></span>
    <input placeholder="Email" />
  </div>

  <div className="form-field">
    <span className="icon-box"><i className="fas fa-phone"></i></span>
    <input placeholder="Mobile" />
  </div>

  <div className="form-field">
    <span className="icon-box"><i className="fas fa-venus-mars"></i></span>
    <select>
      <option>Select Gender</option>
      <option>Male</option>
      <option>Female</option>
      <option>Others</option>
    </select>
  </div>

  <div className="form-field">
    <span className="icon-box"><i className="fas fa-id-card"></i></span>
    <input placeholder="ID Number" />
  </div>

  <div className="form-field">
    <span className="icon-box"><i className="fas fa-map-marker-alt"></i></span>
    <input placeholder="Ward Number" />
  </div>

  <div className="form-field">
    <span className="icon-box"><i className="fas fa-lock"></i></span>
    <input type="password" placeholder="Password" />
  </div>

  <div className="form-field">
    <span className="icon-box"><i className="fas fa-lock"></i></span>
    <input type="password" placeholder="Confirm Password" />
  </div>

  <div className="form-field">
    <span className="icon-box"><i className="fas fa-user-circle"></i></span>
    <input type="text" placeholder="User Name"  
     style={{ backgroundColor: "rgb(233, 236, 239)" }} readOnly  />
  </div>

</div>




        <button className="btn-register">Register</button>
      </div>
    </div>
  );
}


export default Registration;
