// controllers/blogController.js
const { Request, Response } = require("express");
const Blog = require("../models/Blog");
const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");
const Comment = require("../models/Comment");

// Add a new blog
exports.addBlog = async (req, res) => {
  try {
    let image = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      image = result ? result.secure_url : null;
    }

    const { title, author, description } = req.body;
    const user = req.user.id;

    const newBlog = new Blog({
      title,
      author,
      description,
      image,
      user,
    });

    await newBlog.save();
    res.json({ msg: "Blog added successfully", blog: newBlog });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//update blog
exports.updateBlog = async (req, res) => {
  const { title, author, description, image } = req.body;
  const blogId = req.params.id;

  try {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title,
        author,
        description,
        image,
      },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    // Check if the user owns the blog post
    if (blog.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Not authorized to update this blog" });
    }

    res.json({ msg: "Blog updated successfully", blog });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    // Check if the user owns the blog
    if (blog.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Not authorized to delete this blog" });
    }
    await Blog.deleteOne();
    // await Blog.findById(req.params.id);
    res.json({ msg: "Blog deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Fetch a single blog post by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "firstName -_id",
        },
      })
      .exec();

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller function to fetch all comments for a specific blog
// Get all comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate("user", "firstName").exec();

    const simplifiedComments = comments.map((comment) => ({
      content: comment.content,
      user: comment.user ? comment.user.firstName : "",
    }));

    res.json(simplifiedComments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = exports;
