import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import Logout from "./Logout";
import "./Header.css"; // Import custom CSS file

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Token exists, user is logged in
      setIsLoggedIn(true);
    } else {
      // Token does not exist, user is not logged in
      setIsLoggedIn(false);
    }
  }, [location]); // Listen to route changes

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <img src="/notes.png" alt="logo" className="navbar-brand logo-img" />
        <span className="navbar-brand">SP Keep</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink to="/notes" className="nav-link">
                    All Notes
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/notes/add" className="nav-link">
                    Add Note
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Logout />
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/user/signup" className="nav-link">
                    Signup
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/user/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
