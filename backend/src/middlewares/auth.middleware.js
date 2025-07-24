import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "Access token is required");
  }

   

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    console.log("Decoded JWT:", decoded);

    const user = await prisma.user.findUnique({
      where: { id: decoded?.id },
    });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    delete user.password; // remove password from user object
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
