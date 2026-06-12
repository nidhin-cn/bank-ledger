import accountModel from "../models/account.model.js";
import Account from "../models/account.model.js";

export const createAccountController = async (req, res) => {
  try {
    const user = req.user;
    const account = await Account.create({ user: user._id });
    res.status(201).json({ account });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserAccountsController = async (req, res) => {
  try {
    const accounts = await accountModel.find({ user: req.user._id });
    res.status(200).json({ accounts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAccountBalanceController = async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await accountModel.findOne({
      _id: accountId,
      user: req.user._id,
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const balance = await account.getBalance();

    res.status(200).json({ accountId: account._id, balance: balance });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  createAccountController,
  getUserAccountsController,
  getAccountBalanceController,
};
