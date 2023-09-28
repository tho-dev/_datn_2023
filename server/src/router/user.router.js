import express from "express";
import {
  getAllUser,
  getOneUser,
  addUser,
  updateUser,
  verifyEmail,
  verifiedEmail,
  login,
  updateUserPassword,
  logout,
  resetPassWord,
  sendOtp_resetPassword,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getOneUser);
router.post("/", addUser);
router.post("/login", login);
router.post("/logout", logout);
router.put("/:id", updateUser);
router.put("/updatePassword/:id", updateUserPassword);
router.get("/verify/:userId/:uniqueString", verifyEmail);
router.get("/verified", verifiedEmail);
router.post("/sent-otp", sendOtp_resetPassword);
router.post("/resetPassword", resetPassWord);

export default router;




