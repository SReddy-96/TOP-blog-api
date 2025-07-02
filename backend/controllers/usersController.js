const db = require("../db/queries");
const validateUser = require("../middleware/validateUser");
const bcrypt = require("bcryptjs");

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
  validateUser,
  async (req, res, next) => {
    try {
      // check body for validation and sanitisation
      const { username, password } = req.body;
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
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await db.updateUser(
        parseInt(id),
        username,
        hashedPassword,
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
