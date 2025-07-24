import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { updateOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

const createShop = asyncHandler(async (req, res) => {
  const { name, description, address, latitude, longitude } = req.body;

  console.log(req)
  const   shopImage  = req.file; 
console.log(name,description,address,latitude,longitude,shopImage)
  if (
    !name ||
    !description ||
    !address ||
    !latitude ||
    !longitude ||
    !shopImage
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Upload the image to Cloudinary
  const cloudinaryResponse = await uploadOnCloudinary(shopImage.path);
  console.log(cloudinaryResponse)



  if (!cloudinaryResponse) {
    throw new ApiError(500, "Image upload failed");
  }

  // Create the shop in the database
  const shop = await prisma.shops.create({
    data: {
      name,
      description,
      address,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      photo: cloudinaryResponse.secure_url,
      userId: req.user.id,
    },
  });

  res.status(201).json(new ApiResponse(201, "Shop created successfully", shop));
});

const listShops = asyncHandler(async (req, res) => {
  const shops = await prisma.shops.findMany({
    where: {
      userId: req.user.id,
    },
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Shops retrieved successfully", shops));
});

const getShopById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const shop = await prisma.shops.findUnique({
    where: {
      id: id,
      userId: req.user.id,
    },
  });

  if (!shop) {
    throw new ApiError(404, "Shop not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Shop retrieved successfully", shop));
});

const updateShop = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, address, latitude, longitude } = req.body;
  const shopImage  = req.file;

  

  const shop = await prisma.shops.findUnique({
    where: {
      id: id,
      userId: req.user.id,
    },
  });

    if (!shop) {
    throw new ApiError(404, "Shop not found");
  }

  if (shopImage && shopImage.path) {
    // Upload the new image to Cloudinary

    const cloudinaryResponse = await updateOnCloudinary(shopImage.path, shop.photo);

    if (!cloudinaryResponse) {
      throw new ApiError(500, "Image upload failed");
    }

    console.log(cloudinaryResponse)

    // Update the shop's image in the database
    await prisma.shops.update({
      where: {
        id: id,
        userId: req.user.id,
      },
      data: {
        photo: cloudinaryResponse.secure_url,
      },
    });
  }




  const data = {};
if (name) data.name = name;
if (description) data.description = description;
if (address) data.address = address;
if (latitude) data.latitude = parseFloat(latitude);
if (longitude) data.longitude = parseFloat(longitude);

  const updatedShop = await prisma.shops.update({
    where: {
      id: id,
    },
    data: data,
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Shop updated successfully", updatedShop));
});

const deleteShop = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const shop = await prisma.shops.findUnique({
    where: {
      id: id,
      userId: req.user.id,
    },
  });

  if (!shop) {
    throw new ApiError(404, "Shop not found");
  }

  await prisma.shops.delete({
    where: {
      id: id,
    },
  });

  res.status(200).json(new ApiResponse(200, "Shop deleted successfully"));
});

export { createShop, listShops, getShopById, updateShop, deleteShop };
