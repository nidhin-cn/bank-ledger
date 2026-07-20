import express from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

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
router.post(
  "/logout",
  authMiddleware.authMiddleware,
  authController.userLogoutController,
);

/**
 * @route GET /api/auth/get-me
 * @description get the details of the logged in user
 * @access Private
 */
router.get(
  "/get-me",
  authMiddleware.authMiddleware,
  authController.getMeController,
);

export default router;
