import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Tokenblacklist from "../models/blacklist.model.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access, token is missing" });
  }

  const isBlacklisted = await Tokenblacklist.findOne({ token });

  if (isBlacklisted) {
    return res
      .status(401)
      .json({ message: "Unautherized access, token is invalid" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const authSystemUserMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  const isBlacklisted = await Tokenblacklist.findOne({ token });

  if (isBlacklisted) {
    return res
      .status(401)
      .json({ message: "Unautherized access, token is invalid" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("+systemUser");

    if (!user.systemUser) {
      return res
        .status(403)
        .json({ message: "Forbidden access, not a system user" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default { authMiddleware, authSystemUserMiddleware };
