import "../App.css";
import { useState } from "react";
import axios from "axios";

const EmployerDashboard = () => {
  const [data, setData] = useState({ studentId: "", hash: "" });
  const [result, setResult] = useState("");

  const verifyCredential = async () => {
    try {
      setResult("");

      if (!data.studentId || !data.hash) {
        return setResult("Please fill all fields");
      }

      const res = await axios.post(
        "http://localhost:5000/api/blockchain/verify",
        {
          studentId: data.studentId,
          certificateHash: data.hash
        }
      );

      setResult(res.data.message);

    } catch (error) {
      setResult("Verification failed");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="icon-circle">🏢</div>
        <h2>Employer Verification Portal</h2>
        <p>Verify academic credentials using blockchain technology</p>
      </div>

      <div className="card form-card">
        <label>Student ID</label>
        <input
          placeholder="Enter candidate's Student ID"
          value={data.studentId}
          onChange={(e)=>setData({...data,studentId:e.target.value})}
        />

        <label>Certificate Hash</label>
        <input
          placeholder="Enter certificate hash (copy from student portal)"
          value={data.hash}
          onChange={(e)=>setData({...data,hash:e.target.value})}
        />

        <button onClick={verifyCredential} className="primary-btn">
          🔍 Verify Credential
        </button>

        {/* Result Message */}
        {result && (
          <p style={{ marginTop: "10px", fontWeight: "600" }}>
            {result}
          </p>
        )}
      </div>

      <div className="demo-box">
        Demo Credentials: <br/>
        BCS22**** <br/>
        (Hash will appear after issuing credential)
      </div>
    </div>
  );
};

export default EmployerDashboard;
