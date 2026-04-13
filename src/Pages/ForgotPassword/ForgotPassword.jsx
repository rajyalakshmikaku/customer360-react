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
  const [requestSent, setRequestSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
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
      const normalizedEmail = email.trim();
      await forgotPassword(normalizedEmail);
      setSentEmail(normalizedEmail);
      setRequestSent(true);
    } catch (error) {
      const msg = error?.message || "Failed to send reset link. Please try again.";
      setErrorMessage(msg);
      alertify.alert("Error", msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAgain = () => {
    setRequestSent(false);
    setErrorMessage("");
    setIsLoading(false);
  };

  return (
    <div className="forgot-page">
      <div className={`forgot-card ${requestSent ? "success-state" : ""}`}>
        <div className="forgot-left-panel">
          <div className="forgot-left-content">
            {!requestSent ? (
              <>
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
              </>
            ) : (
              <div className="mail-success">
                <div className="success-check" aria-hidden="true">
                  <i className="fa fa-check" />
                </div>

                <h1>Check Your Email</h1>
                <p className="left-subtitle success-subtitle">
                  We&apos;ve sent a password reset link to:
                </p>

                <div className="sent-email-box">{sentEmail}</div>

                <p className="success-note">
                  Click the link in the email to reset your password. The link
                  will expire in 24 hours.
                </p>

                <div className="next-steps-card">
                  <h4>What&apos;s next?</h4>
                  <ul>
                    <li>Check your inbox (and spam folder)</li>
                    <li>Click the reset link in the email</li>
                    <li>Create a new password</li>
                    <li>Sign back in to your account</li>
                  </ul>
                </div>
                    <br/>
                <button className="btn-send success-back" type="button" onClick={() => navigate("/")}>
                  Back to Sign In
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="forgot-right-panel">
          <div className="forgot-right-inner">
            {!requestSent ? (
              <>
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
              </>
            ) : (
              <div className="success-help-wrap">
                <h3>Didn&apos;t receive the email?</h3>
                <p>Check your spam folder or try requesting a new link.</p>
                <button className="btn-try-again" type="button" onClick={handleTryAgain}>
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
