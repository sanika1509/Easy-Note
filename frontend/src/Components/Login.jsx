import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const inputUser = { email, password };

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        body: JSON.stringify(inputUser),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials for cross-origin requests
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "An error occurred. Please try again.");
      } else {
        localStorage.setItem("token", result.token); // Store token securely
        setError("");
        setEmail("");
        setPassword("");
        navigate("/notes");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="col-md-6  offset-md-3  box">
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <div className="labelStyle">
            <h1>LOGIN</h1>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <center>
            {" "}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </center>
          <br />
          {error && (
            <p className="error-message" style={{ color: "red" }}>
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
