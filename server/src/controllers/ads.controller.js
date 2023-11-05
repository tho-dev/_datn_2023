import Ads from "../models/ads.model";
import createError from "http-errors";
import moment from "moment/moment";
import schedule from "node-schedule";
import nodemailer from "nodemailer";

export async function createAds(req, res, next) {
  try {
    const { startDate, endDate, title, email, content, sendTime, jobId } =
      req.body;
    const newAds = new Ads({
      jobId: jobId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      title,
      email,
      content,
      sendTime,
    });
    await newAds.save();
    // Lên lịch công việc gửi email trong khoảng thời gian với giờ cụ thể
    const parsedTime = moment(sendTime, "HH:mm");

    const hours = parsedTime.format("HH"); // Lấy giờ từ đối tượng thời gian
    const minutes = parsedTime.format("mm");
    const job = schedule.scheduleJob(
      jobId,
      {
        hours: hours,
        minutes: minutes,
      },
      async () => {
        const currentDate = moment().format("YYYY-MM-DD");
        const currentTime = moment();
        const currentHour = currentTime.format("HH"); // Lấy giờ hiện tại (24 giờ)
        const currentMinute = currentTime.format("mm");
        if (currentDate > endDate) {
          schedule.cancelJob(jobId);
        }
        if (
          currentDate >= startDate &&
          currentDate <= endDate &&
          currentHour == hours &&
          currentMinute == minutes
        ) {
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: process.env.USER,
              pass: process.env.PASS,
            },
          });
          await transporter.sendMail({
            from: `Hệ thống Poly-Tech ${process.env.USER}`,
            to: email.join(","),
            subject: title,
            html: content,
          });
        }
      }
    );
    return res.json({
      message: "Bạn đã tạo thành công chiến dịch",
      status: 201,
    });
  } catch (error) {
    next(error);
  }
}

export const deleteAds = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const ads = await Ads.findOne({ jobId });
    if (!ads) {
      throw createError.NotFound("không tìm thấy sự kiện");
    }
    await Ads.deleteOne({ jobId });
    schedule.cancelJob(jobId);
    return res.json({
      message: "Bạn đã huỷ chiến dịch thành công",
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllAds = async (req, res, next) => {
  try {
    const {
      _page = 1,
      _sort = "created_at",
      _order = "asc",
      _limit = 10,
      search,
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "desc" ? -1 : 1,
      },
      select: ["-deleted", "-deleted_at"],
    };
    let query = {};
    if (search) {
      query.title = { $regex: new RegExp(search, "i") };
    }
    const { docs, ...paginate } = await Ads.paginate(query, options);
    if (!docs) {
      throw createError.NotFound("không tìm thấy sự kiện");
    }
    return res.json({
      message: "Lấy tất cả chiến dịch thành công",
      status: 200,
      data: {
        items: docs,
        paginate,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getOneAds = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ads = await Ads.findById(id);
    if (!ads) {
      throw createError.NotFound("không tìm thấy sự kiện");
    }
    return res.json({
      message: "Lấy chiến dịch thành công",
      status: 200,
      data: ads,
    });
  } catch (error) {
    next(error);
  }
};
