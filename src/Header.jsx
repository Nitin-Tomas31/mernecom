import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowRight } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header
      className="d-flex align-items-center justify-content-center text-center position-relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(63,81,181,0.8), rgba(156,39,176,0.8)), url('https://images.pexels.com/photos/5632387/pexels-photo-5632387.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "92vh",
        width: "100%",
        color: "#fff",
      }}
    >
      {/* Decorative Circles */}
      <div
        className="position-absolute rounded-circle"
        style={{
          top: "-100px",
          right: "-100px",
          width: "250px",
          height: "250px",
          background: "rgba(255,255,255,0.1)",
          animation: "spin 20s linear infinite",
        }}
      ></div>
      <div
        className="position-absolute rounded-circle"
        style={{
          bottom: "-80px",
          left: "-80px",
          width: "200px",
          height: "200px",
          background: "rgba(255,255,255,0.1)",
          animation: "spinReverse 25s linear infinite",
        }}
      ></div>

      <div className="container">
        <div className="bg-dark bg-opacity-50 p-5 rounded-4 shadow-lg animate-fadeIn d-flex flex-column align-items-center">
          <h1
            className="fw-bold mb-4"
            style={{ fontSize: "3.5rem", animation: "fadeUp 1s ease-out" }}
          >
            Explore Products Globally with Ease
          </h1>
          <p
            className="lead mb-4"
            style={{ fontSize: "1.5rem", animation: "fadeUp 1.5s ease-out" }}
          >
            Discover amazing deals, delivered right to your doorstep.
          </p>
          <div className="d-flex justify-content-center">
            <button
              onClick={() => navigate("/login")}
              className="btn btn-lg fw-bold d-flex align-items-center gap-2 px-4 rounded-pill shadow animate-glow"
              style={{
                backgroundColor: "#FFC107",
                color: "#3F3F3F",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              LET'S GO! <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-glow {
          box-shadow: 0 0 20px rgba(255,193,7,0.6);
        }
      `}</style>
    </header>
  );
};

export default Header;
