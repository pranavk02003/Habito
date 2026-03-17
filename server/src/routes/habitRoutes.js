import express from "express";
import { createHabit, getHabits, toggleHabit, deleteHabit } from "../controllers/habitController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createHabit);
router.get("/", protect, getHabits);
router.patch("/:id/toggle", protect, toggleHabit);
router.delete("/:id", protect, deleteHabit);

export default router;