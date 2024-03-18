// routes/message.js
const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");

// Send a message
router.post("/", messageController.sendMessage);

// Get all messages (only accessible to admin)
router.get("/", authMiddleware, messageController.getAllMessages);

// Delete a message by ID (only accessible to admin)
router.delete("/:id", authMiddleware, messageController.deleteMessage);

module.exports = router;
