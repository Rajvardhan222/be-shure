import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

import {
  createShop,
  listShops,
  getShopById,
  updateShop,
  deleteShop,
} from "../controllers/shops.controller.js";
const router = Router();

router.route("/new").post(verifyJWT, upload.single("shopImage"), createShop);

router.route("/list-shops").get(verifyJWT, listShops);

router.route("/:id").get(verifyJWT, getShopById);

router
  .route("/update/:id")
  .put(verifyJWT, upload.single("shopImage"), updateShop);

router.route("/delete/:id").delete(verifyJWT, deleteShop);

export default router;
