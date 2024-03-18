const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers["authorization"];

  // Check if there is an Authorization header
  if (!authHeader) {
    return res.status(401).json({ msg: "No Authorization header provided" });
  }

  // Check if the Authorization header has Bearer token
  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ msg: "Invalid Authorization header format" });
  }

  const token = tokenParts[1];

  // Verify token
  try {
    const decoded = jwt.verify(token, "secret");

    req.user = decoded.user; // Attach decoded user to the request object
    next(); // Move to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
