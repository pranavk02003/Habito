import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// ======================
// SIGNUP
// ======================
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (status = pending by default)
    await User.create({
  name,
  email,
  password: hashedPassword,
  role: "user",
   status: "pending",
});

    //  Only message (NO token, NO login)
    res.status(201).json({
      message: "Signup successful. Wait for admin approval.",
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};


// ======================
// LOGIN
// ======================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    //  User not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  Not approved or rejected
    if (user.status !== "approved") {
      return res.status(403).json({
        message:
          user.status === "rejected"
            ? "Your account has been rejected by admin"
            : "Your account is not approved yet",
      });
    }

    //  Wrong password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    //  SUCCESS LOGIN
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic || "",
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};