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
  getOrderByUserId,
  returnedOrder,
  confirm_returnedOrder,
  delete_all_order,
  getReturnedOrder,
} from "../controllers/order.controller";

const router = express.Router();

router.post("/send-otp", sendOtpCode);
router.post("/payment-status", updatePaymentStatus);
router.post("/verify-otp", verifyOtpCode);
router.post("/calculateFee", serviceFree);
router.post("/orderByPhoneNumber", getOrderByPhoneNumber);
router.get("/orderByUserId/:id", getOrderByUserId);
router.post("/getTokenPrintBill", getTokenPrintBills);
router.post("/return", returnedOrder);
router.get("/return", getReturnedOrder);
router.put("/return/:id", confirm_returnedOrder);

router.post("/", createOrder);
router.get("/", getAll);
router.get("/statistical", getAllOrder);
router.get("/shipping", getAllShipping);
router.get("/:id", getOne);
router.delete("/cancel/:id", cancelOrder);
router.delete("/", delete_all_order);
router.put("/updateStatus/:id", updateStatus);
router.put("/updateInfoCustomer/:id", update_info_customer);
router.post("/pay-momo", payMomo);
router.post("/pay-vnpay", payVnPay);

export default router;
