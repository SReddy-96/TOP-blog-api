const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const { validationResult } = require("express-validator");
const generateAccessToken = require("../middleware/generateToken");
const validateUser = require("../middleware/validateUser");

// Create
const postRegister = [
  validateUser,
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await db.insertUser(username, hashedPassword);
      const token = generateAccessToken(newUser);
      // send token to client
      res.status(201).json({ token: token, role: newUser.role });
    } catch (err) {
      err.statusCode = err.statusCode || 500;
      next(err);
    }
  },
];

// Read is handled by frontend

module.exports = {
  postRegister,
};
