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
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage("");
    if (!username || !password) {
      alertify.alert("Validation", "Please enter both email and password");
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
      // display a friendly message
      const msg = error?.message || "Unable to login. Please try again.";
      setErrorMessage(msg);
      alertify.alert("Error", msg);
    } finally {
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

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
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
