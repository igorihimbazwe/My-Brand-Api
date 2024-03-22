const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const adminController = require("../controllers/adminController");

// Add a new blog
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  blogController.addBlog
);

// Update a blog
router.put("/:id", authMiddleware, blogController.updateBlog);

// Delete a blog
router.delete("/:id", authMiddleware, blogController.deleteBlog);

// Fetch a single blog post by ID
router.get("/:id", authMiddleware, blogController.getBlogById);

// Fetch all blog posts
router.get("/", adminController.getAllBlogs);

// Define route to fetch all comments for a specific blog
router.get("/:blogId/comments", blogController.getAllComments);

module.exports = router;
