import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "./ForgotPassword.css";
import { forgotPassword } from "../../services/AuthApi";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your email address");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);
      await forgotPassword(email.trim());

      alertify.alert(
        "Reset Link Sent",
        "If the email exists, a password reset link has been sent.",
        () => navigate("/")
      );
    } catch (error) {
      const msg = error?.message || "Failed to send reset link. Please try again.";
      setErrorMessage(msg);
      alertify.alert("Error", msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <div className="forgot-left-panel">
          <div className="forgot-left-content">
            <Link to="/" className="back-link">
              <span aria-hidden="true">&larr;</span> Back to Sign In
            </Link>

            <h1>Reset Your Password</h1>
            <p className="left-subtitle">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleResetRequest}>
              <div className="input-wrap">
                <label>Email Address</label>
                <div className="icon-input">
                  <span className="icon email-icon" aria-hidden="true" />
                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

              <button className="btn-send" type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </div>
        </div>

        <div className="forgot-right-panel">
          <div className="forgot-right-inner">
            <h3>Need Help?</h3>

            <div className="help-card">
              <h4>Account Security</h4>
              <p>
                We take your account security seriously. You&apos;ll receive a
                secure link that expires in 24 hours.
              </p>
            </div>

            <div className="help-card">
              <h4>Problems?</h4>
              <p>
                If you still can&apos;t access your account, contact our support
                team at support@itsadmin.com
              </p>
            </div>

            <div className="help-card">
              <h4>Security Tips</h4>
              <p>
                Use a strong, unique password and never share it with anyone.
                Change your password regularly.
              </p>
            </div>

            <div className="bottom-text">
              Remembered your password? <Link to="/">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
