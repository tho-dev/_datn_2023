import {
  Product,
  Option,
  OptionValue,
  Sku,
  Variant,
} from "../models/product.model";
import createError from "http-errors";

// lấy tất cả sản phẩm
export async function getAllProduct(req, res, next) {
  try {
    const {
      _page = 1,
      _sort = "createdAt",
      _order = "asc",
      _limit = 10,
    } = req.query;

    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? -1 : 1,
      },
      select: [
        "-assets",
        "-attributes",
        "-description",
        "-specs",
        "-created_at",
        "-updated_at",
      ],
    };

    const { docs, ...paginate } = await Product.paginate({}, options);

    // hàm lấy ra các 1 sku của một sản phẩm
    const getSku = async (product, id) => {
      const sku = await Sku.findOne({
        product_id: id,
      }).select("-assets -stock -created_at -updated_at");

      // lấy ra biến thể của sku
      const variant = await Variant.find({
        sku_id: sku?._id,
      }).populate(["option_value_id"]);

      const optionValue = variant?.map(
        (item) => item.toObject()?.option_value_id?.label
      );

      // lấy ra các options
      const options = await Option.find({
        product_id: id,
      });

      // lấy ra option màu
      const option = options?.find((option) => option.visual == "color");
      const colors = await OptionValue.find({
        option_id: option._id,
      }).select("-_id value label");

      return {
        ...product.toObject(),
        ...sku.toObject(),
        image: sku.image.url,
        option_value: optionValue,
        colors,
      };
    };

    const data = await Promise.all(
      docs?.map((item) => getSku(item, item?._id))
    );

    return res.json({
      status: 200,
      message: "Thành công",
      data: {
        items: data,
        paginate,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getSingleProduct(req, res, next) {
  try {
    const { slug } = req?.params;

    const sku = await Sku.findOne({
      slug,
    }).select("-assets._id");

    const product = await Product.findOne({
      _id: sku?.product_id,
    }).select("-assets._id -attributes._id -attributes.items._id");

    if (!product || !sku) {
      throw createError.BadRequest("Sản phẩm không tồn tại");
    }

    // lấy options
    const options = await Option.find({
      product_id: product?._id,
    });

    // lấy ra tất skus sản phẩm
    const skus = await Sku.find({
      product_id: product?._id,
    }).select("-product_id -assets -created_at -updated_at");

    // lấy ra tất cả các biến thể sản phẩm dựa vào sku
    const variants = await Variant.find({
      sku_id: sku?._id,
    }).select("-_id -created_at -updated_at");

    // hàm get option value
    const getOptionValues = async (option, id) => {
      const values = await OptionValue.find({
        option_id: id,
      }).select("-_id label value");

      return {
        name: option?.name,
        visual: option.visual,
        options: values,
      };
    };

    // hàm lấy ra các thuộc tính biến thể của 1 sku
    const getOptionValue = async (id) => {
      const value = await OptionValue.findOne({
        _id: id,
      }).select("-_id value label");

      return value;
    };

    // hàm lấy ra options -> visual = color
    const getProductColor = async (array) => {
      const option = options?.find((option) => option?.visual == "color");
      const variant = array?.find(
        (variant) => variant.option_id.toString() == option._id.toString()
      );
      const color = await OptionValue.findOne({
        _id: variant?.option_value_id,
      }).select("-_id value label");

      return color;
    };

    // hàm lấy tất cả các biến thể của sản phẩm
    const getVariants = async (sku, id) => {
      const variants = await Variant.find({
        sku_id: id,
      });

      const color = await getProductColor(variants);

      // lấy ra giá trị biến thể của 1 sku
      const optionValues = await Promise.all(
        variants?.map((item) => getOptionValue(item.option_value_id))
      );

      return {
        ...sku,
        color,
        option_value: optionValues,
      };
    };

    // lấy giá trị của từng thuộc tính
    const data1 = await Promise.all(
      options?.map((option) => getOptionValues(option, option?._id))
    );
    // lấy ra biến tất cả các biến thể
    const data2 = await Promise.all(
      skus?.map((sku) => getVariants(sku.toObject(), sku?._id))
    );
    // lấy ra giá trị biến thể của 1 sku
    const data3 = await Promise.all(
      variants?.map((item) => getOptionValue(item.option_value_id))
    );
    // lấy màu của sản phẩm
    const color = await getProductColor(variants);

    return res.json({
      status: 200,
      message: "Thành công",
      data: {
        ...product.toObject(),
        ...sku.toObject(),
        color,
        variants: data1,
        skus: data2,
        option_value: data3,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function createProduct(req, res, next) {
  try {
    return res.status(201).json({
      status: 201,
      message: "Thành công",
      data: [],
    });
  } catch (error) {
    next(error);
  }
}

export const compeareProduct = async (req, res, next) => {
  try {
    const result = await Product.find({ _id: { $in: req.query._id } }).select(
      "attributes"
    );
    const resultData = result.map((entry) => {
      const resultEntry = {};
      entry.attributes.forEach((attribute) => {
        resultEntry[attribute.group_name] = {};
        attribute.items.forEach((item) => {
          resultEntry[attribute.group_name][item.label] = item.value;
        });
      });
      return resultEntry;
    });
    const mergedData = [];
    const keys = Object.keys(resultData[0]);

    keys.forEach((key) => {
      const mergedObject = {};
      mergedObject[key] = {};
      resultData.forEach((item) => {
        const subObject = item[key];
        for (const subKey in subObject) {
          if (!mergedObject[key][subKey]) {
            mergedObject[key][subKey] = subObject[subKey];
          } else {
            // Nếu đã có giá trị, thì cộng dồn giá trị
            mergedObject[key][subKey] += "- " + subObject[subKey];
          }
        }
      });
      mergedData.push(mergedObject);
    });

    return res.json({
      status: 200,
      message: "So sánh thành công",
      data: mergedData,
    });
  } catch (error) {
    next(error);
  }
};
