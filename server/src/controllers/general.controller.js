import General from "../models/general.model"
import Category from "../models/category.model"
import Brand from "../models/brand.model"
import { Promotion } from "../models/promotion.model"
import { Product } from '../models/product.model'
import { generalSchema } from "../validations/general"
import { Order } from "../models/order.model"
import moment from "moment/moment"
import createError from "http-errors"
import fetch from "node-fetch"


export async function getDashboard(req, res, next) {
  try {

    // radom color
    const dynamicColors = () => {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgba(" + r + "," + g + "," + b + "," + 0.5 + ")";
    };

    // thống kê sản phẩm theo danh mục
    const categories = await Category.find({
      parent_id: null,
      type: 'category_brand'
    })
    const dataCategory = await Promise.all(categories.map(async (category) => {
      const count = await Product.find({
        status: true,
        category_id: category?._id,

      })

      return {
        label: category?.name,
        value: count?.length
      }
    }))

    // thống kê thương hiệu theo danh mục
    const dataBrand = await Promise.all(categories.map(async (category) => {
      const count = await Brand.find({
        category_id: category?._id,
      })

      return {
        label: category?.name,
        value: count?.length,
      }
    }))



    // ////
    const data_1 = dataCategory.reduce((acc, cur, index) => {
      acc.labels.push(cur.label);
      acc.values.push(cur.value);
      return acc
    }, {
      labels: [],
      values: [],
    })

    const data_2 = dataBrand.reduce((acc, cur, index) => {
      acc.labels.push(cur.label);
      acc.values.push(cur.value);
      return acc
    }, {
      labels: [],
      values: [],
    })


    return res.json({
      status: 200,
      message: "Thành công",
      data: {
        categories: data_1,
        brands: data_2
      }
    })
  } catch (error) {
    next(error)
  }
}

export async function revenueStatistics(req, res, next) {
  try {
    const { period = 'week' } = req.query;

    // // Lấy ngày hiện tại
    const currentDate = moment();
    let startOfPeriod, endOfPeriod;

    switch (period) {
      case 'week':
        // 1 tuần trước
        startOfPeriod = currentDate.clone().subtract(7, 'days').startOf('day');
        endOfPeriod = currentDate.clone().subtract(1, 'days').endOf('day');
        break;
      case 'month':
        // Tháng trước
        startOfPeriod = currentDate.clone().subtract(1, 'months').startOf('month');
        endOfPeriod = currentDate.clone().subtract(1, 'months').endOf('month');
        break;
      // case 'this-month':
      //   // Tháng này
      //   startOfPeriod = currentDate.clone().startOf('month');
      //   endOfPeriod = currentDate.clone().endOf('month');
      //   break;
      case '3-months-ago':
        // 3 tháng trước
        startOfPeriod = currentDate.clone().subtract(3, 'months').startOf('month');
        endOfPeriod = currentDate.clone().subtract(1, 'months').endOf('month');
        break;

      case '6-months-ago':
        // 6 tháng trước
        startOfPeriod = currentDate.clone().subtract(6, 'months').startOf('month');
        endOfPeriod = currentDate.clone().subtract(1, 'months').endOf('month');
        break;

      case 'year':
        // 1 năm trước
        startOfPeriod = currentDate.clone().subtract(12, 'months').startOf('month');
        endOfPeriod = currentDate.clone().subtract(1, 'months').endOf('months');
        break;

      // case 'this-year':
      //   // Năm nay
      //   startOfPeriod = currentDate.clone().startOf('year');
      //   endOfPeriod = currentDate.clone().endOf('year');
      //   break;
      default:
        throw new Error('Invalid period specified');
    }

    const data = await Order.aggregate([
      {
        $match: {
          created_at: {
            $gte: startOfPeriod.toDate(),
            $lt: endOfPeriod.toDate(),
          },
          status: 'delivered',
        },
      },
      {
        $lookup: {
          from: 'order_details',
          localField: '_id',
          foreignField: 'order_id',
          as: 'products', // Tên của trường mới chứa dữ liệu kết hợp
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%d-%m-%Y',
              date: '$created_at',
            },
          },
          order: { $sum: 1 },
          quantity: {
            $sum: {
              $sum: {
                $map: {
                  input: "$products",
                  as: "product",
                  in: { $sum: "$$product.quantity" }
                }
              }
            }
          },
          profit: {
            $sum: {
              $sum: {
                $map: {
                  input: "$products",
                  as: "product",
                  in: { $subtract: ["$$product.price_before_discount", "$$product.price"] }
                }
              }
            }
          },
          sales: { $sum: '$total_amount' }, // Tổng tiền lượng cho mỗi ngày
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
          period: '$_id', // Đổi tên trường _id thành created_at
          order: 1, // số lượng đơn hàng
          profit: 1, // lượng nhuận
          quantity: 1, // số lượng sản phẩm
          sales: 1, // doanh thu
        },
      },
    ]);

    return res.json({
      status: 200,
      message: 'Thành công',
      data: data
    })
  } catch (error) {
    next(error)
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
      type: 'category_brand'
    })
      .select("-deleted -deteled_at -created_at -updated_at")
      .sort({
        updated_at: -1
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
      status: true
    })

    const result = await Promise.all(promotions.map(async (item) => {
      const res = await fetch(process.env.BE_URL + '/promotions/detail?slug=' + item?.slug)
      const res2 = await res.json()

      return res2?.data
    }))

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
          ...general[0].toObject() || {}
        },
        category: {
          title: 'Danh mục',
          items: category,
          type: 'slide'
        },
        suggestion: {
          title: "Gợi ý cho bạn",
          tags: suggestion,
        },
        promotions: {
          title: 'Chương trình khuyến mãi nổi bật',
          items: result
        }
      }
    })
  } catch (error) {
    next(error)
  }
}
