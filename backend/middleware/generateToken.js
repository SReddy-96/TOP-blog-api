const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  // Only include safe fields in the payload
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" },
  );
};

module.exports = generateAccessToken;
