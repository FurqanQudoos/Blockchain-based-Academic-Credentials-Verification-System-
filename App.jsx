import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./screens/HomePage";
import LoginScreen from "./screens/LoginScreen";

import UniversityDashboard from "./screens/UniversityDashboard";
import StudentDashboard from "./screens/StudentDashboard";
import EmployerDashboard from "./screens/EmployerDashboard";
import ExplorerScreen from "./screens/ExplorerScreen";

function App() {
  const [userInfo, setUserInfo] = useState(null);

  const handleLogout = () => {
    setUserInfo(null);
  };

  return (
    <>
      <Header userInfo={userInfo} onLogout={handleLogout} />

      <Routes>

        {/* ===== HOME ===== */}
        <Route path="/" element={<HomePage />} />

        {/* ===== EMPLOYER PORTAL ===== */}
        <Route path="/employer" element={<EmployerDashboard />} />

        {/* ===== LOGIN ===== */}
        <Route
          path="/login"
          element={
            userInfo ? <Navigate to="/" /> : <LoginScreen onLogin={setUserInfo} />
          }
        />

        {/* ===== UNIVERSITY DASHBOARD ===== */}
        <Route
          path="/university"
          element={
            userInfo?.role === "university"
              ? <UniversityDashboard />
              : <Navigate to="/login" />
          }
        />

        {/* ===== STUDENT DASHBOARD ===== */}
        <Route
          path="/student"
          element={
            userInfo?.role === "student"
              ? <StudentDashboard userInfo={userInfo} />
              : <Navigate to="/login" />
          }
        />

        {/* ===== BLOCKCHAIN EXPLORER ===== */}
        <Route
          path="/explorer"
          element={
            userInfo?.role === "university"
              ? <ExplorerScreen />
              : <Navigate to="/login" />
          }
        />

      </Routes>

      <Footer />
    </>
  );
}

export default App;
