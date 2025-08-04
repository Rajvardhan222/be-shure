import { Router } from "express";
import { loginUser, registerUser, userLoggedIn } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router()

router.route("/new-user").post(registerUser);
router.route("/login").post(loginUser);
router.route('/isLoggedIn').get(verifyJWT,userLoggedIn);

export default router