const { Router } = require("express");
const { postRegister } = require("../controllers/registerController");

const registerRouter = Router();

registerRouter.post("/", postRegister);

module.exports = registerRouter;
