const { Router } = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

const usersRouter = Router();

// Get
usersRouter.get("/:id", getUser);

// Post handled in register

// Put
usersRouter.put("/:id", updateUser);

// Delete
usersRouter.delete("/:id", deleteUser);

module.exports = usersRouter;
