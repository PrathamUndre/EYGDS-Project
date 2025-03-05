

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Disable form while submitting

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", res.status);

      let data;
      try {
        const text = await res.text();
        console.log("Raw response:", text);
        data = text ? JSON.parse(text) : {}; // Prevent JSON parsing error
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        alert("Server error: Invalid response format.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        alert(data.message || "Invalid email or password. Try again.");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        onLogin();
        alert("✅ Login Successful! Redirecting...");
        setTimeout(() => navigate("/home"), 1000); // Delay for better UX
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error! Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row g-3 p-4 bg-light shadow rounded" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-3">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="col-12">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
