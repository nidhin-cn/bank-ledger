import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
router.post("/register", authController.userRegisterController);

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */
router.post("/login", authController.userLoginController);

/**
 * @route POST /api/auth/logout
 * @description Logout a user
 * @access Public
 */
router.post("/logout", authController.userLogoutController);

export default router;
