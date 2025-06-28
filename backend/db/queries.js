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
  });
  return post;
};

module.exports = {
  getUserById,
  getUserByUsername,
  insertUser,
  insertPost,
  getPost,
};
