// controllers/blogController.js
const Blog = require("../models/Blog");

// Add a new blog
exports.addBlog = async (req, res) => {
  const { title, author, description, image } = req.body;
  const user = req.user.id;

  try {
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

// Update a blog
exports.updateBlog = async (req, res) => {
  const { title, author, description, image } = req.body;

  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    // Check if the user owns the blog
    if (blog.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Not authorized to update this blog" });
    }

    blog.title = title;
    blog.author = author;
    blog.description = description;
    blog.image = image;

    await blog.save();
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
