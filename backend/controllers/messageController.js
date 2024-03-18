// controllers/messageController.js
const Message = require("../models/Message");

// Send a message
exports.sendMessage = async (req, res) => {
  const { fullName, email, message } = req.body;

  try {
    const newMessage = new Message({
      fullName,
      email,
      message,
    });

    await newMessage.save();
    res.json({ msg: "Message sent successfully", message: newMessage });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get all messages (only accessible to admin)
exports.getAllMessages = async (req, res) => {
  try {
    // Check if the user is an admin
    if (!req.user.isAdmin) {
      return res
        .status(401)
        .json({ msg: "Access denied. You are not an admin" });
    }

    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a message by ID (only accessible to admin)
exports.deleteMessage = async (req, res) => {
  try {
    // Check if the user is an admin
    if (!req.user.isAdmin) {
      return res
        .status(401)
        .json({ msg: "Access denied. You are not an admin" });
    }

    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ msg: "Message not found" });
    }

    await Message.findByIdAndDelete(req.params.id);
    res.json({ msg: "Message deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
