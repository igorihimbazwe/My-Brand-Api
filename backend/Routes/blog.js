// routes/blog.js
const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

// Add a new blog
router.post("/", authMiddleware, blogController.addBlog);

// Update a blog
router.put("/:id", authMiddleware, blogController.updateBlog);

// Delete a blog
router.delete("/:id", authMiddleware, blogController.deleteBlog);

module.exports = router;
