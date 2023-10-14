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
  serviceFree,
  getOrderByPhoneNumber,
  getTokenPrintBills,
  updatePaymentStatus,
  getAllShipping,
  getAllOrder,
} from "../controllers/order.controller";

const router = express.Router();

router.post("/send-otp", sendOtpCode);
router.post("/payment-status", updatePaymentStatus);
router.post("/verify-otp", verifyOtpCode);
router.post("/calculateFee", serviceFree);
router.post("/orderByPhoneNumber", getOrderByPhoneNumber);
router.post("/getTokenPrintBill", getTokenPrintBills);

router.post("/", createOrder);
router.get("/", getAll);
router.get("/statistical", getAllOrder);
router.get("/shipping", getAllShipping);
router.get("/:id", getOne);
router.delete("/cancel/:id", cancelOrder);
router.put("/updateStatus/:id", updateStatus);
router.put("/updateInfoCustomer/:id", update_info_customer);
router.post("/pay-momo", payMomo);
router.post("/pay-vnpay", payVnPay);

export default router;
