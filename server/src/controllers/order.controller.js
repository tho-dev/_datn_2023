import createError from "http-errors";
import { Order, Shipping, Order_Detail } from "../models/order.model";
import Coupon from "../models/coupon.model";
import { Cart } from "../models/cart.model";
import { Sku, Variant } from "../models/product.model";
import Returned from "../models/return.model";
import Axios from "axios";
import mongoose from "mongoose";
import {
  calculate_fee,
  calculate_time,
  cancelled_order,
  getLocation,
  getTokenPrintBill,
  get_order_info,
  update_info,
} from "../utils/ghn/";
import moment from "moment";
import crypto from "crypto";
import sortObject from "sortobject";
import querystring from "query-string";
import TextFlow from "textflow.js";
import { getAuthToken } from "../utils/token";
import jwt from "jsonwebtoken";
TextFlow.useKey(process.env.SMS_API);

export const createOrder = async (req, res, next) => {
  try {
    const {
      shipping_address,
      shipping_method,
      cart_id,
      address,
      transportation_fee = 0,
      voucher,
      total_amount,
    } = req.body;
    let user_id = null;
    let coupon_value = 0;
    let coupon_id = null;
    const cart = await Cart.findOne({ cart_id });

    if (voucher) {
      const coupon = await Coupon.findOne({
        $and: [{ coupon_code: voucher, status: true }],
      });
      coupon_value = coupon.coupon_value;
      coupon_id = coupon._id;
      coupon.coupon_quantity--;
      await coupon.save();
    }
    const token = getAuthToken(req);

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN, (err, payload) => {
        if (err) {
          return next(createError.Unauthorized(err.message));
        }
        user_id = payload._id;
      });
    }
    // Kiểm tra xem sản phẩm còn hàng không
    const check_sku_stock = async (product) => {
      try {
        const sku = await Sku.findById(product.sku_id);
        if (sku.stock < product.quantity) {
          return {
            status: false,
            message: `Sản phẩm ${sku.name} vượt quá số lượng hàng còn trong kho`,
          };
        }
        const new_stock = sku.stock - product.quantity;
        await Sku.findByIdAndUpdate(product.sku_id, {
          $set: {
            stock: new_stock,
          },
        });
        return {
          status: true,
          message: "thành công",
        };
      } catch (error) {
        console.log(error);
      }
    };
    const check_stock = await Promise.all(
      cart.products.map((item) => {
        return check_sku_stock(item);
      })
    );

    const check_sku = check_stock.find((item) => item.status === false);
    if (check_sku) {
      throw createError.BadRequest(check_sku.message);
    }
    const new_order = await Order.create({
      ...req.body,
      status_detail: [
        {
          status_order: "processing",
        },
      ],
      payment_method: {
        message: "failed",
        orderInfo: "Thanh toán trực tiếp",
        orderType: "cash",
        partnerCode: "TIENMAT",
      },
      user_id,
      coupon_id,
      total_amount: total_amount + transportation_fee - coupon_value,
    });
    const add_product_item = async (product) => {
      const new_item = await Order_Detail.create({
        order_id: new_order._id,
        sku_id: product.sku_id,
        price: product.price,
        quantity: product.quantity,
        price_before_discount: product.price_before_discount,
        price_discount_percent: product.price_discount_percent,
        total_money: product.quantity * product.price,
      });
      return new_item;
    };

    const get_sku = async (sku_id) => {
      const new_item = await Sku.findById(sku_id);
      return new_item;
    };

    const order_details = await Promise.all(
      cart.products.map((item) => {
        return add_product_item(item);
      })
    );

    const new_order_details = await Promise.all(
      order_details.map(async (item) => {
        const data_sku = await get_sku(item.sku_id);
        return {
          _id: item._id,
          sku_id: data_sku._id,
          name: data_sku.name,
          price: data_sku.price,
          price_before_discount: data_sku.price_before_discount,
          price_discount_percent: data_sku.price_discount_percent,
          image: data_sku.image,
          quantity: item.quantity,
          total_money: item.total_money,
        };
      })
    );
    // Nếu đơn hàng có vận chuyển
    if (shipping_method === "shipped") {
      const detail_address = address + "," + shipping_address;
      const shipping_infor = await Shipping.create({
        shipping_address: detail_address,
        transportation_fee: transportation_fee,
      });
      new_order.shipping_info = shipping_infor._id;
      await new_order.save();
    }
    const order_created = new_order.toObject();
    if (new_order) {
      await Cart.findOneAndUpdate(
        { cart_id },
        { $set: { products: [], total_money: 0 } }
      );
    }
    return res.json({
      status: 200,
      message: "Đặt hàng thành công",
      data: {
        ...order_created,
        products: new_order_details,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const {
      _page = 1,
      _sort = "created_at",
      _order = "desc",
      _limit = 10,
      search,
      status,
      date,
      payment_method,
      payment_status,
    } = req.query;
    const conditions = {};
    if (search) {
      conditions.$or = [
        { customer_name: { $regex: new RegExp(search, "i") } },
        {
          _id: mongoose.Types.ObjectId.isValid(search)
            ? new mongoose.Types.ObjectId(search)
            : null,
        },
      ];
    }

    if (status) {
      conditions.status = status;
    }
    if (payment_status) {
      conditions.payment_status = payment_status;
    }

    if (date) {
      const targetMoment = moment(date);
      const yearToSearch = targetMoment.year();
      const monthToSearch = targetMoment.month();
      const dayToSearch = targetMoment.date();

      conditions.created_at = {
        $gte: new Date(yearToSearch, monthToSearch, dayToSearch),
        $lt: new Date(yearToSearch, monthToSearch, dayToSearch + 1),
      };
    }

    if (payment_method) {
      conditions["payment_method.partnerCode"] = payment_method;
    }
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? -1 : 1,
      },
      select: ["-deleted", "-deleted_at"],
    };
    const { docs, ...paginate } = await Order.paginate(conditions, options);

    const new_docs = await Promise.all(
      docs.map(async (item) => {
        const order_details = await Order_Detail.find({ order_id: item._id });
        const orders = item.toObject();
        return {
          ...orders,
          products: order_details,
        };
      })
    );

    if (!docs) {
      throw createError.NotFound("Không tìm thấy đơn hàng");
    }
    return res.json({
      status: 200,
      message: "Lấy toàn bộ sản phẩm thành công",
      data: {
        items: new_docs,
        paginate,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id).populate("shipping_info coupon_id");
    if (!order) {
      throw createError.NotFound("Không tìm thấy đơn hàng");
    }
    const orderObj = order.toObject();
    const order_details = await Order_Detail.find({ order_id: id }).populate({
      path: "sku_id",
    });
    const new_order_details = await Promise.all(
      order_details.map(async (item) => {
        // lấy ra biến thể của sku
        const variant = await Variant.find({
          sku_id: item.sku_id._id,
        }).populate(["option_value_id"]);
        const option_value = variant?.map(
          (item) => item?.toObject()?.option_value_id?.label
        );
        const new_item = item.toObject();
        return {
          ...new_item,
          option_value,
        };
      })
    );

    if (!order) {
      throw createError.NotFound("Không tìm thấy đơn hàng");
    }
    if (order.shipping_method == "shipped" && order.status === "confirmed") {
      const order_code = orderObj.shipping_info.order_code;
      const order_info = await get_order_info(order_code);
      return res.json({
        status: 200,
        message: "Lấy đơn hàng thành công",
        data: {
          ...orderObj,
          products: new_order_details,
          order_info,
        },
      });
    }
    return res.json({
      status: 200,
      message: "Lấy đơn hàng thành công",
      data: {
        ...orderObj,
        products: new_order_details,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const ordered = await Order.findById(id);
    if (ordered.status === "cancelled") {
      throw createError.BadRequest("Đơn hàng đã được huỷ rồi");
    }
    if (ordered.status === "delivering") {
      throw createError.BadRequest("Không thể huỷ đơn hàng đang giao");
    }
    if (ordered.status === "returned") {
      throw createError.BadRequest("Không thể huỷ đơn hàng đang hoàn");
    }
    if (!ordered) {
      throw createError.NotFound("Không tìm thấy đơn hàng");
    }
    const order = await Order.findByIdAndUpdate(
      id,
      {
        $set: { status: "cancelled" },
        $push: {
          status_detail: {
            status: "cancelled",
          },
        },
      },
      { new: true }
    ).populate([
      {
        path: "shipping_info",
      },
    ]);
    if (!order) {
      throw createError.NotFound("Không tìm thấy đơn hàng");
    }
    if (order.shipping_method === "shipped") {
      const canceled_ghn = await cancelled_order(
        order.shipping_info.order_code
      );
    }
    const check_sku_stock = async (product) => {
      try {
        const sku = await Sku.findById(product.sku_id);
        const new_stock = sku.stock + product.quantity;
        const skued = await Sku.findByIdAndUpdate(
          product.sku_id,
          {
            $set: {
              stock: new_stock,
            },
          },
          { new: true }
        );
        return skued;
      } catch (error) {
        console.log(error);
      }
    };
    const order_detail = await Order_Detail.find({ order_id: id });

    const check_sku = await Promise.all(
      order_detail.map((item) => {
        return check_sku_stock(item);
      })
    );
    return res.json({ status: 200, message: " Huỷ thành công", data: order });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const array_status = [
      "processing",
      "confirmed",
      "delivering",
      "pendingComplete",
      "cancelled",
      "delivered",
      "returned",
    ];
    if (!array_status.includes(status)) {
      throw createError.BadRequest("Trạng thái không hợp lệ");
    }
    const ordered = await Order.findById(id);

    const order_details = await Order_Detail.find({ _id: id });

    const get_sku = async (sku_id) => {
      const new_item = await Sku.findById(sku_id);
      return new_item;
    };

    const check_status = ordered.status_detail.find((item) => {
      return item.status === status;
    });
    if (ordered.status === "cancelled") {
      throw createError.BadRequest("Đơn hàng đã được huỷ");
    }
    if (ordered.status === "delivered") {
      throw createError.BadRequest("Đơn hàng đã được hoàn thành");
    }
    if (check_status) {
      throw createError.BadRequest("Trạng thái đã tồn tại");
    }

    if (ordered.status === status) {
      throw createError.BadRequest("Trạng thái không thay đổi");
    }

    if (status === "returned") {
      throw createError.BadRequest("Không thể huỷ đơn hàng đã hoàn");
    }
    if (!ordered) {
      throw createError.NotFound("Không tìm thấy đơn hàng");
    }
    if (status === "delivered") {
      throw createError.BadRequest(
        "Đợi xác nhận từ khách hàng để hoàn thành đơn"
      );
    }
    if (status === "confirmed" && ordered.shipping_method === "shipped") {
      const shipping = await Shipping.findOne({ _id: ordered.shipping_info });
      const new_order_details = await Promise.all(
        order_details.map(async (item) => {
          const data_sku = await get_sku(item.sku_id);
          return {
            _id: item._id,
            sku_id: data_sku._id,
            name: data_sku.name,
            price: data_sku.price,
            price_before_discount: data_sku.price_before_discount,
            price_discount_percent: data_sku.price_discount_percent,
            image: data_sku.image,
            quantity: item.quantity,
            total_money: item.total_money,
          };
        })
      );
      const address_detail = shipping.shipping_address.split(",");
      const address = address_detail.shift();
      // lấy mã vùng
      const code_ward_district = await getLocation(address_detail.join(","));
      const data_shipping = {
        to_name: ordered.customer_name,
        to_phone: ordered.phone_number.toString(),
        to_address: shipping.shipping_address,
        to_ward_code: code_ward_district.ward_code,
        to_district_id: code_ward_district.district_id,
        content: ordered.content,
        weight: 1000,
        length: 15,
        width: 15,
        height: 15,
        service_type_id: 2,
        service_id: 53319,
        payment_type_id: 1,
        required_note: "CHOXEMHANGKHONGTHU",
        Items: new_order_details,
        name: "Đồ điện tử",
        quantity: new_order_details.length,
        weight: 15,
      };

      const orderCode = await Axios.post(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
        {
          ...data_shipping,
        },
        {
          headers: {
            Token: process.env.GHN_SHOP_TOKEN,
            ShopId: process.env.GHN_SHOP_ID,
            "Content-Type": "application/json",
          },
        }
      );

      if (orderCode.data.code === 200) {
        await Shipping.findByIdAndUpdate(
          { _id: ordered.shipping_info },
          {
            $set: {
              order_code: orderCode.data.data.order_code,
              estimated_delivery_date:
                orderCode.data.data.expected_delivery_time,
            },
          }
        );
      }
    }
    const order = await Order.findByIdAndUpdate(
      id,
      {
        $set: { status: status },
        $push: {
          status_detail: {
            status: status,
          },
        },
      },
      { new: true }
    ).populate([
      {
        path: "shipping_info",
      },
    ]);
    return res.json({
      status: 200,
      message: "Cập nhật trạng thái thành công",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
//cập nhật sản phẩm và thông tin khách hàng trong hoá đơn
export const update_info_customer = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      customer_name,
      phone_number,
      content,
      shippingAddress,
      transportation_fee,
    } = req.body;
    const order = await Order.findById(id).populate({
      path: "shipping_info",
    });
    if (!order) {
      throw createError.NotFound("Không tìm thấy đơn hàng");
    }
    if (
      order.status === "cancelled" ||
      order.status === "delivering" ||
      order.status === "delivered"
    ) {
      throw createError.BadRequest("Không thể sửa đơn hàng");
    }
    if (order.shipping_method === "shipped") {
      await Shipping.findByIdAndUpdate(
        { _id: order.shipping_info._id },
        {
          $set: {
            shipping_address: shippingAddress,
            transportation_fee,
          },
        },
        { new: true }
      );
    }
    const updated_order = await Order.findByIdAndUpdate(
      id,
      {
        $set: {
          customer_name,
          phone_number,
          content,
        },
      },
      { new: true }
    );
    return res.json({
      status: 200,
      message: "Đơn hàng đã được cập nhật",
      data: updated_order,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOneProduct_order = async (req, res, next) => {
  try {
    const { order_id, sku_id } = req.body;
    const orderDetail = await Order_Detail.findOne({
      $and: [{ order_id: order_id }, { sku_id: sku_id }],
    });
    if (!orderDetail) {
      throw createError.NotFound("Không tìm thấy sản phẩm");
    }
    if (orderDetail.quantity == 1) {
      throw createError.BadRequest("Ít nhất là 1 sản phẩm");
    }
    const sku = await Sku.findById(sku_id);
    const new_stock = sku.stock + 1;
    await Sku.findByIdAndUpdate(sku_id, {
      $set: {
        stock: new_stock,
      },
    });
    orderDetail.quantity--;
    orderDetail.total_money = orderDetail.quantity * orderDetail.price;
    await orderDetail.save();
    const orderDetails = await Order_Detail.find({ order_id });
    const total_amount = orderDetails.reduce((total, amount) => {
      return total + amount.total_money;
    }, 0);
    const new_order = await Order.findByIdAndUpdate(
      order_id,
      {
        $set: {
          total_amount: total_amount,
        },
      },
      { new: true }
    );
    return res.json({
      status: 200,
      message: "Cập nhật thành công",
      data: new_order,
    });
  } catch (error) {
    next(error);
  }
};

export const addOneProduct_order = async (req, res, next) => {
  try {
    const { order_id, sku_id } = req.body;
    const orderDetail = await Order_Detail.findOne({
      $and: [{ order_id: order_id }, { sku_id: sku_id }],
    });
    if (!orderDetail) {
      throw createError.NotFound("Không tìm thấy sản phẩm");
    }
    const sku = await Sku.findById(sku_id);
    if (sku.stock < orderDetail.quantity) {
      throw createError.NotFound("Sản phẩm quá số lượng");
    } else {
      const new_stock = sku.stock - 1;
      await Sku.findByIdAndUpdate(sku_id, {
        $set: {
          stock: new_stock,
        },
      });
    }
    orderDetail.quantity++;
    orderDetail.total_money = orderDetail.quantity * orderDetail.price;
    await orderDetail.save();
    const orderDetails = await Order_Detail.find({ order_id });
    const total_amount = orderDetails.reduce((total, amount) => {
      return total + amount.total_money;
    }, 0);
    const new_order = await Order.findByIdAndUpdate(
      order_id,
      {
        $set: {
          total_amount: total_amount,
        },
      },
      { new: true }
    );
    return res.json({
      status: 200,
      message: "Cập nhật thành công",
      data: new_order,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteProduct_order = async (req, res, next) => {
  try {
    const { order_id, sku_id } = req.body;

    const orderDetail = await Order_Detail.findOneAndDelete({
      $and: [{ order_id: order_id }, { sku_id: sku_id }],
    });
    const orderDetails = await Order_Detail.find({ order_id });
    const total_amount = orderDetails.reduce((total, amount) => {
      return total + amount.total_money;
    }, 0);
    const new_order = await Order.findByIdAndUpdate(
      order_id,
      {
        $set: {
          total_amount: total_amount,
        },
      },
      { new: true }
    );
    return res.json({
      status: 200,
      message: "thành công",
      data: new_order,
    });
  } catch (error) {
    next(error);
  }
};
///////
export async function payMomo(req, res, next) {
  try {
    const { bill, orderId: _id } = req.body;
    var partnerCode = "MOMO";
    var accessKey = "F8BBA842ECF85";
    var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    var requestId = partnerCode + new Date().getTime();
    var orderId = requestId;
    var orderInfo = "Thanh Toán MoMo";
    var redirectUrl = process.env.FE_URL + `/thanks?_id=${_id}`;
    var ipnUrl = "https://callback.url/notify";
    var amount = bill;
    var requestType = "payWithATM";
    var extraData = ""; //pass empty value if your merchant does not have stores
    var rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;
    var signature = crypto
      .createHmac("sha256", secretkey)
      .update(rawSignature)
      .digest("hex");
    const requestBody = {
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: "en",
    };
    const response = await Axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      requestBody,
      {
        headers: {
          port: 443,
        },
        withCredentials: true,
      }
    );

    return res.status(201).json({
      message: "successfully",
      data: {
        url: response?.data?.payUrl,
      },
    });
  } catch (error) {
    next(error);
  }
}

export const payVnPay = async (req, res, next) => {
  try {
    const { bill, orderId: _id } = req.body;
    // const apiKey = "YOUR_API_KEY";
    const orderId = _id;
    const returnUrl = process.env.FE_URL;
    const amount = +bill;
    const bankCode = "NCB";

    const tmnCode = process.env.VNP_TMNCODE;
    const secretKey = process.env.VNP_HASHSECRET;
    const vnpUrl = process.env.VNP_URL;

    const date = new Date();
    const vnp_CreateDate = moment(date).format("yyyymmddHHmmss");
    const orderIdStr = moment(date).format("HHmmss");

    const vnp_Params = {
      vnp_Version: "2.0.1",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderIdStr,
      vnp_OrderInfo: "Nội dung thanh toán",
      vnp_OrderType: "billpayment",
      vnp_Amount: amount * 100, // VNPAY yêu cầu số tiền phải được nhân với 100
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: "",
      vnp_CreateDate: vnp_CreateDate,
    };

    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }
    const vnp_Params_Copy = { ...vnp_Params };

    // Sắp xếp và gán chữ ký cho đối tượng mới
    const vnp_Params_Sorted = sortObject(vnp_Params_Copy);

    const signData = querystring.stringify(vnp_Params_Sorted, {
      encode: false,
    });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params_Copy["vnp_SecureHash"] = signed;

    // Tạo URL thanh toán
    const paymentUrl =
      vnpUrl + "?" + querystring.stringify(vnp_Params_Copy, { encode: false });

    return res.status(201).json({
      message: "successfully",
      data: {
        url: paymentUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};
// gửi otp qua sdt
export const sendOtpCode = async (req, res, next) => {
  try {
    const { phone_number } = req.body;
    const verificationOptions = {
      service_name: "PolyTech",
      seconds: 60,
    };
    const result = await TextFlow.sendVerificationSMS(
      phone_number,
      verificationOptions
    );
    return res.json({
      status: result.status,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOtpCode = async (req, res, next) => {
  try {
    const { phone_number, code } = req.body;
    const result = await TextFlow.verifyCode(phone_number, code);
    if (!result.valid) {
      throw createError.BadRequest("Mã code không đúng");
    }
    return res.json({ status: result.status, message: result.message });
  } catch (error) {
    next(error);
  }
};
// tính tiền vận chuyển
export const serviceFree = async (req, res, next) => {
  try {
    const { location } = req.body;
    const code_location = await getLocation(location);
    const data = {
      from_district_id: 1915,
      from_ward_code: "1B2128",
      service_id: 53320,
      service_type_id: null,
      to_district_id: code_location.district_id,
      to_ward_code: code_location.ward_code,
      height: 50,
      length: 20,
      weight: 200,
      width: 20,
      insurance_value: 10000,
      cod_failed_amount: 2000,
      coupon: null,
    };
    const total_money = await calculate_fee(data);
    if (total_money.code !== 200) {
      throw createError.BadRequest("Không thể tính phí vận chuyển");
    }
    return res.json({
      status: 200,
      message: "thành công",
      data: total_money.data.total,
    });
  } catch (error) {
    next(error);
  }
};
// lấy đơn hàng theo số điện thoại
export const getOrderByPhoneNumber = async (req, res, next) => {
  try {
    const {
      _page = 1,
      _sort = "created_at",
      _order = "desc",
      _limit = 6,
      search,
      phone_number,
    } = req.query;
    const conditions = {};

    if (search) {
      conditions.customer_name = { $regex: new RegExp(search, "i") };
    }
    if (phone_number) {
      conditions.phone_number = phone_number;
    }
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? -1 : 1,
      },
      select: ["-deleted", "-deleted_at"],
    };

    const { docs, ...paginate } = await Order.paginate(conditions, options);

    if (!docs) {
      throw createError.NotFound("Không tìm thấy đơn hàng");
    }

    const orderDetailsPromises = docs.map(async (result) => {
      const orderDetails = await Order_Detail.find({ order_id: result._id });
      const newOrder = await Promise.all(
        orderDetails.map(async (item) => {
          const sku = await Sku.findOne({ _id: item.sku_id }).select(
            "name shared_url image"
          );
          const newSku = sku.toObject();
          return {
            ...item.toObject(),
            ...newSku,
          };
        })
      );
      return {
        ...result.toObject(),
        orders: newOrder,
      };
    });

    const ordersWithDetails = await Promise.all(orderDetailsPromises);
    return res.json({
      status: 200,
      message: "Lấy toàn bộ sản phẩm thành công",
      data: {
        items: ordersWithDetails,
        paginate,
      },
    });
  } catch (error) {
    next(error);
  }
};
// lấy đơn hàng theo user_id
export const getOrderByUserId = async (req, res, next) => {
  try {
    const {
      _page = 1,
      _sort = "created_at",
      _order = "desc",
      _limit = 10,
      status,
      id,
    } = req.query;
    const conditions = {};
    if (status) {
      conditions.status = status;
    }
    if (id) {
      conditions.user_id = id;
    }

    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? -1 : 1,
      },
      select: ["-deleted", "-deleted_at"],
      populate: "shipping_info",
    };

    const { docs, ...paginate } = await Order.paginate(conditions, options);

    if (docs.length <= 0) {
      throw createError.NotFound("Không tìm thấy đơn hàng");
    }

    // const order_details = await Order_Detail.find({ order_id: result._id });
    const order_details = await Promise.all(
      docs.map(async (item) => {
        const order_detail = await Order_Detail.find({ order_id: item._id });
        const new_order_details = await Promise.all(
          order_detail.map(async (item) => {
            const sku = await Sku.findOne({ _id: item.sku_id }).select(
              "name shared_url image"
            );
            const new_item = item.toObject();
            const new_sku = sku.toObject();
            return {
              ...new_item,
              ...new_sku,
            };
          })
        );
        const new_item = item.toObject();
        return {
          ...new_item,
          new_order_details,
        };
      })
    );

    return res.json({
      status: 200,
      message: "Tìm thấy đơn hàng thành công",
      data: {
        items: order_details,
        paginate,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTokenPrintBills = async (req, res, next) => {
  try {
    const { order_id } = req.body;
    const order = await Order.findById(order_id).populate("shipping_info");
    if (!order) {
      throw createError.NotFound("Không tìm thấy đơn hàng");
    }
    if (order.shipping_method === "at_store") {
      throw createError.BadRequest("Đơn hàng này mua tại cửa hàng");
    }
    // Nếu đơn hàng chưa được thay đổi trạng thái thì sẽ thay đổi trạng thái và cập nhật vào giao hàng nhanh để in vận đơn
    if (order.status === "processing" && order.shipping_method === "shipped") {
      const shipping = await Shipping.findOne({ _id: order.shipping_info._id });
      const order_details = await Order_Detail.find({ _id: order_id });
      const get_sku = async (sku_id) => {
        const new_item = await Sku.findById(sku_id);
        return new_item;
      };
      const new_order_details = await Promise.all(
        order_details.map(async (item) => {
          const data_sku = await get_sku(item.sku_id);
          return {
            _id: item._id,
            sku_id: data_sku._id,
            name: data_sku.name,
            price: data_sku.price,
            price_before_discount: data_sku.price_before_discount,
            price_discount_percent: data_sku.price_discount_percent,
            image: data_sku.image,
            quantity: item.quantity,
            total_money: item.total_money,
          };
        })
      );
      const address_detail = shipping.shipping_address.split(",");
      const address = address_detail.shift();
      // lấy mã vùng
      const code_ward_district = await getLocation(address_detail.join(","));
      const data_shipping = {
        to_name: order.customer_name,
        to_phone: order.phone_number.toString(),
        to_address: shipping.shipping_address,
        to_ward_code: code_ward_district.ward_code,
        to_district_id: code_ward_district.district_id,
        content: order.content,
        weight: 1000,
        length: 15,
        width: 15,
        height: 15,
        service_type_id: 2,
        service_id: 53319,
        payment_type_id: 1,
        required_note: "CHOXEMHANGKHONGTHU",
        Items: new_order_details,
        name: "Đồ điện tử",
        quantity: new_order_details.length,
        weight: 15,
      };

      const orderCode = await Axios.post(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
        {
          ...data_shipping,
        },
        {
          headers: {
            Token: process.env.GHN_SHOP_TOKEN,
            ShopId: process.env.GHN_SHOP_ID,
            "Content-Type": "application/json",
          },
        }
      );

      if (orderCode.data.code === 200) {
        await Shipping.findByIdAndUpdate(
          { _id: order.shipping_info._id },
          {
            $set: {
              order_code: orderCode.data.data.order_code,
              estimated_delivery_date:
                orderCode.data.data.expected_delivery_time,
            },
          }
        );
      }
    }

    const shipping = await Shipping.findOne({ _id: order.shipping_info._id });
    const token_bill = await getTokenPrintBill(shipping?.order_code);
    if (token_bill.code !== 200) {
      throw createError.BadRequest("Không tìm thấy token hoá đơn");
    }
    return res.json({
      status: token_bill.code,
      message: token_bill.message,
      data: token_bill.data?.token,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePaymentStatus = async (req, res, next) => {
  try {
    const { _id, orderInfo } = req.body;
    const order = await Order.findByIdAndUpdate(_id, {
      $set: {
        payment_status: "paid",
        payment_method: req.body,
      },
    });
    if (!order) {
      throw createError.NotFound("Không tìm thấy đơn hàng");
    }
    return res.json({
      status: 200,
      message: "Thành công",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllShipping = async (req, res, next) => {
  try {
    const {
      _page = 1,
      _sort = "createdAt",
      _order = "asc",
      _limit = 10,
    } = req.query;
    const customer_name = req.query.q;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? -1 : 1,
      },
    };
    if (customer_name) {
      const { docs, ...paginate } = await Order.paginate(
        {
          shipping_method: "shipped",
          customer_name: { $regex: customer_name, $options: "i" },
        },
        options
      );

      const new_docs = await Promise.all(
        docs.map(async (item) => {
          const order_details = await Order_Detail.find({ order_id: item._id });
          const orders = item.toObject();
          return {
            ...orders,
            products: order_details,
          };
        })
      );
      return res.json({
        status: 200,
        message: "Lấy toàn bộ đơn hàng thành công",
        data: {
          items: new_docs,
          paginate,
        },
      });
    } else {
      const { docs, ...paginate } = await Order.paginate(
        {
          shipping_method: "shipped",
        },
        options
      );

      const new_docs = await Promise.all(
        docs.map(async (item) => {
          const order_details = await Order_Detail.find({ order_id: item._id });
          const orders = item.toObject();
          return {
            ...orders,
            products: order_details,
          };
        })
      );
      return res.json({
        status: 200,
        message: "Lấy toàn bộ đơn hàng thành công",
        data: {
          items: new_docs,
          paginate,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();

    const new_docs = await Promise.all(
      orders.map(async (item) => {
        const order_details = await Order_Detail.find({ order_id: item._id });
        const order = item.toObject();
        return {
          ...order,
          products: order_details,
        };
      })
    );
    const total_order = new_docs.length;
    const mangKetQua = [...new Set(new_docs.map((item) => item.customer_name))];
    const total_user = mangKetQua.length;
    const total_order_money = new_docs
      .reduce((total_order, item) => {
        return total_order + item.total_amount;
      }, 0)
      .toLocaleString();
    const total_order_product = new_docs.reduce((total_order, item) => {
      return total_order + item.products.length;
    }, 0);
    return res.json({
      status: 200,
      message: "Lấy toàn bộ đơn hàng thành công",
      data: {
        total_order,
        total_user,
        total_order_money,
        total_order_product,
        new_docs,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const returnedOrder = async (req, res, next) => {
  try {
    const { order_id, reason, customer_name, phone_number, images } = req.body;
    const return_order = await Returned.findOne({ order_id });
    if (return_order) {
      throw createError.BadRequest("Đơn hàng đã được yêu cầu hoàn hàng");
    }
    const order = await Order.findById(order_id);
    if (order.status === "returned" || order.status !== "delivered") {
      throw createError.BadRequest("Trạng thái đơn hàng không thể hoàn");
    }
    const returned = await Returned.create({
      order_id,
      reason,
      customer_name,
      phone_number,
      images,
    });
    if (!returned) throw createError.BadRequest("Hoàn hàng không thành công");
    return res.json({
      status: 200,
      message: "Tạo yêu cầu hoàn hàng thành công",
      data: returned,
    });
  } catch (error) {
    next(error);
  }
};
export const getReturnedOrder = async (req, res, next) => {
  try {
    const {
      _page = 1,
      _sort = "created_at",
      _order = "desc",
      _limit = 10,
      search,
      is_confirm,
      date,
    } = req.query;
    const conditions = {};

    if (search) {
      conditions.customer_name = { $regex: new RegExp(search, "i") };
    }

    if (is_confirm) {
      conditions.is_confirm = is_confirm;
    }

    if (date) {
      const targetMoment = moment(date);
      const yearToSearch = targetMoment.year();
      const monthToSearch = targetMoment.month();
      const dayToSearch = targetMoment.date();

      conditions.created_at = {
        $gte: new Date(yearToSearch, monthToSearch, dayToSearch),
        $lt: new Date(yearToSearch, monthToSearch, dayToSearch + 1),
      };
    }

    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? -1 : 1,
      },
      select: ["-deleted", "-deleted_at"],
    };

    const { docs, ...paginate } = await Returned.paginate(conditions, options);

    return res.json({
      status: 200,
      message: "Thành công",
      data: {
        items: docs,
        paginate,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const confirm_returnedOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    // update return
    const returned = await Returned.findByIdAndUpdate(
      id,
      {
        $set: {
          is_confirm: true,
        },
      },
      { new: true }
    );
    if (!returned) throw createError.BadRequest("Không tìm thấy đơn hàng");
    // update order
    const order = await Order.findByIdAndUpdate(
      returned.order_id,
      {
        $set: { status: "returned" },
        $push: {
          status_detail: {
            status: "returned",
          },
        },
      },
      { new: true }
    );
    const check_sku_stock = async (product) => {
      try {
        const sku = await Sku.findById(product.sku_id);
        const new_stock = sku.stock + product.quantity;
        await Sku.findByIdAndUpdate(product.sku_id, {
          $set: {
            stock: new_stock,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    // update number skuid
    const order_items = await Order_Detail.find({
      order_id: returned.order_id,
    }).select("sku_id quantity");

    await Promise.all(
      order_items.map((item) => {
        return check_sku_stock(item);
      })
    );

    return res.json({
      status: 200,
      message: "Hoàn hàng thành công",
    });
  } catch (error) {
    next(error);
  }
};
export const delete_all_order = async (req, res, next) => {
  try {
    const orders = await Order.deleteMany();
    const order_detail = await Order_Detail.deleteMany();
    const shipping = await Shipping.deleteMany();
    return res.json({
      status: 200,
      message: "thành công",
    });
  } catch (error) {
    next(error);
  }
};

export const updateStatusDelivered = async (req, res, next) => {
  try {
    const id = req.params.id;
    const ordered = await Order.findById(id);
    if (ordered.status !== "pendingComplete") {
      throw createError.NotFound("Trạng thái đơn hàng không hợp lệ");
    }
    if (!ordered) {
      throw createError.NotFound("Không tìm thấy đơn hàng");
    }
    const order = await Order.findByIdAndUpdate(
      id,
      {
        $set: { status: "delivered", payment_status: "paid" },
        $push: {
          status_detail: {
            status: "delivered",
          },
        },
      },
      { new: true }
    );
    return res.json({
      status: 200,
      message: "Cập nhật trạng thái thành công",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
