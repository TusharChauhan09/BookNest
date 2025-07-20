import express from "express";

import {
  signup,
  signin,
  checkAuth,
  signout,
  updateUser,
} from "../controllers/auth.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);

router.put("/update", protectRoute, updateUser);
router.get("/check", protectRoute, checkAuth);

export default router;
