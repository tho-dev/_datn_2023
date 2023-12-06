import express from "express";
import { verifyAccessToken } from "../middleware/jwt.middleware";
import { checkPermission } from "../middleware/check-permission.middleware";
import {
  createOrder,
  getAll,
  getOne,
  exportExcel,
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
  deleteOneProduct_order,
  addOneProduct_order,
  deleteProduct_order,
  updateStatusDelivered,
} from "../controllers/order.controller";

const router = express.Router();

router.put(
  "/decrement",
  [verifyAccessToken, checkPermission],
  deleteOneProduct_order
);
router.put(
  "/increment",
  [(verifyAccessToken, checkPermission)],
  addOneProduct_order
);
router.put(
  "/decrement-product-order",
  [verifyAccessToken, checkPermission],
  deleteProduct_order
);

router.get("/export-excel", exportExcel)
router.post("/send-otp", sendOtpCode);
router.post("/payment-status", updatePaymentStatus);
router.post("/verify-otp", verifyOtpCode);
router.post("/calculateFee", serviceFree);
router.put("/orderByPhoneNumber", getOrderByPhoneNumber);
router.get("/orderByUserId", getOrderByUserId);
router.post(
  "/getTokenPrintBill",
  [verifyAccessToken, checkPermission],
  getTokenPrintBills
);
router.post("/return", returnedOrder);
router.get("/return", [verifyAccessToken, checkPermission], getReturnedOrder);
router.put(
  "/return/:id",
  [verifyAccessToken, checkPermission],
  confirm_returnedOrder
);
router.put(
  "/confirm-completed/:id",
  [verifyAccessToken, checkPermission],
  updateStatusDelivered
);

router.post("/", createOrder);
router.get("/", getAll);
router.get("/statistical", getAllOrder);
router.get("/shipping", getAllShipping);
router.get("/:id", getOne);
router.delete("/cancel/:id", cancelOrder);
router.delete("/", [verifyAccessToken, checkPermission], delete_all_order);
router.put(
  "/updateStatus/:id",
  [verifyAccessToken, checkPermission],
  updateStatus
);
router.put("/updateInfoCustomer/:id", update_info_customer);
router.post("/pay-momo", payMomo);
router.post("/pay-vnpay", payVnPay);

export default router;
