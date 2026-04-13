import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { resetPassword } from "../../services/AuthApi";
import "./ResetPassword.css";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // email comes from the reset link query string: /reset-password?email=...
  const initialEmail = useMemo(() => searchParams.get("email") || "", [searchParams]);
  const resetCode = useMemo(
    () =>
      searchParams.get("resetCode") ||
      searchParams.get("token") ||
      searchParams.get("code") ||
      searchParams.get("resetToken") ||
      "",
    [searchParams]
  );

  const [email] = useState(initialEmail);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{12,}$/;

  const validate = () => {
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Email is required";
    }

    if (!newPassword.trim()) {
      nextErrors.newPassword = "New password is required";
    } else if (!strongPasswordRegex.test(newPassword)) {
      nextErrors.newPassword =
        "Password must be 12+ chars with uppercase, lowercase, number & special character";
    }

    if (!confirmPassword.trim()) {
      nextErrors.confirmPassword = "Confirm password is required";
    }

    if (newPassword !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  useEffect(() => {
    setErrors((prev) => {
      const nextErrors = { ...prev };

      if (newPassword && !strongPasswordRegex.test(newPassword)) {
        nextErrors.newPassword =
          "Password must be 12+ chars with uppercase, lowercase, number & special character";
      } else {
        delete nextErrors.newPassword;
      }

      if (confirmPassword && newPassword !== confirmPassword) {
        nextErrors.confirmPassword = "Passwords do not match";
      } else {
        delete nextErrors.confirmPassword;
      }

      return nextErrors;
    });
  }, [newPassword, confirmPassword]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setErrorMessage("");

  //   if (!validate()) {
  //     return;
  //   }

  //   try {
  //     setIsLoading(true);
  //     // Send compatibility payload via service including confirm + token/code.
  //     await resetPassword({
  //       email: email.trim(),
  //       newPassword,
  //       confirmPassword,
  //       token: resetToken,
  //       resetCode: resetToken,
  //     });

  //     alertify.alert("Success", "Password updated successfully.", () => {
  //       navigate("/");
  //     });
  //   } catch (error) {
  //     const msg = error?.message || "Failed to reset password.";
  //     setErrorMessage(msg);
  //     alertify.alert("Error", msg);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage("");

  if (!validate()) return;

  try {
    setIsLoading(true);

    await resetPassword({
      email: email.trim(),
      newPassword,
      confirmPassword,
      resetCode,
    });

    alertify.alert("Success", "Password updated successfully.", () => {
      navigate("/");
    });

  } catch (error) {
    const msg = error?.message || "Failed to reset password.";
    setErrorMessage(msg);
    alertify.alert("Error", msg);
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="reset-page">
      <div className="reset-card">
        <div className="reset-left-panel">
          <div className="reset-left-content">
            <Link to="/" className="back-link">
              <span aria-hidden="true">&larr;</span> Back to Sign In
            </Link>

            <h1>Create New Password</h1>
            <p className="left-subtitle">
              Enter your registered email and set a new password for your account.
            </p>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
             <div className="input-wrap">
  <label>Email Address</label>

  <div
    className="icon-input"
    style={{
      width: "100%",
      backgroundColor: "#e9ecef",
      border: "2px solid #7fa3e8"
    }}
  >
    <span className="icon email-icon" aria-hidden="true" />

    <input
      type="email"
      placeholder="Enter your registered email"
      value={email}
      readOnly
      onFocus={(e) => e.target.blur()}
      style={{
        width: "100%",
        backgroundColor: "transparent",
        color: "#6c757d",
        cursor: "not-allowed",
        border: "none",
        outline: "none",
        boxShadow: "none",
        padding: "14px 0",
        borderRadius: "0"
      }}
    />
  </div>
</div>
              <div className={`input-wrap ${errors.newPassword ? "field-error" : ""}`}>
                <label>New Password</label>
                <div className="icon-input">
                  <span className="icon lock-icon" aria-hidden="true" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowNewPassword((value) => !value)}
                    aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                  >
                    <i className={`fa ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true" />
                  </button>
                </div>
                {errors.newPassword && (
                  <div className="error-message">{errors.newPassword}</div>
                )}
              </div>

              <div className={`input-wrap ${errors.confirmPassword ? "field-error" : ""}`}>
                <label>Confirm Password</label>
                <div className="icon-input">
                  <span className="icon lock-icon" aria-hidden="true" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    <i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true" />
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="error-message">{errors.confirmPassword}</div>
                )}
              </div>

              <button className="btn-send" type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>

        <div className="reset-right-panel">
          <div className="reset-right-inner">
            <h3>Password Rules</h3>

            <div className="help-card">
              <h4>Use Strong Password</h4>
              <p>
                Choose a password with uppercase, lowercase, numbers, and symbols
                to improve account security.
              </p>
            </div>

            <div className="help-card">
              <h4>Do Not Reuse Passwords</h4>
              <p>
                Avoid reusing old passwords used in other websites or applications.
              </p>
            </div>

            <div className="help-card">
              <h4>Secure Access</h4>
              <p>
                After resetting, login using your new password and keep it private.
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

export default ResetPassword;
