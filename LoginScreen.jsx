import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const LoginScreen = ({ onLogin }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    studentId: "",
    role: "university",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      setError("");
      let payload = { role: form.role };

      // ===== University Login =====
      if (form.role === "university") {
        if (!form.email || !form.password) {
          return setError("Please enter email and password");
        }
        payload.email = form.email;
        payload.password = form.password;
      }

      // ===== Student Login =====
      if (form.role === "student") {
        if (!form.studentId) {
          return setError("Please enter Student ID");
        }
        payload.studentId = form.studentId;
      }

      // Call backend API
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        payload
      );

      // Save login in app state
      onLogin(res.data.user);

      // Redirect
      if (res.data.user.role === "university") navigate("/university");
      if (res.data.user.role === "student") navigate("/student");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login to CertiChain</h2>
        <p>Select your role to continue</p>

        {/* Role Selection */}
        <label>Login as</label>
        <select
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="university">University</option>
          <option value="student">Student</option>
        </select>

        {/* University Fields */}
        {form.role === "university" && (
          <>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </>
        )}

        {/* Student Field */}
        {form.role === "student" && (
          <>
            <label>Student ID</label>
            <input
              type="text"
              placeholder="Enter Student ID"
              onChange={(e) =>
                setForm({ ...form, studentId: e.target.value })
              }
            />
          </>
        )}

        {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}

        <button onClick={submitHandler} className="primary-btn">
          Login
        </button>

        <div className="login-note">
          University Login → uni@certichain.com / 123 <br />
          Student Login → BCS22****
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
