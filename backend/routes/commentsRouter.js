const { Router } = require("express");
const commentsRouter = Router();
const {
  createComment,
  getComment,
  updateComment,
  deleteComment,
} = require("../controllers/postsController");

// create
commentsRouter.post("/", createComment);

// Read Not Needed to see one

// Update
commentsRouter.put("/:commentId", updateComment);

// Delete
commentsRouter.delete("/:commentId", deleteComment);

module.exports = commentsRouter;
