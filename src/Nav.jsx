import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart, FaUser, FaHome, FaBoxOpen } from "react-icons/fa";

const Nav = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
  }, []);

  const handleProductsClick = () => {
    if (isLoggedIn) {
      navigate("/products");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm py-3 sticky-top"
      style={{
        backgroundColor: "#3F51B5", // Deep Indigo
        boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand d-flex align-items-center gap-2 text-white"
          to="/"
        >
          <FaShoppingCart size={24} />
          <span className="fw-bold fs-4">EntriEcomm</span>
        </Link>

        <button
          className="navbar-toggler text-white"
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
          <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold d-flex align-items-center gap-1"
                to="/"
                style={{ transition: "color 0.2s" }}
              >
                <FaHome /> Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold d-flex align-items-center gap-1"
                to="/login"
                style={{ transition: "color 0.2s" }}
              >
                <FaUser /> {isLoggedIn ? "Account" : "Login"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
