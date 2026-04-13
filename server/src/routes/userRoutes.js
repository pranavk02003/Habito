import express from "express";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();


router.put("/profile-pic", protect, async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const user = await User.findById(req.user._id);

    user.profilePic = imageUrl;

    await user.save();

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;