const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const validatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title must be under 100 characters"),
  body("post").trim().notEmpty().withMessage("Post content is required"),
];

const createPost = [
  validatePost,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, post } = req.body;
      const newPost = await db.insertPost(title, post, parseInt(req.user.id));
      if (!newPost) {
        return res.status(400).json({
          errors: [{ msg: "Failed to add new post" }],
        });
      }
      res.status(201).json({ newPost });
    } catch (err) {
      err.statusCode = err.statusCode || 500;
      next(err);
    }
  },
];

// Read
const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        errors: [{ msg: "Invalid or missing post ID" }],
      });
    }
    const post = await db.getPost(parseInt(id));
    if (!post) {
      return res.status(400).json({
        errors: [{ msg: "Failed to get post" }],
      });
    }
    res.status(200).json({ post });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const allPosts = await db.getAllPosts();
    res.status(200).json({ allPosts });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

// update
const updatePost = [
  validatePost,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { id } = req.params;
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          errors: [{ msg: "Invalid or missing post ID" }],
        });
      }
      const { title, post } = req.body;
      const updatedPost = await db.updatePost(
        parseInt(id),
        title,
        post,
        parseInt(req.user.id),
      );
      if (!updatedPost) {
        return res
          .status(404)
          .json({ errors: [{ msg: "Post not found or not authorized" }] });
      }
      res.status(200).json({ updatedPost });
    } catch (err) {
      err.statusCode = err.statusCode || 500;
      next(err);
    }
  },
];

// delete
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        errors: [{ msg: "Invalid or missing post ID" }],
      });
    }
    const deletedPost = await db.deletePost(parseInt(id));
    if (!deletedPost) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Post not found or not authorized" }] });
    }
    res.status(200).json({ deletedPost });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

module.exports = {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
};
