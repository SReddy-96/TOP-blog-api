const passport = require("passport");
const { body, validationResult } = require("express-validator");
const generateAccessToken = require("../middleware/generateToken");

const notEmptyErr = "must not be empty";

const validateUser = [
  body("username").trim().notEmpty().withMessage(`Username ${notEmptyErr}`),
  body("password").trim().notEmpty().withMessage(`Password ${notEmptyErr}`),
];

// post request
const postLogin = [
  validateUser,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  },
  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          errors: [{ msg: info?.message || "Login failed" }],
        });
      }
      const token = generateAccessToken(user);
      res.json({ token });
    })(req, res, next);
  },
];

module.exports = {
  postLogin,
};
