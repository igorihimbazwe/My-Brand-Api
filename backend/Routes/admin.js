// routes/admin.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

// Get all users (only accessible to admin)
router.get("/blogs", authMiddleware, adminController.getAllBlogs);
router.get("/users", authMiddleware, adminController.getAllUsers);

// Delete a user by ID (only accessible to admin)
router.delete("/users/:id", authMiddleware, adminController.deleteUser);

module.exports = router;
