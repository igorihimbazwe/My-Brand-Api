// routes/comment.js
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

// Add a new comment to a blog
router.post("/:blogId", authMiddleware, commentController.addComment);

// Reply to a comment
router.post(
  "/reply/:commentId",
  authMiddleware,
  commentController.replyToComment
);

// Delete a comment
router.delete("/:commentId", authMiddleware, commentController.deleteComment);

module.exports = router;
