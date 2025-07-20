import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Allow request to proceed
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    return res.status(401).json({ message: "Internal Error" });
  }
};
