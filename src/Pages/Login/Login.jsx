import React, { useState } from "react";
import { login } from "../../redux/LoginSlice";
import "./Login.css";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage("");

    if (!username.trim() || !password) {
      const msg = "Please enter both username and password";
      setErrorMessage(msg);
      alertify.alert("Validation", msg);
      return;
    }

    try {
      setIsLoading(true);

      const device = navigator.userAgent || "Web";

      const tryLogin = async (usertype) => {
        return await dispatch(
          login({
            username: username.trim(),
            password,
            usertype,
            device,
            userlattitude: "0",
            userlongitude: "0",
          })
        ).unwrap();
      };

      const userTypesToTry = ["A", "C"];
      let finalError = "Invalid username or password.";

      for (const type of userTypesToTry) {
        try {
          await tryLogin(type);
          navigate("/dashboard");
          return;
        } catch (err) {
          const msg = typeof err === "string" ? err : err?.message || "Unable to login.";
          finalError = msg;
        }
      }

      throw new Error(finalError);
    } catch (err) {
      const msg = typeof err === "string" ? err : err?.message || "Unable to login.";
      setErrorMessage(msg);
      alertify.alert("Error", msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
     
        <div className="left-panel">
          {/* <div className="left-shapes">
            <div className="circle-large" />
            <div className="circle-small" />
            <div className="circle-medium" />
          </div> */}
          <div className="left-content">
            <div className="left-illustration" aria-hidden="true">
             <img 
            src="/assets/img/manwithlaptopp.jpg" 
            alt="Illustration of man with laptop" 
          />
            </div>
            <h1>WELCOME <span role="img" aria-label="bouquet"></span>
</h1>
            <h2>Customer 360 Project</h2>
            <p>
               Manage your tasks, track your progress, and stay connected on the go with our modern mobile platform.
            </p>
          </div>
        </div>

        <div className="right-panel">
          <div className="right-inner">
            <h3>Login</h3>
            <p className="subtitle">Sign in to your account</p>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="input-wrap">
              <label>Username</label>
              <div className="icon-input">
                <span className="icon user-icon" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="User Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="input-wrap">
              <label>Password</label>
              <div className="icon-input">
                <span className="icon lock-icon" aria-hidden="true" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="row-small">
              <label className="remember">
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
            </div>

            {/* <button className="btn-login" onClick={handleLogin} disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </button> */}

             <button className="btn-login" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? (
              <>
                Login <i className="fa fa-spinner fa-spin"></i>
              </>
            ) : (
              "Login"
            )}
          </button>


            <div className="bottom-text">
              Dont have an account? <Link to="/register">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>

    
  );
}

export default Login;
