import React, { useState } from "react";
import { login } from "../../redux/LoginSlice";
import "./Login.css";
import alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



function Login() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
  if (!username || !password) {
    alertify.alert("Validation", "Please username email and password");
    return;
  }

  try {
    setIsLoading(true); 
    const response = await dispatch(
      login({
        username: username,
        password: password,
        usertype: "Null",
        device: "Null",
        userlattitude: "0",
        userlongitude: "0"
      })
    ).unwrap();
  
    console.log("Login Success:", response);
     navigate("/dashboard");


  } catch (error) {
    alertify.alert("Error", error);
  }
  finally{
    setIsLoading(false); 
  }
};


  return (
    <div className="login-page">
       {/* Top Right Registration Link */}
       {/* Top Right Registration Link */}
    <div className="top-register">
      <Link to="/register" className="register-link">
         Registration
      </Link>
    </div>
      
      <div className="login-container">
        <div className="login-form">
          <h3>Login</h3>
          <p className="subtitle">Sign in to your account</p>

          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn-login" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? (
              <>
               Login <i className="fa fa-spinner fa-spin"></i> 
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* <p className="signup-link">
  <Link to="/register">Sign Up</Link>
</p> */}

        </div>

        <div className="signup-panel">
          <h1 style={{color:'white'}}>
            Welcome <span>To</span> <strong>Customer 360</strong>
          </h1>
          <p className="product-name">Customer 360</p>
          <div className="powered-by">
            Powered by <span>Sixstep Solution</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
