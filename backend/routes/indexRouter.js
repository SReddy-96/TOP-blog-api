const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", console.log("Blog API"));

module.exports = indexRouter;
