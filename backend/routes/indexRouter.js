const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", getIndex);

module.exports = indexRouter;
