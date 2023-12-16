import { Order } from "../models/order.model";
import moment from "moment/moment";
import schedule from "node-schedule";

export async function checkStatusOrder(next) {
  try {
    // Đặt lịch trình kiểm tra mỗi ngày lúc 00:00
    const job = schedule.scheduleJob("35 19 * * *", async function () {
      console.log("Đã đến thời điểm kiểm tra trạng thái đơn hàng.");
      const orders = await Order.find({ status: "pendingComplete" });
      if (orders.length === 0) {
        return;
      }
      await Promise.all(
        orders.map(async (item) => {
          const currentTime = moment().format("YYYY-MM-DD");

          const update_date = moment(item.updated_at)
            .add(2, "days")
            .format("YYYY-MM-DD");
          if (currentTime >= update_date) {
            await Order.findByIdAndUpdate(item._id, {
              $set: {
                status: "delivered",
                payment_status: "paid",
              },
            });
          }
        })
      );
      console.log("Đã kiểm tra trạng thái đơn hàng.");
    });
  } catch (error) {
    next(error);
  }
}
