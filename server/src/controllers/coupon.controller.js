import Coupon from "../models/coupon.model";
import createError from "http-errors";
import { couponSchema } from "../validations/coupon";
import moment from "moment/moment";

export async function getAllCoupon(req, res, next) {
  try {
    const {
      _page = 1,
      _sort = "created_at",
      _order = "asc",
      _limit = 10,
      _name = "",
      _status = "",
    } = req.query;

    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "desc" ? -1 : 1,
      },
      select: ["-deleted", "-deleted_at"],
    };

    const { docs, ...paginate } = await Coupon.paginate(
      {
        $and: [
          _name ? { name: new RegExp(_name, "i") } : {},
          _status ? { status: JSON.parse(_status) } : {},
        ],
      },
      options
    );

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
}
export async function getOneCoupon(req, res, next) {
  try {
    const { id } = req.params;
    const voucher = await Coupon.findById(id);
    if (!voucher) {
      throw createError.NotFound("Không tìm thấy mã khuyến mãi");
    }
    return res.json({
      status: 200,
      message: "Thành công",
      data: voucher,
    });
  } catch (error) {
    next(error);
  }
}
export async function createCoupon(req, res, next) {
  try {
    let payload = req.body;
    const { error } = couponSchema.validate(payload, { abortEarly: false });

    if (error) {
      const errors = error.details.map((items) => items.message);
      throw createError.BadRequest(errors);
    }

    payload = {
      ...payload,
      created_by: req.user._id,
    };

    const coupon = await Coupon.create(payload);

    return res.status(201).json({
      status: 201,
      message: "Tạo thành công",
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateCoupon(req, res, next) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { error } = couponSchema.validate(payload, { abortEarly: false });

    if (error) {
      const errors = error.details.map((items) => items.message);
      throw createError.BadRequest(errors);
    }

    const coupon = await Coupon.findById(id);

    if (!coupon) {
      throw createError.NotFound("Không tìm thấy");
    }

    coupon.set({
      ...payload,
      updated_by: req.user._id,
      updated_at: moment(new Date()).toISOString(),
    });
    await coupon.save();

    return res.json({
      status: 200,
      message: "Thành công",
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteCoupon(req, res, next) {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findById(id);

    if (!coupon) {
      throw createError.NotFound("Không tìm thấy");
    }

    // cách xóa mềm
    await coupon.delete();
    coupon.deleted_at = moment(new Date()).toISOString();
    await coupon.save();

    return res.json({
      status: 200,
      message: "Thành công",
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
}
export async function getValueCoupon(req, res, next) {
  try {
    const { coupon_code } = req.body;
    const currentDate = moment().format("YYYY-MM-DD");

    const voucher = await Coupon.findOne({
      $and: [{ coupon_code: coupon_code, status: true }],
    });

    if (!voucher) {
      throw createError.NotFound("Không tìm thấy mã khuyến mãi");
    }
    if (voucher.coupon_quantity === 0) {
      throw createError.BadRequest("Mã khuyến mãi của đã hết");
    }
    const endDate = moment(voucher.coupon_end_date).format("YYYY-MM-DD");
    const startDate = moment(voucher.coupon_start_date).format("YYYY-MM-DD");
    if (currentDate > endDate) {
      throw createError.BadRequest("Chương trình khuyến mãi đã kết thúc");
    }
    if (currentDate < startDate) {
      throw createError.BadRequest("Chương trình khuyến mãi chưa bắt đầu");
    }
    return res.json({
      status: 200,
      message: "Thành công",
      data: voucher.coupon_value,
    });
  } catch (error) {
    next(error);
  }
}
