const { Router } = require("express");
const postsRouter = Router();
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/postsController");
const adminCheck = require("../middleware/adminCheck");

// create
postsRouter.post("/", adminCheck, createPost);
// Read
postsRouter.get("/:id", getPost);
// Update
postsRouter.put("/:id", adminCheck, updatePost);
// Delete
postsRouter.delete("/:id", adminCheck, deletePost);

module.exports = postsRouter;
