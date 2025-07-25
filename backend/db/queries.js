const { post } = require("../routes/indexRouter");
const prisma = require("./prismaClient");

const getUserById = async (id) => {
  const data = await prisma.users.findUnique({
    where: {
      id,
    },
    include: {
      comments: true,
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
    data: {
      title,
      post,
      userId,
    },
  });
  return data;
};

const getPost = async (id) => {
  const post = await prisma.posts.findFirst({
    where: {
      id,
    },
    include: {
      comments: {
        include: {
          user: {
            select: { id: true, username: true },
          },
        },
      },
    },
  });
  return post;
};

const getAllPosts = async () => {
  const data = await prisma.posts.findMany({
    include: { comments: true },
  });
  return data;
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

const deletePost = async (id) => {
  const data = await prisma.posts.delete({
    where: {
      id,
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

const updateUser = async (id, username) => {
  const data = await prisma.users.update({
    where: {
      id,
    },
    data: {
      username,
    },
  });
  return data;
};

const deleteUser = async (id) => {
  const data = await prisma.users.delete({
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
  getAllPosts,
  updatePost,
  deletePost,
  getCommentById,
  insertComment,
  updateComment,
  deleteComment,
  updateUser,
  deleteUser,
};
