const { Router } = require("express");

const usersRouter = Router();

usersRouter.get("/:id", getUser);

module.exports = usersRouter;
