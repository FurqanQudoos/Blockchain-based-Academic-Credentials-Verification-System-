const express = require("express");
const router = express.Router();

const Blockchain = require("../models/blockchain");

const certiChain = new Blockchain();

/* ========================= ISSUE CREDENTIAL (University) ========================= */
router.post("/issue", async (req, res) => {
  try {
    const { studentId, name, degree, year } = req.body;

    if (!studentId || !name || !degree || !year) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Create credential data
    const credentialData = { studentId, name, degree, year };

    // Add block to blockchain
    const newBlock = certiChain.addBlock(credentialData);

    res.json({
      success: true,
      message: "Credential Issued Successfully",
      block: newBlock,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/* ========================= VIEW CREDENTIAL (Student) → Search directly in blockchain ========================= */
router.get("/student/:id", (req, res) => {
  try {
    const studentId = req.params.id;

    // Search blockchain for matching studentId
    const block = certiChain.chain.find(
      (b) => b.data.studentId === studentId
    );

    if (!block) {
      return res.status(404).json({ message: "Credential not found" });
    }

    res.json({
      success: true,
      student: {
        studentId: block.data.studentId,
        name: block.data.name,
        degree: block.data.degree,
        year: block.data.year,
        certificateHash: block.hash,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/* ======== VERIFY CREDENTIAL (Employer) → Verify directly from blockchain ============ */
router.post("/verify", (req, res) => {
  try {
    const { studentId, certificateHash } = req.body;

    // Find matching block
    const block = certiChain.chain.find(
      (b) => b.data.studentId === studentId
    );

    if (!block) {
      return res.json({ success: false, message: "Credential not found" });
    }

    // Compare hash
    if (block.hash === certificateHash) {
      return res.json({ success: true, message: "Credential Valid ✅" });
    } else {
      return res.json({ success: false, message: "Credential Invalid ❌" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/* ================ GET FULL BLOCKCHAIN (Explorer) =============== */
router.get("/chain", (req, res) => {
  res.json(certiChain.chain);
});


/* ============== GET BLOCKCHAIN STATS ============== */
router.get("/chain/stats", (req, res) => {
  const chain = certiChain.chain;

  res.json({
    totalBlocks: chain.length,
    credentialsIssued: chain.length - 1,
    valid: certiChain.isChainValid(),
  });
});

module.exports = router;
