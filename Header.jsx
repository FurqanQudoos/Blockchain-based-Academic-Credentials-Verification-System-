import { Link } from "react-router-dom";
import "../App.css";

const Header = ({ userInfo, onLogout }) => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        🎓 CertiChain
      </div>

      {/* Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>

        {userInfo?.role === "university" && (
          <>
            <Link to="/university">University Dashboard</Link>
            <Link to="/explorer">Blockchain Explorer</Link>
          </>
        )}

        {userInfo?.role === "employer" && (
          <>
            <Link to="/employer">Employer Dashboard</Link>
          </>
        )}

        {userInfo?.role === "student" && (
          <Link to="/student">Student Dashboard</Link>
        )}

        {!userInfo ? (
          <Link to="/login" className="login-btn">Login</Link>
        ) : (
          <button onClick={onLogout} className="logout-btn">Logout</button>
        )}
      </div>

    </nav>
  );
};

export default Header;
