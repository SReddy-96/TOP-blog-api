const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateComment = [
  body("comment").trim().notEmpty().withMessage("Comment cannot be empty"),
];

// Create
const createComment = [
  validateComment,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { postId } = req.params;
      if (!postId || isNaN(parseInt(postId))) {
        return res.status(400).json({
          errors: [{ msg: "Invalid or missing post ID" }],
        });
      }
      const { comment } = req.body;
      const newComment = await db.insertComment(
        comment,
        parseInt(postId),
        parseInt(req.user.id),
      );
      if (!newComment) {
        return res.status(400).json({
          errors: [{ msg: "Failed to add new Comment" }],
        });
      }
      res.status(201).json({ newComment });
    } catch (err) {
      err.statusCode = err.statusCode || 500;
      next(err);
    }
  },
];

// Update
const updateComment = [
  validateComment,
  async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;
      if (
        !postId ||
        isNaN(parseInt(postId)) ||
        !commentId ||
        isNaN(parseInt(commentId))
      ) {
        return res.status(400).json({
          errors: [{ msg: "Invalid or missing post ID or comment ID" }],
        });
      }

      // Get the comment first
      const commentRecord = await db.getCommentById(parseInt(commentId));
      if (!commentRecord) {
        return res.status(404).json({ errors: [{ msg: "Comment not found" }] });
      }

      const { comment } = req.body;
      if (!comment) {
        return res.status(400).json({
          errors: [{ msg: "Comment content is required" }],
        });
      }

      const updatedComment = await db.updateComment(
        parseInt(commentId),
        parseInt(postId),
        parseInt(req.user.id),
        comment,
      );
      if (!updatedComment) {
        return res.status(400).json({
          errors: [{ msg: "Failed to update Comment for post" }],
        });
      }
      res.status(200).json({ updatedComment });
    } catch (err) {
      err.statusCode = err.statusCode || 500;
      next(err);
    }
  },
];

// Delete
const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await db.getCommentById(parseInt(commentId));
    if (!comment) {
      return res.status(404).json({ errors: [{ msg: "Comment not found" }] });
    }

    // Check if user is author or admin
    if (comment.userId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ errors: [{ msg: "Forbidden" }] });
    }

    await db.deleteComment(parseInt(commentId));
    res.status(204).send();
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
