const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const User = require("../models/User");
// Add a new comment to a blog
exports.addComment = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;
  const blogId = req.params.blogId;

  try {
    const newComment = new Comment({
      user: userId,
      content,
    });

    await newComment.save();

    const blog = await Blog.findById(blogId);
    blog.comments.push(newComment._id);
    await blog.save();

    // Query the user document and attach it to the comment object
    const user = await User.findById(userId).select("firstName");
    newComment.user = user;

    res.json({ msg: "Comment added successfully", comment: newComment });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Reply to a comment
exports.replyToComment = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;
  const commentId = req.params.commentId;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    const newReply = {
      user: userId,
      content,
    };

    comment.replies.push(newReply);
    await comment.save();

    res.json({ msg: "Reply added successfully", reply: newReply });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  const commentId = req.params.commentId;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    // Check if the user owns the comment
    if (comment.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();

    res.json({ msg: "Comment deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
//fetch all comments
