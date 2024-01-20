import express from "express"
import { googleController,
     loginController,
     logoutController,
     registerController } from "../controllers/AuthController.js";

const router = express.Router()

router.post("/register", registerController)
router.post("/login", loginController)
router.post("/google", googleController)
router.get("/logout", logoutController);


export default router;