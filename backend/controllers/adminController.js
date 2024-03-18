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
    const user = await User.findById(req.user.id);

    if (!user.isAdmin) {
      return res
        .status(401)
        .json({ msg: "Access denied. You are not an admin" });
    }

    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
