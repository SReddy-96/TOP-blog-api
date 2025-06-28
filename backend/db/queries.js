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

module.exports = {
  getUserById,
  getUserByUsername,
};
