const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

// File where blockchain will be stored
const chainFilePath = path.join(__dirname, "../data/blockchain.json");

/* ========================= BLOCK CLASS ========================= */
class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
          this.timestamp +
          JSON.stringify(this.data) +
          this.previousHash
      )
      .digest("hex");
  }
}

/* ========================= BLOCKCHAIN CLASS ========================= */
class Blockchain {
  constructor() {
    this.chain = this.loadChainFromFile();
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /* ===== Load Blockchain From File ===== */
  loadChainFromFile() {
    try {
      if (fs.existsSync(chainFilePath)) {
        const data = fs.readFileSync(chainFilePath, "utf-8");
        const parsed = JSON.parse(data);

        if (parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.log("Blockchain file read error:", err);
    }

    // If file not found or empty → create genesis
    const genesisChain = [this.createGenesisBlock()];
    fs.writeFileSync(chainFilePath, JSON.stringify(genesisChain, null, 2));
    return genesisChain;
  }

  /* ===== Save Blockchain To File ===== */
  saveChainToFile() {
    fs.writeFileSync(chainFilePath, JSON.stringify(this.chain, null, 2));
  }

  /* ===== Add New Block ===== */
  addBlock(data) {
    const newBlock = new Block(
      this.chain.length,
      Date.now(),
      data,
      this.getLatestBlock().hash
    );

    this.chain.push(newBlock);

    // Save after adding block
    this.saveChainToFile();

    return newBlock;
  }

  /* ===== Validate Chain ===== */
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      const checkHash = crypto
        .createHash("sha256")
        .update(
          current.index +
            current.timestamp +
            JSON.stringify(current.data) +
            current.previousHash
        )
        .digest("hex");

      if (current.hash !== checkHash) return false;
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }
}

module.exports = Blockchain;
