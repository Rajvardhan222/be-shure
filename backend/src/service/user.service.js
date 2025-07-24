import prisma from "../db/index.js";

export const getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};