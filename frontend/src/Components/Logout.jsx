import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/logout", {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        console.error("Logout failed");
        return;
      }

      // Clear local storage or other client-side storage
      localStorage.removeItem("token");

      // Redirect to login page or home
      navigate("/user/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default LogoutButton;
