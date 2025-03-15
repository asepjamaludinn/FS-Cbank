import express from "express";
import {
  register,
  login,
  getCurrentUser,
  updateProfile,
  changePassword,
  updateSettings,
} from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Get current user route (protected)
router.get("/me", authenticate, getCurrentUser);

// Profile routes
router.put("/profile", authenticate, updateProfile);
router.put("/change-password", authenticate, changePassword);
router.put("/settings", authenticate, updateSettings);

export default router;
