const jwt = require("jsonwebtoken");

const secretKey = "your-secret-key"; // Replace this with your actual secret key
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken; // Store the decoded user information in the request object for use in other middleware or routes
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};
