import express from "express";
import accountController from "../controllers/account.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @route POST /api/accounts
 * @description Create a new account for the authenticated user
 * @access Private
 */
router.post(
  "/",
  authMiddleware.authMiddleware,
  accountController.createAccountController,
);

/**
 * @route GET /api/accounts
 * @description Get all accounts of logged-in user
 * @access Protected
 */
router.get(
  "/",
  authMiddleware.authMiddleware,
  accountController.getUserAccountsController,
);

/**
 * @route GET /api/accounts/balance/:accountId
 * @description Get balance of an account
 * @access Private
 */
router.get(
  "/balance/:accountId",
  authMiddleware.authMiddleware,
  accountController.getAccountBalanceController,
);

export default router;
