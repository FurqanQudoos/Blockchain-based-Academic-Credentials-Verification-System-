require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const blockchainRoutes = require("./routes/blockchainRoutes");

const app = express();

/* =========== Middleware ============== */

app.use(cors());

app.use(express.json());

/* ========== Database Connection ========= */

connectDB();

/* =========== Routes ============= */

// Login (University + Student)
app.use("/api/auth", authRoutes);

// Blockchain + Credentials APIs
app.use("/api/blockchain", blockchainRoutes);

app.get("/", (req, res) => {
  res.json({ message: "CertiChain Backend Running Successfully" });
});

/* ==== Server Start ====== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
