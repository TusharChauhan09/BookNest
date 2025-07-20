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

router.use(protectRoute);

router.put("/update", updateUser);
router.get("/check", checkAuth);

export default router;
