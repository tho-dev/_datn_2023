import General from "../models/general.model";
import Category from "../models/category.model";
import Brand from "../models/brand.model";
import { Promotion } from "../models/promotion.model";
import { Product, Comparison } from "../models/product.model";
import { generalSchema } from "../validations/general";
import { Order } from "../models/order.model";
import User from "../models/user.model";
import moment from "moment/moment";
import createError from "http-errors";
import fetch from "node-fetch";

export async function getDashboard(req, res, next) {
  try {
    // thống kê sản phẩm theo danh mục
    const categories = await Category.find({
      // parent_id: null,
      type: "category_brand",
    });
    const dataCategory = await Promise.all(
      categories.map(async (category) => {
        const count = await Product.find({
          status: true,
          category_id: category?._id,
        });

        return {
          label: category?.name,
          value: count?.length,
        };
      })
    );

    // thống kê thương hiệu theo danh mục
    const dataBrand = await Promise.all(
      categories.map(async (category) => {
        const count = await Brand.find({
          parent_id: null,
          category_id: category?._id,
        });

        return {
          label: category?.name,
          value: count?.length,
        };
      })
    );

    // thống kê các số
    const startOfPeriod = moment().clone().startOf("day");
    const endOfPeriod = moment().clone().endOf("day");

    const products = await Product.find({});
    const orders = await Order.find({
      created_at: {
        $gt: startOfPeriod.toDate(),
        $lt: endOfPeriod.toDate(),
      },
      payment_status: "paid",
      status: "delivered",
    });
    const users = await User.find({});
    const revenues = await Order.aggregate([
      {
        $match: {
          created_at: {
            $gt: startOfPeriod.toDate(),
            $lt: endOfPeriod.toDate(),
          },
          payment_status: "paid",
          status: "delivered",
        },
      },
      {
        $lookup: {
          from: "order_details",
          localField: "_id",
          foreignField: "order_id",
          as: "products", // Tên của trường mới chứa dữ liệu kết hợp
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$created_at",
            },
          },
          order: { $sum: 1 },
          quantity: {
            $sum: {
              $sum: {
                $map: {
                  input: "$products",
                  as: "product",
                  in: { $sum: "$$product.quantity" },
                },
              },
            },
          },
          profit: {
            $sum: {
              $sum: {
                $map: {
                  input: "$products",
                  as: "product",
                  in: {
                    $subtract: [
                      "$$product.price_before_discount",
                      "$$product.price",
                    ],
                  },
                },
              },
            },
          },
          sales: { $sum: "$total_amount" }, // Tổng tiền lượng cho mỗi ngày
        },
      },
      {
        $sort: {
          _id: 1, // Sắp xếp theo ngày tăng dần
        },
      },
      {
        $project: {
          _id: 0, // Loại bỏ trường _id
          period: "$_id", // Đổi tên trường _id thành created_at
          order: 1, // số lượng đơn hàng
          profit: 1, // lượng nhuận
          quantity: 1, // số lượng sản phẩm
          sales: 1, // doanh thu
        },
      },
    ]);

    // // top 3 khách hàng có mua hàng nhiều nhất
    // const customers = await Order.aggregate([
    //   {
    //     $match: {
    //       user_id: { $ne: null },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$user_id",
    //       orders: { $sum: 1 },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: '_id',
    //       foreignField: '_id',
    //       as: 'user',
    //     },
    //   },
    //   {
    //     $sort: {
    //       orders: -1
    //     }
    //   },
    //   {
    //     $limit: 3 // Chỉ lấy top 3 người có đơn hàng nhiều nhất
    //   },
    //   {
    //     $project: {
    //       _id: 1,
    //       user: { $arrayElemAt: ["$user", 0] },
    //       orders: 1,
    //     },
    //   },
    // ]);
    // const data_3 = await Promise.all(customers.map(async (x) => {
    //   let result = []
    //   for (let i = 1; i <= 12; i++) {
    //     const startOfMonth = moment(`2023-${i}-01`, "YYYY-MM-DD").startOf("month");
    //     const endOfMonth = moment(`2023-${i}-01`, "YYYY-MM-DD").endOf("month");
    //     const quantity = await Order.find({
    //       user_id: x._id,
    //       created_at: {
    //         $gte: startOfMonth,
    //         $lt: endOfMonth,
    //       },
    //     })

    //     result.push({
    //       month: i,
    //       quantity: quantity?.length
    //     })
    //   }

    //   return {
    //     user: x.user,
    //     data: result
    //   };
    // }));

    // top 5 sản phẩm được khách hàng so sánh nhiều nhất
    const comparisons = await Comparison.aggregate([
      {
        $unwind: "$comparisons",
      },
      {
        $group: {
          _id: "$product_id",
          total: { $sum: "$comparisons.count" },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $limit: 3,
      },
      {
        $project: {
          _id: 0,
          total: 1,
          product_id: "$_id",
        },
      },
    ]);

    const data_4 = await Promise.all(
      comparisons.map(async (x) => {
        let result = [];
        const product = await Product.findOne({
          _id: x.product_id,
        });

        for (let i = 1; i <= 12; i++) {
          const startOfMonth = moment(`2023-${i}-01`, "YYYY-MM-DD").startOf(
            "month"
          );
          const endOfMonth = moment(`2023-${i}-01`, "YYYY-MM-DD").endOf(
            "month"
          );

          const doc = await Comparison.find(
            {
              product_id: x.product_id,
              "comparisons.date": {
                $gte: startOfMonth.toDate(),
                $lt: endOfMonth.toDate(),
              },
            },
            {
              comparisons: {
                $elemMatch: {
                  date: {
                    $gte: startOfMonth.toDate(),
                    $lt: endOfMonth.toDate(),
                  },
                },
              },
            }
          );

          result.push({
            month: i,
            quantity:
              doc.length > 0
                ? doc[0]?.comparisons?.reduce(
                    (acc, cur) => (acc += cur.count),
                    0
                  )
                : 0,
          });
        }

        return {
          product: {
            name: product.name,
            image: product.images?.[0]?.url,
            price: product.price,
            price_before_discount: product.price_before_discount,
          },
          data: result,
        };
      })
    );

    // custom data
    const data_1 = dataCategory.reduce(
      (acc, cur, index) => {
        acc.labels.push(cur.label);
        acc.values.push(cur.value);
        return acc;
      },
      {
        labels: [],
        values: [],
      }
    );

    const data_2 = dataBrand.reduce(
      (acc, cur, index) => {
        acc.labels.push(cur.label);
        acc.values.push(cur.value);
        return acc;
      },
      {
        labels: [],
        values: [],
      }
    );

    return res.json({
      status: 200,
      message: "Thành công",
      data: {
        categories: data_1,
        brands: data_2,
        array: {
          users: users?.length,
          orders: orders?.length,
          products: products?.length,
          revenues: revenues?.reduce((acc, cur) => {
            return (acc += cur.sales);
          }, 0),
        },
        // top_3_one_chap_order: data_3,
        top_5_one_chap_comparison: data_4,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function revenueStatistics(req, res, next) {
  try {
    const { period = "week" } = req.query;
    const status = [
      {
        value: "processing",
        label: "Chờ xác nhận",
        color: "#fcf2da",
        border: "#fab529",
      },
      {
        value: "pendingComplete",
        label: "Chờ hoàn thành",
        color: "#aee2d1",
        border: "#27bc80",
      },
      {
        value: "returned",
        label: "Đã hoàn hàng",
        color: "#ffe8e0",
        border: "#f36c49",
      },
      {
        value: "confirmed",
        label: "Đã xác nhận",
        color: "#aee2d1",
        border: "#27bc80",
      },
      {
        value: "delivering",
        label: "Đang vận chuyển",
        color: "#d8f8fa",
        border: "#16aecd",
      },
      {
        value: "cancelled",
        label: "Đã hủy đơn",
        color: "#fcdae2",
        border: "#ef476f",
      },
      {
        value: "delivered",
        label: "Đã hoàn thành",
        color: "#aee2d1",
        border: "#27bc80",
      },
    ];

    // Lấy ngày hiện tại
    const currentDate = moment();
    let startOfPeriod, endOfPeriod;
    switch (period) {
      case "this-day":
        startOfPeriod = currentDate.clone().startOf("day");
        endOfPeriod = currentDate.clone().endOf("day");
        break;
      case "week":
        // 1 tuần trước
        startOfPeriod = currentDate.clone().subtract(7, "days").startOf("day");
        endOfPeriod = currentDate.clone().subtract(1, "days").endOf("day");
        break;
      case "month":
        // Tháng trước
        startOfPeriod = currentDate
          .clone()
          .subtract(1, "months")
          .startOf("month");
        endOfPeriod = currentDate.clone().subtract(1, "months").endOf("month");
        break;
      case "this-month":
        // Tháng này
        startOfPeriod = currentDate.clone().startOf("month");
        endOfPeriod = currentDate.clone().endOf("month");
        break;
      default:
        throw new Error("Invalid period specified");
    }

    const data = await Order.aggregate([
      {
        $match: {
          created_at: {
            $gt: startOfPeriod.toDate(),
            $lt: endOfPeriod.toDate(),
          },
          payment_status: "paid",
        },
      },
      {
        $lookup: {
          from: "order_details",
          localField: "_id",
          foreignField: "order_id",
          as: "products", // Tên của trường mới chứa dữ liệu kết hợp
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$created_at",
            },
          },
          order: { $sum: 1 },
          quantity: {
            $sum: {
              $sum: {
                $map: {
                  input: "$products",
                  as: "product",
                  in: { $sum: "$$product.quantity" },
                },
              },
            },
          },
          profit: {
            $sum: {
              $sum: {
                $map: {
                  input: "$products",
                  as: "product",
                  in: {
                    $subtract: [
                      "$$product.price_before_discount",
                      "$$product.price",
                    ],
                  },
                },
              },
            },
          },
          sales: { $sum: "$total_amount" }, // Tổng tiền lượng cho mỗi ngày
        },
      },
      {
        $sort: {
          _id: 1, // Sắp xếp theo ngày tăng dần
        },
      },
      {
        $project: {
          _id: 0, // Loại bỏ trường _id
          period: "$_id", // Đổi tên trường _id thành created_at
          order: 1, // số lượng đơn hàng
          profit: 1, // lượng nhuận
          quantity: 1, // số lượng sản phẩm
          sales: 1, // doanh thu
        },
      },
    ]);

    // thống kê đơn hàng theo status
    const quantityOrderStatus = await Promise.all(
      status.map(async (_x) => {
        const doc = await Order.find({
          status: _x.value,
          created_at: {
            $gt: startOfPeriod.toDate(),
            $lt: endOfPeriod.toDate(),
          },
        });

        return {
          label: _x.label,
          value: doc?.length,
          color: _x.color,
          border: _x.border,
        };
      })
    );

    return res.json({
      status: 200,
      message: "Thành công",
      data: {
        revenues: data,
        order_status: quantityOrderStatus,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getGeneral(req, res, next) {
  try {
    const general = await General.find({});

    return res.json({
      status: 200,
      message: "Thành công",
      data: general[0] || {},
    });
  } catch (error) {
    next(error);
  }
}

export async function createGeneral(req, res, next) {
  try {
    const payload = req.body;
    const { error } = generalSchema.validate(payload, { abortEarly: false });

    if (error) {
      const errors = error.details.map((items) => items.message);
      throw createError.BadRequest(errors);
    }

    const doc = await General.create(payload);

    return res.json({
      status: 201,
      message: "Thành công",
      data: doc,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateGeneral(req, res, next) {
  try {
    const payload = req.body;
    const { error } = generalSchema.validate(payload, { abortEarly: false });

    if (error) {
      const errors = error.details.map((items) => items.message);
      throw createError.BadRequest(errors);
    }

    const { _id, ...body } = payload;

    const doc = await General.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        ...body,
        updated_at: moment(new Date()).toISOString(),
      },
      {
        new: true,
      }
    );

    return res.json({
      status: 200,
      message: "Thành công",
      data: doc,
    });
  } catch (error) {
    next(error);
  }
}

export async function homeSettings(req, res, next) {
  try {
    const general = await General.find({}).select("-created_at -updated_at");

    const categories = await Category.find({
      type: "category_brand",
    })
      .select("-deleted -deteled_at -created_at -updated_at")
      .sort({
        updated_at: -1,
      });

    const category = await Promise.all(
      categories?.map(async (item) => {
        const products = await Product.find({
          category_id: item?._id,
        });

        const brands = await Brand.find({
          category_id: item?._id,
        }).select("_id name slug shared_url");

        return {
          ...item.toObject(),
          thumbnail: item?.thumbnail?.url,
          total: products?.length,
          brands: brands,
        };
      })
    );

    const promotions = await Promotion.find({
      status: true,
    });

    const result = await Promise.all(
      promotions.map(async (item) => {
        const res = await fetch(
          process.env.BE_URL + "/promotions/detail?slug=" + item?.slug
        );
        const res2 = await res.json();

        return res2?.data;
      })
    );

    const suggestion = categories?.map((item) => {
      return {
        name: item?.name,
        value: item?.shared_url,
      };
    });

    return res.json({
      status: 200,
      message: "Thành công",
      data: {
        general: {
          ...(general[0].toObject() || {}),
        },
        category: {
          title: "Danh mục",
          items: category,
          type: "slide",
        },
        suggestion: {
          title: "Gợi ý cho bạn",
          tags: suggestion,
        },
        promotions: {
          title: "Chương trình khuyến mãi nổi bật",
          items: result,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}
