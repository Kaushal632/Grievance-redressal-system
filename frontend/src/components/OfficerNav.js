import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./OfficerNav.css";

const OfficerNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="officer-nav">
      <div className="nav-links">
        <NavLink to="/panchayat-officer/New-home" className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>

        <NavLink to="/panchayat-officer/new-complaints" className={({ isActive }) => (isActive ? "active" : "")}>
          New Complaints
        </NavLink>

        <NavLink to="/panchayat-officer/ongoing-complaints" className={({ isActive }) => (isActive ? "active" : "")}>
          Ongoing Complaints
        </NavLink>

        <NavLink to="/panchayat-officer/completed-complaints" className={({ isActive }) => (isActive ? "active" : "")}>
          Completed Complaints
        </NavLink>

        <NavLink to="/panchayat-officer/help" className={({ isActive }) => (isActive ? "active" : "")}>
          Help
        </NavLink>
      </div>

      {/* Logout button on right side */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default OfficerNav;


