const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerDocument = require("../swagger.json");
const swaggerUi = require("swagger-ui-express");
const { errorHandler } = require("./middleware/errorMiddleware");
const authRoutes = require("./Routes/auth");
const userRoutes = require("./Routes/user");
const adminRoutes = require("./Routes/admin");
const blogRoutes = require("./Routes/blog");
const messageRoutes = require("./Routes/message");
const commentRoutes = require("./Routes/comment");

dotenv.config();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

const app = express();

app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/comment", commentRoutes);

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected".cyan))
  .catch((err) =>
    console.error(`MongoDB connection error: ${err.message}`.red)
  );

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server starting on port ${port}`));

module.exports = app;
