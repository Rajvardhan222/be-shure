import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getDistance } from "../utils/distance.js";

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, category, available, shopId } = req.body;

  if (!name || !price || !category || !available || !shopId) {
    throw new ApiError(400, "All fields are required");
  }

  // add the product to the database
  const product = await prisma.product.create({
    data: {
      name,
      price : parseInt(price),
      category,
      available : available === "true",
      shopId: shopId,
    },
  });

  if (!product) {
    throw new ApiError(500, "Failed to create product");
  }

  res
    .status(201)
    .json(new ApiResponse(201, "Product created successfully", product));
});

const listProducts = asyncHandler(async (req, res) => {
  const { shopId } = req.params; 
  console.log(req.query)

  if (!shopId) {
    throw new ApiError(400, "Shop ID is required");
  }

  const products = await prisma.product.findMany({
    where: {
      shopId: shopId,
    },
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Products retrieved successfully", products));
});

const updateProductAvailability = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { available } = req.body;

  if (available === undefined) {
    throw new ApiError(400, "Availability status is required");
  }

  const product = await prisma.products.update({
    where: { id: id },
    data: { available: available },
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Product availability updated successfully", product)
    );
});

// methods used by the user without login for product search

const getNearbyProducts = asyncHandler(async (req, res) => {
  const { latitude, longitude, productName } = req.query;

  if (!latitude || !longitude) {
    throw new ApiError(400, "Latitude and longitude are required");
  }
  if (!productName) {
    throw new ApiError(400, "Product name is required");
  }

  // filter those shops which contain this product

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: productName,
        
        
        mode: "insensitive",
      },
      available:true,
      shop: {
        is: {
          latitude: {
            gte: parseFloat(latitude) - 0.1,
            lte: parseFloat(latitude) + 0.1,
          },
          longitude: {
            gte: parseFloat(longitude) - 0.1,
            lte: parseFloat(longitude) + 0.1,
          },
        },
      },
    },
    include: {
      shop: true,
    },
  });

  

  products.sort((a, b) => {
    const distA = getDistance(
      latitude,
      longitude,
      a.shop.latitude,
      a.shop.longitude
    );
    const distB = getDistance(
      latitude,
      longitude,
      b.shop.latitude,
      b.shop.longitude
    );
    return distA - distB;
  });


  res
    .status(200)
    .json(
      new ApiResponse(200,  products,"Nearby products retrieved successfully")
    );

});


export {
  createProduct,
  listProducts,
  updateProductAvailability,
  getNearbyProducts
}
