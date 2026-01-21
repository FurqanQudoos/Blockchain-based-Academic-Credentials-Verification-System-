import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const ExplorerScreen = () => {
  const [chain, setChain] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadBlockchain();
  }, []);

  const loadBlockchain = async () => {
    const chainRes = await axios.get(
      "http://localhost:5000/api/blockchain/chain"
    );
    const statsRes = await axios.get(
      "http://localhost:5000/api/blockchain/chain/stats"
    );

    setChain(chainRes.data);
    setStats(statsRes.data);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="icon-circle">🔗</div>
        <h2>Blockchain Explorer</h2>
        <p>Explore the immutable ledger of academic credentials</p>
      </div>

      {/* ===== STATS CARDS ===== */}
      <div className="stats-cards">
        <div className="stat-card">
          <h3>{stats.totalBlocks}</h3>
          <p>Total Blocks</p>
        </div>
        <div className="stat-card">
          <h3>{stats.credentialsIssued}</h3>
          <p>Credentials Issued</p>
        </div>
        <div className="stat-card">
          <h3>Active</h3>
          <p>Chain Status</p>
        </div>
        <div className="stat-card">
          <h3>{stats.valid ? "Valid ✓" : "Invalid ❌"}</h3>
          <p>Integrity</p>
        </div>
      </div>

      {/* ===== BLOCK LIST ===== */}
      {chain.map((block, index) => (
        <div key={index} className="block-card-ui">
          <div className="block-index">#{block.index}</div>

          <div className="block-content">
            <div className="block-header">
              <h4>
                {block.index === 0 ? "Genesis Block" : `Block ${block.index}`}
              </h4>
              <span>{new Date(block.timestamp).toLocaleString()}</span>
            </div>

            <div className="block-data">
              {block.index === 0
                ? "Genesis Block"
                : `Credential: ${block.data.studentId} - ${block.data.name} - ${block.data.degree}`}
            </div>

            <div className="hash-grid">
              <div>
                <label>Block Hash</label>
                <input value={block.hash} readOnly />
              </div>
              <div>
                <label>Previous Hash</label>
                <input value={block.previousHash} readOnly />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* ===== CHAIN CONNECTION VISUAL ===== */}
      <div className="chain-visual">
        {chain.map((block, i) => (
          <span key={i} className="chain-node">
            {block.index}
            {i !== chain.length - 1 && <span className="chain-line"></span>}
          </span>
        ))}
        <p>All blocks are cryptographically linked and verified</p>
      </div>
    </div>
  );
};

export default ExplorerScreen;
