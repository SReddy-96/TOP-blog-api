const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

// validate updated username
const notEmptyErr = "must not be empty";
const lengthErr = "must be between 2 and 30 characters.";

const validateUsername = [
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
];

// Create(handled in register)

// Read
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        errors: [{ msg: "Invalid or missing user ID" }],
      });
    }
    const user = await db.getUserById(parseInt(id));
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: "no user found" }],
      });
    }
    res.status(200).json({ user });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

// Update
const updateUser = [
  validateUsername,
  async (req, res, next) => {
    try {
      // check body for validation and sanitisation
      const { username } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      // check if param id exists
      const { id } = req.params;
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          errors: [{ msg: "Invalid or missing user ID" }],
        });
      }

      // check user in params
      const user = await db.getUserById(parseInt(id));
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: "no user found" }],
        });
      }
      // get current user
      const currentUser = req.user;

      //check if user is allowed to update
      if (currentUser.id !== parseInt(id)) {
        return res.status(403).json({
          errors: [{ msg: "FORBIDDEN, ONlY USER CAN UPDATE" }],
        });
      }

      // update data
      const updatedUser = await db.updateUser(
        parseInt(id),
        username,
      );
      if (!updatedUser) {
        return res.status(400).json({
          errors: [{ msg: "Error updating user" }],
        });
      }
      res.status(201).json({ updatedUser });
    } catch (err) {
      err.statusCode = err.statusCode || 500;
      next(err);
    }
  },
];
// Delete
const deleteUser = async (req, res, next) => {
  try {
    // check if param id exists
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        errors: [{ msg: "Invalid or missing user ID" }],
      });
    }

    // check user in params
    const user = await db.getUserById(parseInt(id));
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: "no user found" }],
      });
    }
    // get current user
    const currentUser = req.user;

    //check if user is allowed to update
    if (currentUser.id !== parseInt(id)) {
      return res.status(403).json({
        errors: [{ msg: "FORBIDDEN, ONlY USER CAN DELETE" }],
      });
    }

    // delete user
    await db.deleteUser(parseInt(id));

    res.status(204).send();
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
