// routes/user.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController ");
const authMiddleware = require("../middleware/authMiddleware");

// Update user information
router.put("/update", authMiddleware, userController.update);

module.exports = router;
