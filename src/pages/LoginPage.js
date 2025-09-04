// src/pages/LoginPage.js
import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const history = useHistory();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      login(res.data);
      if (res.data.user.role === "technician") history.push("/upload");
      else history.push("/scans");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.log( err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div style={{ marginTop: 12 }}>
        Don't have an account? <Link to="/register">Register</Link>
      </div>

      <div style={{ marginTop: 12, fontSize: 13 }}>
        <strong>Seed accounts (for quick test):</strong>
        <div>Technician: tech@oralvis.com / password123</div>
        <div>Dentist: dentist@oralvis.com / password123</div>
      </div>
    </div>
  );
};

export default LoginPage;
