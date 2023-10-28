import Notification from "../models/notification.model";
import createError from "http-errors";

export const getAll = async (req, res, next) => {
  try {
    const { status } = req.query;
    if (status) {
      const notifications = await Notification.find({ status: status });
      return res.json({
        status: 200,
        message: "Thành công",
        data: notifications,
      });
    } else {
      const notifications = await Notification.find();
      return res.json({
        status: 200,
        message: "Thành công",
        data: notifications,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllByUserId = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const notifications = await Notification.find({ receivers_id: user_id });
    if (!notifications) throw createError.NotFound("Không tìm thấy thông báo");
    return res.json({
      status: 200,
      message: "Thành công",
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

export const addNoti = async (req, res, next) => {
  try {
    const notifications = await Notification.create(req.body);
    if (!notifications) throw createError.NotFound("Không tìm thấy thông báo");
    return res.json({
      status: 201,
      message: "Thành công",
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNoti = async (req, res, next) => {
  try {
    const id = req.params.id;
    const notifications = await Notification.findByIdAndUpdate(
      id,
      {
        $set: {
          status: true,
        },
      },
      { new: true }
    );
    if (!notifications) throw createError.NotFound("Không tìm thấy thông báo");
    return res.json({
      status: 200,
      message: "Thành công",
    });
  } catch (error) {
    next(error);
  }
};
