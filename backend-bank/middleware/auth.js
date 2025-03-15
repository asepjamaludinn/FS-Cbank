import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const authenticate = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createError(401, "Access denied. No token provided"));
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user to request object
    req.user = decoded;
    next();
  } catch (error) {
    next(createError(401, "Invalid token"));
  }
};
