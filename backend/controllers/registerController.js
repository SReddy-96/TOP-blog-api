const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const generateAccessToken = require("../middleware/generateToken");

const notEmptyErr = "must not be empty";
const lengthErr = "must be between 2 and 30 characters.";

const validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`username ${notEmptyErr}`)
    .isLength({ min: 3, max: 20 })
    .withMessage(`Username ${lengthErr}`)
    .matches(/^[a-zA-Z0-9_.-]+$/) // Recommended: Allow letters, numbers, underscore, dot, hyphen
    .withMessage(
      "Username can only contain letters, numbers, underscores, dots, and hyphens.",
    )
    .custom(async (value) => {
      const user = await db.getUserByUsername(value);
      if (user) {
        throw new Error("Username already in use");
      }
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`password ${notEmptyErr}`)
    .isLength({ min: 8 })
    .withMessage("Password must be over 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    ),
  body("confirm_password")
    .trim()
    .notEmpty()
    .withMessage(`Confirm Password ${notEmptyErr}`)
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        // Changed to check for inequality
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
];
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
      res.status(201).json({ token });
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
