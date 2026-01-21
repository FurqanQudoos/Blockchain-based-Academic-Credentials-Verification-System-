import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const StudentDashboard = ({ userInfo }) => {
  const [studentData, setStudentData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCredential();
  }, []);

  const fetchCredential = async () => {
    try {
      const studentId = userInfo.studentId;

      const res = await axios.get(
        `http://localhost:5000/api/blockchain/student/${studentId}`
      );

      setStudentData(res.data.student);
    } catch (error) {
      setMessage("Credential not found");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="icon-circle">👤</div>
        <h2>Student Portal</h2>
        <p>Your academic credential stored on blockchain</p>
      </div>

      {message && <p style={{ color: "red" }}>{message}</p>}

      {studentData && (
        <div className="card result-card">
          <h3>🎓 Academic Credential</h3>
          <p><strong>Student ID:</strong> {studentData.studentId}</p>
          <p><strong>Name:</strong> {studentData.name}</p>
          <p><strong>Degree:</strong> {studentData.degree}</p>
          <p><strong>Graduation Year:</strong> {studentData.year}</p>
          <p><strong>Certificate Hash:</strong></p>
          <small>{studentData.certificateHash}</small>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
