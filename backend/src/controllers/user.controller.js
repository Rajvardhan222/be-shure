import prisma from "../db/index.js";
import {
  generateAccessToken,
  generateRefreshToken,
  isPasswordCorrect,
} from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getUserById } from "../service/user.service.js";

import bcrypt from "bcrypt";

const generateAccessAndRefereshToken = async (userId) => {
  try {
    const user = await getUserById(userId);
    const accessToken = await generateAccessToken(user.id);
    const refreshToken = await generateRefreshToken(user.id);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating referesh tokens and access tokens",
      error.message
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, phone, password } = req.body;

  // validate input from frontend

  if (!fullname || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // check if user already exists

  const existingUser = await prisma.user.findUnique({
    where: {
      name: fullname,
    },
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists with this username");
  }

  // hash password

  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await prisma.user.create({
    data: {
      name: fullname,

      password: hashedPassword,
      refreshToken: "",
    },
  });

  // if user creation fails
  if (!user) {
    throw new ApiError(500, "User creation failed");
  }

  // remove password from user object before sending response
  delete user.password;

  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", user));
});

const userLoggedIn = asyncHandler(async (req, res) => {
  // Check if user exists in the request object (set by JWT middleware)
  console.log("This is how user looks lilkel from tthe here",req.user)
  if (!req.user) {
    // User is not logged in
    return res
      .status(200)
      .json(new ApiResponse(200, { isLoggedIn: false }, "User is not logged in"));
  }

  // User is logged in
  return res
    .status(200)
    .json(new ApiResponse(200, { isLoggedIn: true, user: req.user }, "User is logged in"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  // validate input from frontend
  if (!name || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // find user by email
  const user = await prisma.user.findUnique({
    where: {
      name: name,
    },
  });

  // if user not found
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // check password
  const isPasswordValid = await isPasswordCorrect(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  // generate tokens

  const { accessToken, refreshToken } = await generateAccessAndRefereshToken(
    user.id
  );

  delete user.password; // remove password from user object

  const option = {
    httpOnly: true,
    secure: true, // set secure flag in production
    sameSite: "None", // set sameSite attribute
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken,option)
    .cookie("refreshToken", refreshToken,option)
    .json(
      new ApiResponse(
        200,
        {
          user: user,
          accessToken,
          refreshToken,
        },
        "Login successful"
      )
    );
});

export { registerUser, loginUser, generateAccessAndRefereshToken ,userLoggedIn};
