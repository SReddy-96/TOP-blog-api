const { Router } = require("express");
const commentsRouter = Router({ mergeParams: true });
const {
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentsController");

// create
commentsRouter.post("/", createComment);

// Read Not Needed to see one

// Update
commentsRouter.put("/:commentId", updateComment);

// Delete
commentsRouter.delete("/:commentId", deleteComment);

module.exports = commentsRouter;
