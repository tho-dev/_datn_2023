import express from "express";
import {
  createOrder,
  getAll,
  getOne,
  cancelOrder,
  updateStatus,
  update_info_customer,
  payVnPay,
  payMomo,
  sendOtpCode,
  verifyOtpCode,
} from "../controllers/order.controller";

const router = express.Router();

router.post("/send-otp", sendOtpCode);
router.post("/verify-otp", verifyOtpCode);

router.post("/:id", createOrder);
router.get("/", getAll);
router.get("/:id", getOne);
router.put("/cancel/:id", cancelOrder);
router.put("/updateStatus/:id", updateStatus);
router.put("/updateInfoCustomer/:id", update_info_customer);
router.post("/pay-momo", payMomo);
router.post("/pay-vnpay", payVnPay);

export default router;
