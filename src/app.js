import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import accountRouter from "./routes/account.route.js";
import transactionRouter from "./routes/transaction.route.js";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);
app.use("/api/transactions", transactionRouter);

export default app;
