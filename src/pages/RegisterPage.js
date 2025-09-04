// src/pages/RegisterPage.js
import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const history = useHistory();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "technician", // default
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/register", form);
      // res.data should be { user, token }
      login(res.data);
      // redirect based on role
      if (res.data.user.role === "technician") history.push("/upload");
      else history.push("/scans");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          placeholder="Full name"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <label style={{ marginTop: 8, display: "block" }}>
          Role
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={{ display: "block", marginTop: 6 }}
          >
            <option value="technician">Technician</option>
            <option value="dentist">Dentist</option>
          </select>
        </label>

        <button className="btn" type="submit" disabled={loading} style={{ marginTop: 12 }}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <div style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
