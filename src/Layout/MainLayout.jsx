import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/LoginSlice";
import "./MainLayout.css"
import alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = sessionStorage.getItem("LoggedName");
  const type = sessionStorage.getItem("LoggedUserType");
  const ward = sessionStorage.getItem("LoggedWardId");





  useEffect(() => {
    if (window.Helpers?.init) {
      window.Helpers.init();
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  const getDisplayUserType = (type) => {
    debugger
    switch (type) {
      case "A":
        return "Admin";
      case "C":
        return "Customer";
      case "U":
        return "User";
      default:
        return "Unknown";
    }
  };
  const displayUserType = getDisplayUserType(type);


  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">

        {/* Sidebar */}
        <aside
          id="layout-menu"
          className="layout-menu menu-vertical menu bg-menu-theme"
        >
          <div className="app-brand demo d-flex align-items-center px-3">
            <img src="/SixStepLogo.jpg" alt="Logo" width="40" height="40" />
            <NavLink to="/dashboard" className="app-brand-link ms-2">
              <span className="app-brand-text fw-bolder">
                Customer 360
              </span>
            </NavLink>
          </div>

          {/* 👇 MOVE USER INFO BELOW BRAND */}
          <div className="px-3 pb-3">
            <div className="text-white fw-semibold">
              Hi, {name || ""}
            </div>
            {type !== "A" && (
              <div className="text-white small">
                WARD No {ward || "Not Assigned"}
              </div>
            )}
          </div>



          <ul className="menu-inner py-1">

            {/* DASHBOARD */}
            <li className="menu-item">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `menu-link ${isActive ? "active" : ""}`
                }
              >
                <i className="menu-icon bx bx-list-check"></i>
                <div>Dashboard</div>
              </NavLink>
            </li>

            {/* ADMIN MENU */}
            {type === "A" && (
              <>
                <li className="menu-item">
                  <NavLink
                    to="/coplaintsList"
                    className={({ isActive }) =>
                      `menu-link ${isActive ? "active" : ""}`
                    }
                  >
                    <i className="menu-icon bx bx-list-check"></i>
                    <div>Complaints List</div>
                  </NavLink>
                </li>

                <li className="menu-item">
                  <NavLink
                    to="/users-list"
                    className={({ isActive }) =>
                      `menu-link ${isActive ? "active" : ""}`
                    }
                  >
                    <i className="menu-icon bx bx-list-check"></i>
                    <div>Users List</div>
                  </NavLink>
                </li>

                <li className="menu-item">
                  <NavLink
                    to="/Account-list"
                    className={({ isActive }) =>
                      `menu-link ${isActive ? "active" : ""}`
                    }
                  >
                    <i className="menu-icon bx bx-list-check"></i>
                    <div>Account List</div>
                  </NavLink>
                </li>
              </>
            )}

          </ul>
        </aside>


        {/* Main page */}
        <div className="layout-page">

          {/* Navbar */}
          <nav className="layout-navbar navbar navbar-expand-xl navbar-detached bg-navbar-theme">
            <div className="d-flex align-items-center ms-auto me-3">
              <div className="dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  data-bs-toggle="dropdown"
                  type="button"
                >
                  <img
                    src="/assets/img/User_Logo.png"
                    alt="User"
                    className="w-px-40 h-auto rounded-circle"
                  />
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                  {/* USER INFO */}
                  <li>
                    <div className="dropdown-item">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar avatar-online">
                            {/* <img
                              src="/assets/img/User_Logo.png"
                              alt="User"
                              className="w-px-40 h-auto rounded-circle"
                            /> */}
                            <i className="bx bx-user fs-4"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <span className="fw-semibold d-block">
                            {name || "Unknown"}
                          </span>
                          <small className="text-muted">
                            {displayUserType}
                          </small>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li><div className="dropdown-divider"></div></li>

                  {/* PROFILE */}
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="bx bx-user me-2"></i>
                      <span className="align-middle">My Profile</span>
                    </a>
                  </li>

                  {/* SETTINGS */}
                  {/* <li>
                    <a className="dropdown-item" href="#">
                      <i className="bx bx-cog me-2"></i>
                      <span className="align-middle">Settings</span>
                    </a>
                  </li> */}

                  {/* BILLING */}
                  {/* <li>
                    <a className="dropdown-item" href="#">
                      <span className="d-flex align-items-center align-middle">
                        <i className="bx bx-credit-card me-2"></i>
                        <span className="flex-grow-1">Billing</span>
                        <span className="badge badge-center rounded-pill bg-danger w-px-20 h-px-20">
                          4
                        </span>
                      </span>
                    </a>
                  </li> */}

                  <li><div className="dropdown-divider"></div></li>

                  {/* LOGOUT */}
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="bx bx-power-off me-2"></i>
                      <span className="align-middle">Log Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Page content */}
          <div className="content-wrapper p-4">
            <Outlet />
          </div>

        </div>
      </div>
    </div>
  );
};

export default MainLayout;
