const { Router } = require("express");
const postsRouter = Router();
const {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
} = require("../controllers/postsController");
const adminCheck = require("../middleware/adminCheck");

// create
postsRouter.post("/", adminCheck, createPost);
// Read
postsRouter.get("/:id", getPost);
//read all
postsRouter.get("/", getAllPosts);
// Update
postsRouter.put("/:id", adminCheck, updatePost);
// Delete
postsRouter.delete("/:id", adminCheck, deletePost);

module.exports = postsRouter;
