import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Tokenblacklist from "../models/blacklist.model.js";

/**
 * @route POST /api/auth/register
 * @description User register controller
 * @access Public
 */
const userRegisterController = async (req, res) => {
  const { email, name, password } = req.body;

  const isExists = await User.findOne({ email: email });

  if (isExists) {
    return res.status(422).json({
      message: "User already exists with the email",
      status: "failed",
    });
  }

  const user = await User.create({
    email,
    password,
    name,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(201).json({
    message: "User created successfully",
    user: { _id: user._id, email: user.email, name: user.name },
    token,
  });
};

/**
 * @route POST /api/auth/login
 * @description User login controller
 * @access Public
 */
const userLoginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
      status: "failed",
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid credentials",
      status: "failed",
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: { _id: user._id, email: user.email, name: user.name },
    token,
  });
};

/**
 * @route POST /api/auth/logout
 * @description Logout a user
 * @access Public
 */
const userLogoutController = async (req, res) => {
  const token = req.cookies.token || req.headers.autherization?.split(" ")[1];

  if (!token) {
    return res.status(200).json({ message: "User logged out successfully" });
  }

  res.clearCookie("token");

  await Tokenblacklist.create({ token: token });

  res.status(200).json({ message: "User logged out successfully" });
};

/**
 * @route GET /api/auth/get-me
 * @description get the details of the logged in user
 * @access Private
 */
const getMeController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      messgae: "User details fetched successfully",
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  userRegisterController,
  userLoginController,
  userLogoutController,
  getMeController,
};
