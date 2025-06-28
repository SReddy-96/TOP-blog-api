const { Router } = require("express");
const { postLogin } = require("../controllers/loginController");

const loginRouter = Router();

loginRouter.post("/", postLogin);

module.exports = loginRouter;
