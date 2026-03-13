import React from "react";
import { NavLink } from "react-router-dom";
import "./CitizenNav.css";

const CitizenNav = () => {
  return (
    <nav className="citizen-nav">
      <NavLink to="/citizen/home" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>

      <NavLink to="/citizen/ongoing" className={({ isActive }) => (isActive ? "active" : "")}>
        Ongoing Grievances
      </NavLink>

      <NavLink to="/citizen/completed" className={({ isActive }) => (isActive ? "active" : "")}>
        Completed Grievances
      </NavLink>

      <NavLink to="/citizen/file-grievance" className={({ isActive }) => (isActive ? "active" : "")}>
        File a New Grievance
      </NavLink>

      <NavLink to="/citizen/help" className={({ isActive }) => (isActive ? "active" : "")}>
        Help
      </NavLink>

      {/* ✅ Logout Button */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          window.location.href = "/";
        }}
        style={{
          marginLeft: "20px",
          backgroundColor: "#ff4d4f",
          color: "white",
          border: "none",
          padding: "6px 12px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default CitizenNav;

