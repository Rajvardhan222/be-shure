import prisma from "../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function isPasswordCorrect(password, userPassword) {
  return await bcrypt.compare(password, userPassword);
}

async function generateAccessToken(id, email, username) {
  return jwt.sign(
    {
      id: id,
      email,
      username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
}

async function generateRefreshToken(id) {
  return jwt.sign(
    {
      id: id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
}

export {isPasswordCorrect,generateAccessToken,generateRefreshToken}
