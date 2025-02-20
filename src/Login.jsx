import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "test11@gmail.com" && password === "pass123") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/products");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/7352791/pexels-photo-7352791.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "92vh",
      }}
    >
      <div
        className="card p-5 shadow-lg border-0"
        style={{
          width: "500px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "25px",
        }}
      >
        <h2
          className="text-center mb-4 fw-bold text-primary"
          style={{ fontSize: "2.5rem" }}
        >
          <FaSignInAlt className="me-2" /> Welcome!
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="form-label fw-semibold"
              style={{ fontSize: "1.2rem" }}
            >
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-pill px-4 py-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ fontSize: "1rem" }}
            />
          </div>

          <div className="mb-4">
            <label
              className="form-label fw-semibold"
              style={{ fontSize: "1.2rem" }}
            >
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-pill px-4 py-3"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ fontSize: "1rem" }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-warning w-100 rounded-pill py-3 fw-bold shadow-sm"
            style={{ fontSize: "1.2rem" }}
          >
            Login Now
          </button>
        </form>

        <p className="text-center mt-4 text-muted" style={{ fontSize: "1rem" }}>
          Don't have an account?{" "}
          <span
            className="text-primary fw-semibold"
            style={{ cursor: "pointer" }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
