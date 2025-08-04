import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createProduct, updateProductAvailability,listProducts,getNearbyProducts  } from "../controllers/product.controller.js";
const router = Router();


router.route("/new").post(verifyJWT,createProduct)

router.route("/list-products/:shopId").get(verifyJWT, listProducts);

router.route("/update/:id").put(verifyJWT, updateProductAvailability);

router.route("/search").get(getNearbyProducts);

export default router;