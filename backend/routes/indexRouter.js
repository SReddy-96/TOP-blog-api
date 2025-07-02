const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.json({ msg: "hello index" });
});

module.exports = indexRouter;
