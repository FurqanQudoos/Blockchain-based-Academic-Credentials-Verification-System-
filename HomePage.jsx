import "../App.css";

const HomePage = () => {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <div className="hero-section">
        <div className="hero-content">
          <span className="badge">Blockchain Powered Security</span>
          <h1>
            Academic Credential <br /> Verification System
          </h1>
          <p>
            A secure, transparent, and tamper-proof solution for issuing,
            storing, and verifying academic credentials using blockchain technology.
          </p>

          <div className="hero-buttons">
            <a href="/login" className="btn-primary">Issue Credentials</a>
            <a href="/employer" className="btn-secondary">Verify Now</a>
          </div>
        </div>
      </div>

      {/* ===== HOW IT WORKS ===== */}
      <div className="section">
        <h2>How It Works</h2>
        <p>
          Our platform connects universities, students, and employers through a
          secure blockchain network.
        </p>

        <div className="card-grid">
          <div className="info-card">
            <h3>University Dashboard</h3>
            <p>Issue and manage academic credentials securely on blockchain.</p>
          </div>

          <div className="info-card">
            <h3>Student Portal</h3>
            <p>Access and share verified academic credentials anytime.</p>
          </div>

          <div className="info-card">
            <h3>Employer Portal</h3>
            <p>Instantly verify candidate credentials with cryptographic proof.</p>
          </div>

          <div className="info-card">
            <h3>Blockchain Explorer</h3>
            <p>Explore transparent and immutable credential ledger.</p>
          </div>
        </div>
      </div>

      {/* ===== STATS ===== */}
      <div className="stats-section">
        <div>
          <h2>100%</h2>
          <p>Tamper Proof</p>
        </div>
        <div>
          <h2>Instant</h2>
          <p>Verification</p>
        </div>
        <div>
          <h2>24/7</h2>
          <p>Availability</p>
        </div>
        <div>
          <h2>Secure</h2>
          <p>Encryption</p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
