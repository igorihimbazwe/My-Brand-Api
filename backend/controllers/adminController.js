// controllers/adminController.js
const User = require("../models/User");
const Blog = require("../models/Blog");

exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.isAdmin) {
      return res
        .status(401)
        .json({ msg: "Access denied. You are not an admin" });
    }

    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.isAdmin) {
      return res
        .status(401)
        .json({ msg: "Access denied. You are not an admin" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "firstName -_id",
        },
      })
      .exec();

    const simplifiedBlogs = blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      author: blog.author,
      description: blog.description,
      image: blog.image,
      comments: blog.comments.map((comment) => ({
        content: comment.content,
        user: comment.user.firstName,
      })),
    }));

    res.json(simplifiedBlogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = exports;
