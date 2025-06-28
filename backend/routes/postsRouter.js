const { Router } = require("express");
const postsRouter = Router();
const { createPost, getPost } = require("../controllers/postsController");
const adminCheck = require("../middleware/adminCheck");

postsRouter.post("/create", adminCheck, createPost);
postsRouter.get("/:id", getPost);

module.exports = postsRouter;
