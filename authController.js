const User = require("../models/User");
const jwt = require("jsonwebtoken");

/* Generate JWT */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

/* =========================
   LOGIN (University / Student) ========================= */

exports.loginUser = async (req, res) => {
  try {
    const { email, password, role, studentId } = req.body;

    // ===== University Login =====
    if (role === "university") {
      const user = await User.findOne({ email, role });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // password check
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }

      return res.json({
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        token: generateToken(user._id),
      });
    }

    // ===== Student Login =====
    if (role === "student") {
      if (!studentId) {
        return res.status(400).json({ message: "Student ID required" });
      }

      return res.json({
        user: {
          studentId: studentId,
          role: "student",
        },
        token: "student-token-demo",
      });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};