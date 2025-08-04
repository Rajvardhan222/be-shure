import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  // Allow isLoggedIn route to proceed even without valid token
  if (req.path === '/isLoggedIn' || req.originalUrl.includes('/isLoggedIn')) {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      // No token, but allow the request to proceed for isLoggedIn route
      req.user = null;
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log("Decoded JWT:", decoded);

      const user = await prisma.user.findUnique({
        where: { id: decoded?.id },
      });
      
      if (user) {
        delete user.password; // remove password from user object
        req.user = user;
      } else {
        req.user = null;
      }
      
      return next();
    } catch (error) {
      // Invalid token, but allow the request to proceed for isLoggedIn route
      req.user = null;
      return next();
    }
  }

  // For all other routes, require valid token
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