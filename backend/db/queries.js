const { post } = require("../routes/indexRouter");
const prisma = require("./prismaClient");

const getUserById = async (id) => {
  const data = await prisma.users.findUnique({
    where: {
      id,
    },
  });
  return data;
};

const getUserByUsername = async (username) => {
  const data = await prisma.users.findUnique({
    where: {
      username,
    },
  });
  return data;
};

const insertUser = async (username, password) => {
  const data = await prisma.users.create({
    data: {
      username,
      password,
    },
  });
  return data;
};

const insertPost = async (title, post, userId) => {
  const data = await prisma.posts.create({
    where: {
      userId,
    },
    data: {
      title,
      post,
      userId,
    },
  });
  return data;
};

const getPost = async (id, userId) => {
  const post = await prisma.posts.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      comments: true,
    },
  });
  return post;
};

const updatePost = async (id, title, post, userId) => {
  const data = await prisma.posts.update({
    where: {
      id,
      userId,
    },
    data: {
      title,
      post,
    },
  });
  return data;
};

const getCommentById = async (id) => {
  const data = await prisma.comments.findFirst({
    where: {
      id,
    },
  });
  return data;
};

const insertComment = async (comment, postId, userId) => {
  const data = await prisma.comments.create({
    data: {
      comment,
      postId,
      userId,
    },
  });
  return data;
};

const updateComment = async (id, postId, userId, comment) => {
  const data = await prisma.comments.update({
    where: {
      id,
      postId,
      userId,
    },
    data: {
      comment,
    },
  });
  return data;
};

const deleteComment = async (id) => {
  const data = await prisma.comments.delete({
    where: {
      id,
    },
  });
  return data;
};

module.exports = {
  getUserById,
  getUserByUsername,
  insertUser,
  insertPost,
  getPost,
  updatePost,
  getCommentById,
  insertComment,
  updateComment,
  deleteComment,
};
