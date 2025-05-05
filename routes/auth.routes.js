import { Router } from "express";
import * as authControllers from "../controllers/auth.controller.js";

const router = Router();

// router.get("/register",authControllers.getRegisterPage);

router
.route("/register")
.get(authControllers.getRegisterPage)
.post(authControllers.postRegister);

//EITHER THIS
// router.get("/login",authControllers.getLoginPage);
// router.post("/login",authControllers.postLogin);

//OR THIS 
router
.route("/login")
.get(authControllers.getLoginPage)
.post(authControllers.postLogin);

export const authRoutes = router;