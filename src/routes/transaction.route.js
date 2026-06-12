import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import transactionController from "../controllers/transaction.controller.js";

const router = express.Router();

/**
 * - POST /api/transactions/
 * - Create a new transaction
 */

router.post(
  "/",
  authMiddleware.authMiddleware,
  transactionController.createTransaction,
);

/**
 * - POST /api/transactions/system/initial-funds
 * - Create initial funds transaction from the system user
 */

router.post(
  "/system/initial-funds",
  authMiddleware.authSystemUserMiddleware,
  transactionController.createInitialFundsTransaction,
);

export default router;
