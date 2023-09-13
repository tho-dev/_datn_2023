import express from "express";
import {
  getAllUser,
  getOneUser,
  addUser,
  updateUser,
  verifyEmail,
  verifiedEmail,
  login,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getOneUser);
router.post("/", addUser);
router.post("/login", login);
router.put("/:id", updateUser);
router.get("/verify/:userId/:uniqueString", verifyEmail);
router.get("/verified", verifiedEmail);

export default router;
