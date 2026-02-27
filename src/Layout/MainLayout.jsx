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
          {/* Brand Section */}
          <div className="app-brand d-flex align-items-center">
            <img src="/SixStepLogo.jpg" alt="Logo" />
            <NavLink to="/dashboard" className="app-brand-link ms-2">
              <span className="app-brand-text fw-bolder">
                Customer 360
              </span>
            </NavLink>
          </div>

          {/* User Info Section */}
          <div className="sidebar-user-info">
            <div className="text-white fw-semibold">
              Hi, {name || "User"}
            </div>
            {type !== "A" && (
              <div className="text-white small mt-2">
                📍 Ward {ward || "Not Assigned"}
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
                <i className="menu-icon fa fa-th-large"></i>
                <span className="menu-text">Dashboard</span>
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

                {/* <li className="menu-item">
                  <NavLink
                    to="/users-list"
                    className={({ isActive }) =>
                      `menu-link ${isActive ? "active" : ""}`
                    }
                  >
                    <i className="menu-icon fa fa-users"></i>
                    <span className="menu-text">Users</span>
                  </NavLink>
                </li> */}

                <li className="menu-item">
                  <NavLink
                    to="/Account-list"
                    className={({ isActive }) =>
                      `menu-link ${isActive ? "active" : ""}`
                    }
                  >
                    <i className="menu-icon fa fa-list-ul"></i>
                    <span className="menu-text">Accounts</span>
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
              {/* User Dropdown */}
              <div className="dropdown">
                <button
                  className="dropdown-toggle btn btn-link"
                  data-bs-toggle="dropdown"
                  type="button"
                  aria-expanded="false"
                >
                  <img
                    src="/assets/img/User_Logo.png"
                    alt="User Avatar"
                  />
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                  {/* USER INFO HEADER */}
                  <li>
                    <div className="dropdown-item">
                      <div className="d-flex align-items-center">
                        <div className="avatar flex-shrink-0">
                          <i className="fas fa-user-circle"></i>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <span className="fw-semibold d-block lh-sm">
                            {name || "Unknown User"}
                          </span>
                          <small className="text-muted">
                            {displayUserType}
                          </small>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li><hr className="dropdown-divider" /></li>

                  {/* PROFILE */}
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-user"></i>
                      <span className="align-middle">My Profile</span>
                    </a>
                  </li>

                  <li><hr className="dropdown-divider" /></li>

                  {/* LOGOUT */}
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={handleLogout}
                      title="Click to logout"
                    >
                      <i className="fas fa-sign-out-alt"></i>
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
