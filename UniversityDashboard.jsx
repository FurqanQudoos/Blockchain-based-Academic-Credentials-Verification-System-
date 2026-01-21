import "../App.css";
import { useState } from "react";
import axios from "axios";

const UniversityDashboard = () => {
  const [form, setForm] = useState({
    studentId: "",
    name: "",
    degree: "",
    year: ""
  });

  const [message, setMessage] = useState("");

  const issueCredential = async () => {
    try {
      setMessage("");

      if (!form.studentId || !form.name || !form.degree || !form.year) {
        return setMessage("Please fill all fields");
      }

      // Call backend API
      const res = await axios.post(
        "http://localhost:5000/api/blockchain/issue",
        form
      );

      setMessage(res.data.message);

      // Clear form
      setForm({
        studentId: "",
        name: "",
        degree: "",
        year: ""
      });

    } catch (error) {
      setMessage(error.response?.data?.message || "Error issuing credential");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="icon-circle">🎓</div>
        <h2>University Dashboard</h2>
        <p>Issue new academic credentials to the blockchain</p>
      </div>

      <div className="card form-card">
        <label>Student ID</label>
        <input
          value={form.studentId}
          placeholder="Enter student ID (e.g., STU-2024-001)"
          onChange={(e)=>setForm({...form,studentId:e.target.value})}
        />

        <label>Student Name</label>
        <input
          value={form.name}
          placeholder="Enter full name"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <label>Degree Program</label>
        <select
          value={form.degree}
          onChange={(e)=>setForm({...form,degree:e.target.value})}
        >
          <option value="">Select degree program</option>
          <option>BS Computer Science</option>
          <option>BBA</option>
          <option>B.Ed</option>
          <option>MBA</option>
        </select>

        <label>Graduation Year</label>
        <select
          value={form.year}
          onChange={(e)=>setForm({...form,year:e.target.value})}
        >
          <option value="">Select year</option>
          <option>2022</option>
          <option>2023</option>
          <option>2024</option>
          <option>2025</option>
        </select>

        <button onClick={issueCredential} className="primary-btn">
          + Issue Credential
        </button>

        {/* Message */}
        {message && (
          <p style={{ marginTop: "10px", color: "green", fontWeight: "500" }}>
            {message}
          </p>
        )}
      </div>

      <div className="success-box">
        Secure Blockchain Storage <br />
        All credentials are cryptographically signed and stored on immutable blockchain ledger.
      </div>
    </div>
  );
};

export default UniversityDashboard;
