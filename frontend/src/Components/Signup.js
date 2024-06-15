import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  // Define validation functions outside of handleSignup
  const validateEmail = (email) => {
    // Simple email regex pattern
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, including a number and an uppercase letter
    const re = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setError(""); // Reset general error state

    // Validation checks
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return; // Stop further execution if email is invalid
    }
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters, include a number and an uppercase letter"
      );
      return; // Stop further execution if password is invalid
    }

    const addUser = { name, email, password };

    try {
      const response = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (!response.ok) {
        console.log(result.error);
        setError(result.error); // Ensure 'error' matches the API's error key
      } else {
        setError("success");
        setName("");
        setEmail("");
        setPassword("");
        navigate("/user/login");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <>
      <div className="col-md-8 offset-md-2 box login-container">
        <form onSubmit={handleSignup}>
          <div className="labelStyle">
            <h1>SIGNUP</h1>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputName1">Full name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
            <br />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
            {emailError && (
              <p className="error-message" style={{ color: "red" }}>
                {emailError}
              </p>
            )}
            <br />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {passwordError && (
              <p className="error-message" style={{ color: "red" }}>
                {passwordError}
              </p>
            )}
            <br />
          </div>

          <center>
            <button type="submit" className="btn btn-primary">
              Signup
            </button>
          </center>
          {error && (
            <p
              className="error-message"
              style={{ color: error === "success" ? "green" : "red" }}
            >
              {error}
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Signup;
