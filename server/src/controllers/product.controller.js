import Category from "../models/category.model";
import Brand from "../models/brand.model";
import moment from "moment/moment";
import {
  optionSchema,
  optionValuesSchema,
  productSchema,
  variantSchema,
} from "../validations/product.valiations";
import {
  Product,
  Option,
  OptionValue,
  Sku,
  Variant,
} from "../models/product.model";
import { Demand, DemandValue } from "../models/demand.model";
import { sortOptions } from "../utils/fc";
import createError from "http-errors";
import fetch from "node-fetch";

// so sánh sản phẩm
export async function compareProduct(req, res, next) {
  try {
    const payload = req.body;

    const data = await Promise.all(
      payload?.slugs?.map(async (slug) => {
        const res = await fetch(
          "http://localhost:8080/api" + "/product/" + slug
        );
        const product = await res.json();
        return product?.data;
      })
    );

    const groupMap = new Map();

    for (const item of data) {
      // Duyệt qua mảng attributes trong mỗi item
      for (const attribute of item.attributes) {
        const groupName = attribute.group_name;

        // Nếu group_name chưa tồn tại trong Map, thêm mới
        if (!groupMap.has(groupName)) {
          groupMap.set(groupName, []);
        }

        // Thêm items vào mảng tương ứng với group_name
        const groupItems = groupMap.get(groupName);
        const itemsInGroup = attribute.items.map((item) => ({ ...item })); // Clone items
        groupItems.push(itemsInGroup);
      }
    }

    const resultArray = Array.from(groupMap).map(([groupName, itemsArray]) => {
      const labelMap = new Map();

      // Logic lọc giống nhau và giá trị khác nhau
      itemsArray.forEach((item) => {
        item.forEach(({ label, value }) => {
          if (!labelMap.has(label)) {
            labelMap.set(label, { label, values: [] });
          }

          const labelObject = labelMap.get(label);
          labelObject.values.push(value);
        });
      });

      // Chuyển từ Map thành mảng các đối tượng
      const labelsArray = Array.from(labelMap).map(
        ([label, labelObject]) => labelObject
      );

      return {
        group_name: groupName,
        items: labelsArray,
      };
    });

    return res.json({
      message: "Thành công",
      status: 200,
      data: resultArray,
      abc: data?.map((a) => ({
        attributes: a.attributes,
      })),
    });
  } catch (error) {
    next(error);
  }
}

// controller products
export async function getAllProduct(req, res, next) {
  try {
    const {
      _page = 1,
      _sort = "created_at",
      _order = "desc",
      _limit = 10,
      _keyword = "",
    } = req.query;

    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? -1 : 1,
      },
      select: [
        "-images",
        "-seo",
        "-attributes",
        "-description",
        "-specs",
        "-category_id",
        "-brand_id",
        "-deleted",
        "-deleted_at",
        "-created_at",
        "-updated_at",
      ],
    };
    const conditions = {};
    if (_keyword) {
      conditions.$or = [
        { name: { $regex: new RegExp(_keyword, "i") } },
        { SKU: { $regex: new RegExp(_keyword, "i") } },
      ];
    }
    conditions.status = true;

    const { docs, ...paginate } = await Product.paginate(conditions, options);

    // hàm lấy ra các 1 sku của một sản phẩm
    const getSku = async (product, id) => {
      const sku = await Sku.findOne({
        product_id: id,
      }).select("-assets -stock -created_at -updated_at");

      // lấy ra biến thể của sku
      const variants = await Variant.find({
        sku_id: sku?._id,
      });

      // lấy ra option value
      let optionsFilter = await Promise.all(
        variants?.map(async (item) => {
          const optionFind = await Option.findOne({
            _id: item?.option_id,
          });

          return {
            ...item.toObject(),
            name: optionFind?.name,
          };
        })
      );
      optionsFilter = sortOptions(optionsFilter);

      const optionValue = await Promise.all(
        optionsFilter?.map(async (item) => {
          const doc = await OptionValue.findOne({
            _id: item?.option_value_id,
          });

          return doc?.label;
        })
      );

      // lấy ra các options
      const options = await Option.find({
        product_id: id,
      });

      // lấy ra option màu
      const option = options?.find(
        (option) => option.name == "color" || option.name == "mau"
      );
      const colors = await OptionValue.find({
        option_id: option?._id,
      }).select("-_id value label");

      return {
        ...product?.toObject(),
        ...sku?.toObject(),
        image: sku?.image?.url,
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

export async function getAllProductManager(req, res, next) {
  try {
    const {
      _page = 1,
      _sort = "created_at",
      _order = "desc",
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
        "-deleted",
        "-deleted_at",
        "-created_at",
        "-updated_at",
      ],
    };

    const { docs, ...paginate } = await Product.paginate({}, options);

    // hàm lấy ra các 1 sku của một sản phẩm
    const getSku = async (product, id) => {
      const brand = await Brand.findOne({
        _id: product?.brand_id,
      });

      const category = await Category.findOne({
        _id: product?.category_id,
      });

      // lấy ra các options
      const options = await Option.find({
        product_id: id,
      });

      // lấy ra option màu
      const option = options?.find(
        (option) => option.name == "mau" || option.name == "color"
      );
      const colors = await OptionValue.find({
        option_id: option?._id,
      }).select("-_id value label");

      return {
        ...product?.toObject(),
        brand_id: undefined,
        category_id: undefined,
        images: undefined,
        image: product?.images[0]?.url,
        brand: brand?.name,
        category: category?.name,
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
    }).select(
      "-images -attributes._id -attributes.items._id -deleted -deleted_at"
    );

    if (!product && !sku) {
      throw createError.NotFound("Sản phẩm không tồn tại");
    }

    // lấy ra thang đánh giá nhu cầu
    const demandValues = await DemandValue.find({
      product_id: product?._id,
    });

    const demands = await Promise.all(
      demandValues?.map(async (item) => {
        const doc = await Demand.findById(item?.demand_id);

        return {
          name: doc?.name,
          point: item?.point,
          slug: doc?.slug,
        };
      })
    );

    // lấy danh mục sản phẩm
    const category = await Category.findOne({
      _id: product?.category_id,
    }).select("_id name slug type");

    // lấy thương hiệu sản phẩm
    const brand = await Brand.findOne({
      _id: product?.brand_id,
    }).select("_id name slug shared_url description thumbnail");

    // lấy options
    let options = await Option.find({
      product_id: product?._id,
    });

    options = sortOptions(options);

    // lấy ra tất skus sản phẩm
    const skus = await Sku.find({
      product_id: product?._id,
    }).select(
      "-product_id -assets -created_at -updated_at -deleted -deleted_at"
    );

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
      const option = options?.find(
        (option) => option?.name == "color" || option?.name == "mau"
      );
      const variant = array?.find(
        (variant) => variant?.option_id?.toString() == option?._id?.toString()
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
      const optionFilter = await Promise.all(
        variants?.map(async (item) => {
          const optionFind = await Option.findOne({
            _id: item?.option_id,
          });

          return {
            ...item.toObject(),
            name: optionFind?.name,
            label: optionFind?.label,
            position: optionFind?.position,
          };
        })
      );

      const optionsFilter = sortOptions(optionFilter);
      const optionValues = await Promise.all(
        optionsFilter?.map((doc) => getOptionValue(doc?.option_value_id))
      );

      return {
        ...sku.toObject(),
        color,
        option_value: optionValues,
      };
    };

    let optionsFilter = await Promise.all(
      variants?.map(async (item) => {
        const optionFind = await Option.findOne({
          _id: item?.option_id,
        });

        return {
          ...item.toObject(),
          name: optionFind?.name,
          label: optionFind?.label,
          position: optionFind?.position,
        };
      })
    );

    optionsFilter = sortOptions(optionsFilter);

    // lấy giá trị của từng thuộc tính
    const data1 = await Promise.all(
      options?.map((option) => getOptionValues(option, option?._id))
    );
    // lấy ra biến tất cả các biến thể
    const data2 = await Promise.all(
      skus?.map((sku) => getVariants(sku, sku?._id))
    );
    // lấy ra giá trị biến thể của 1 sku
    const data3 = await Promise.all(
      optionsFilter?.map(
        async (item) => await getOptionValue(item?.option_value_id)
      )
    );
    // lấy màu của sản phẩm
    const color = await getProductColor(variants);

    // lấy ra sản phẩm liên quan
    const relateDproducts = await Product.find({
      _id: { $ne: product?._id },
      category_id: category?._id,
      status: true,
    })
      .limit(20)
      .select(
        "-images -seo -attributes -description -category_id -brand_id -deleted -deleted_at -created_at -updated_at"
      )
      .sort("created_at");

    const getSku = async (product, id) => {
      const sku = await Sku.findOne({
        product_id: id,
      }).select("-assets -stock -created_at -updated_at");

      // lấy ra biến thể của sku
      const variants = await Variant.find({
        sku_id: sku?._id,
      });

      // lấy ra option value
      let optionsFilter = await Promise.all(
        variants?.map(async (item) => {
          const optionFind = await Option.findOne({
            _id: item?.option_id,
          });

          return {
            ...item.toObject(),
            name: optionFind?.name,
          };
        })
      );
      optionsFilter = sortOptions(optionsFilter);

      const optionValue = await Promise.all(
        optionsFilter?.map(async (item) => {
          const doc = await OptionValue.findOne({
            _id: item?.option_value_id,
          });

          return doc?.label;
        })
      );

      // lấy ra các options
      const options = await Option.find({
        product_id: id,
      });

      // lấy ra option màu
      const option = options?.find(
        (option) => option.name == "color" || option.name == "mau"
      );
      const colors = await OptionValue.find({
        option_id: option?._id,
      }).select("-_id value label");

      return {
        ...product?.toObject(),
        ...sku?.toObject(),
        image: sku?.image?.url,
        option_value: optionValue,
        colors,
      };
    };

    const products = await Promise.all(
      relateDproducts?.map((item) => getSku(item, item?._id))
    );

    return res.json({
      status: 200,
      message: "Thành công",
      data: {
        ...product.toObject(),
        ...sku.toObject(),
        category_id: undefined,
        brand_id: undefined,
        brand,
        category,
        demands,
        color,
        option_value: data3,
        variants: data1,
        skus: data2,
        related_products: products,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getProductById(req, res, next) {
  try {
    const { id } = req?.params;

    const product = await Product.findOne({
      _id: id,
    }).select(
      "-attributes._id -attributes.items._id -images._id -deleted -deleted_at"
    );

    if (!product) {
      throw createError.NotFound("Sản phẩm không tồn tại");
    }

    // lấy ra thang đánh giá nhu cầu
    const demandValues = await DemandValue.find({
      product_id: product?._id,
    });

    const demands = await Promise.all(
      demandValues?.map(async (item) => {
        const doc = await Demand.findById(item?.demand_id);

        return {
          _id: item?._id,
          name: doc?.name,
          point: item?.point,
          slug: doc?.slug,
          product_id: item?.product_id,
          demand_id: item?.demand_id,
          created_at: item?.created_at,
        };
      })
    );

    // lấy danh mục sản phẩm
    const category = await Category.findOne({
      _id: product?.category_id,
    }).select("_id name slug type");

    // lấy thương hiệu sản phẩm
    const brand = await Brand.findOne({
      _id: product?.brand_id,
    }).select("_id name slug");

    // lấy options
    const options = await Option.find({
      product_id: id,
    });

    const getOptionValues = async (option, id) => {
      let optionValues = await OptionValue.find({
        option_id: id,
      }).select("_id label value");

      optionValues = optionValues?.map((optionValue) => {
        return {
          option_value_id: optionValue?._id,
          label: optionValue?.label,
          value: optionValue?.value,
        };
      });

      option._id = undefined;

      return {
        name: {
          value: option?.name,
          label: option?.label,
        },
        position: option?.position,
        option_id: id,
        options: optionValues,
      };
    };

    const optionsSort = sortOptions(options);

    const variants = await Promise.all(
      optionsSort?.map((option) =>
        getOptionValues(option.toObject(), option?._id)
      )
    );

    return res.json({
      status: 200,
      message: "Thành công",
      data: {
        ...product.toObject(),
        category_id: undefined,
        brand_id: undefined,
        brand,
        category,
        demands,
        variants: variants,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function createProduct(req, res, next) {
  try {
    const body = req.body;
    const { error } = productSchema.validate(body, { abortEarly: false });

    if (error) {
      const errors = {};
      error.details.forEach((e) => (errors[e.path] = e.message));
      throw createError.BadRequest(errors);
    }

    const { variants, demands, ...payload } = body;
    const product = await Product.create(payload);

    // nhu cầu
    await Promise.all(
      demands?.map(async (demand) => {
        await DemandValue.create({
          product_id: product?._id,
          point: Number(demand?.point),
          demand_id: demand?._id,
        });
      })
    );

    const result = await Promise.all(
      variants?.map(async (variant) => {
        const option = await Option.create({
          label: variant?.name?.label,
          position: variant?.position,
          product_id: product?._id,
        });

        const optionValue = await Promise.all(
          variant?.options?.map(async (item) => {
            const doc = await OptionValue.create({
              ...item,
              option_id: option?._id,
              product_id: product?._id,
            });
          })
        );

        return option;
      })
    );

    return res.status(201).json({
      status: 201,
      message: "Thành công",
      data: {
        product: product,
        options: result,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const { id } = req?.params;
    const body = req.body;
    const { error } = productSchema.validate(body, { abortEarly: false });

    if (error) {
      const errors = {};
      error.details.forEach((e) => (errors[e.path] = e.message));
      throw createError.BadRequest(errors);
    }

    const { variants, demands, ...payload } = body;

    const doc = await Product.findOneAndUpdate(
      { _id: id },
      { ...payload, updated_at: moment(new Date()).toISOString() },
      { new: true }
    );

    console.log("demands", demands);

    // cập nhật đánh giá nhu cầu
    await Promise.all(
      demands?.map(async (demand) => {
        const { _id: demandValueID, name, slug, ...demandValue } = demand;

        await DemandValue.findOneAndUpdate(
          {
            _id: demandValueID,
          },
          {
            ...demandValue,
            point: Number(demandValue?.point),
            updated_at: moment(new Date()).toISOString(),
          },
          { new: true }
        );
      })
    );

    // cập nhật options và option value
    await Promise.all(
      variants?.map(async (variant) => {
        const optionID = variant?.option_id;
        // thêm mới option và option value
        if (!optionID) {
          const option = await Option.create({
            label: variant?.name?.label,
            position: variant?.position,
            product_id: id,
          });

          await Promise.all(
            variant?.options?.map(async (item) => {
              await OptionValue.create({
                ...item,
                option_id: option?._id,
                product_id: id,
              });
            })
          );

          return option;
        } else {
          // thêm mới option và option value
          const position = variant?.position;
          await Option.findOneAndUpdate(
            { _id: optionID },
            {
              position: position,
              created_at: moment(new Date()).toISOString(),
              updated_at: moment(new Date()).toISOString(),
            },
            { new: true }
          );

          // await Promise.all(variant?.options?.map(async (item) => {
          //   const optionValueID = item?.option_value_id

          //   await OptionValue.findOneAndUpdate(
          //     { _id: optionValueID },
          //     { ...payload, created_at: moment(new Date()).toISOString(), updated_at: moment(new Date()).toISOString() },
          //     { new: true }
          //   );
          // }))

          // return option
        }
      })
    );

    return res.status(200).json({
      status: 200,
      message: "Thành công",
      data: doc,
    });
  } catch (error) {
    next(error);
  }
}

// controller option_values
export async function getAllOptionValues(req, res, next) {
  try {
    const { product_id, option_id } = req.params;
    const product = await Product.findById(product_id);

    if (!product) {
      throw createError.NotFound("Không tìm thấy sản phẩm");
    }

    const optionValues = await OptionValue.find({
      product_id,
      option_id,
    }).select("_id label value created_at updated_at");

    return res.json({
      status: 200,
      message: "Thành công",
      data: optionValues,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSingleOptionValue(req, res, next) {
  try {
    const { value_id } = req.params;
    const optionValue = await OptionValue.findById(value_id).select(
      "_id label value created_at updated_at"
    );

    if (!optionValue) {
      throw createError.NotFound("Option value không tồn tại");
    }

    return res.json({
      status: 200,
      message: "Thành công",
      data: optionValue,
    });
  } catch (error) {
    next(error);
  }
}

export async function createOptionValues(req, res, next) {
  try {
    const { product_id, option_id } = req.params;
    const payload = {
      ...req.body,
      option_id: option_id,
      product_id: product_id,
    };
    const { error } = optionValuesSchema.validate(payload, {
      abortEarly: false,
    });

    if (error) {
      const errors = {};
      error.details.forEach((e) => (errors[e.path] = e.message));
      throw createError.BadRequest(errors);
    }

    const doc = await OptionValue.create(payload);

    return res.status(201).json({
      status: 201,
      message: "Thành công",
      data: doc,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateOptionValue(req, res, next) {
  try {
    const payload = req.body;
    const { value_id } = req.params;
    const { error } = optionValuesSchema.validate(payload, {
      abortEarly: false,
    });

    if (error) {
      const errors = {};
      error.details.forEach((e) => (errors[e.path] = e.message));
      throw createError.BadRequest(errors);
    }

    const doc = await OptionValue.findOneAndUpdate(
      { _id: value_id },
      { ...payload, updated_at: moment(new Date()).toISOString() },
      { new: true }
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

export async function deleteOptionValue(req, res, next) {
  try {
    const { value_id } = req.params;
    const doc = await OptionValue.findById(value_id);

    if (!doc) {
      throw createError.NotFound("Option value không tồn tại");
    }

    await OptionValue.deleteOne({
      _id: value_id,
    });

    return res.json({
      status: 200,
      message: "Thành công",
      data: doc,
    });
  } catch (error) {
    next(error);
  }
}

// controller options
export async function getAllOption(req, res, next) {
  try {
    const { product_id } = req.params;
    const options = await Option.find({
      product_id,
    });

    const getOptionValues = async (option, id) => {
      let optionValues = await OptionValue.find({
        option_id: id,
      }).select("_id label value");

      optionValues = optionValues?.map((optionValue) => {
        return {
          option_value_id: optionValue?._id,
          label: optionValue?.label,
          value: optionValue?.value,
        };
      });

      return {
        value: option?.name,
        label: option?.label,
        position: option?.position,
        option_id: id,
        option_values: optionValues,
      };
    };

    const optionsSort = sortOptions(options);

    const data = await Promise.all(
      optionsSort?.map((option) =>
        getOptionValues(option.toObject(), option?._id)
      )
    );

    return res.json({
      status: 200,
      message: "Thành công",
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSingleOption(req, res, next) {
  try {
    const { product_id, option_id } = req.params;
    const option = await Option.findById(option_id).select("_id name");

    if (!option) {
      throw createError.NotFound("Option không tồn tại");
    }

    const optionValues = await OptionValue.find({
      option_id,
    }).select("_id label value");

    return res.json({
      status: 200,
      message: "Thành công",
      data: {
        ...option.toObject(),
        option_values: optionValues,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function createOption(req, res, next) {
  try {
    const { product_id } = req.params;

    const payload = {
      ...req.body,
      product_id: product_id,
    };

    const { error } = optionSchema.validate(payload, { abortEarly: false });

    if (error) {
      const errors = {};
      error.details.forEach((e) => (errors[e.path] = e.message));
      throw createError.BadRequest(errors);
    }

    const doc = await Option.create(payload);

    return res.status(201).json({
      status: 201,
      message: "Thành công",
      data: doc,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateOption(req, res, next) {
  try {
    const payload = req.body;
    const { option_id } = req.params;
    const { error } = optionSchema.validate(payload, { abortEarly: false });

    if (error) {
      const errors = {};
      error.details.forEach((e) => (errors[e.path] = e.message));
      throw createError.BadRequest(errors);
    }

    const option = await Option.findById(option_id);

    if (!option) {
      throw createError.NotFound("Option không tồn tại");
    }

    const doc = await Option.findOneAndUpdate(
      { _id: option_id },
      { ...payload, updated_at: moment(new Date()).toISOString() },
      { new: true }
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

export async function deleteOption(req, res, next) {
  try {
    const { option_id } = req.params;
    const option = await Option.findById(option_id);

    if (!option) {
      throw createError.NotFound("Option không tồn tại");
    }

    // xóa tất cả option value
    await OptionValue.deleteMany({
      option_id,
    });

    await Option.deleteOne({
      _id: option_id,
    });

    return res.json({
      status: 200,
      message: "Thành công",
      data: option,
    });
  } catch (error) {
    next(error);
  }
}

// controller variants
export async function getAllVariant(req, res, next) {
  try {
    const { product_id } = req.params;

    // lấy ra tất cả skus theo product id
    const skus = await Sku.find({
      product_id,
    });

    // lấy options
    const options = await Option.find({
      product_id,
    });

    // hàm lấy ra các thuộc tính biến thể của 1 sku
    const getOptionValue = async (id) => {
      const value = await OptionValue.findOne({
        _id: id,
      }).select("-_id value label");

      return value;
    };

    // hàm lấy ra options -> name = color
    const getProductColor = async (array) => {
      const option = options?.find(
        (option) => option?.name == "color" || option?.name == "mau"
      );
      const variant = array?.find(
        (variant) => variant?.option_id?.toString() == option?._id?.toString()
      );

      const color = await OptionValue.findOne({
        _id: variant?.option_value_id,
      }).select("-_id value label");

      return color;
    };

    // hàm lấy tất cả các biến thể của sản phẩm
    // hàm lấy tất cả các biến thể của sản phẩm
    const getVariants = async (sku, id) => {
      const variants = await Variant.find({
        sku_id: id,
      });

      const color = await getProductColor(variants);
      // lấy ra giá trị biến thể của 1 sku
      const optionFilter = await Promise.all(
        variants?.map(async (item) => {
          const optionFind = await Option.findOne({
            _id: item?.option_id,
          });

          return {
            ...item.toObject(),
            name: optionFind?.name,
            position: optionFind?.position,
          };
        })
      );

      const optionsFilter = sortOptions(optionFilter);
      const optionValues = await Promise.all(
        optionsFilter?.map((doc) => getOptionValue(doc?.option_value_id))
      );

      return {
        ...sku,
        color,
        option_value: optionValues,
      };
    };

    const data = await Promise.all(
      skus?.map((sku) => getVariants(sku.toObject(), sku?._id))
    );

    return res.json({
      status: 200,
      message: "Thành công",
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

// tự động đăng ký các biến thể dữ vào option và option value
export async function saveVariant(req, res, next) {
  try {
    const { product_id } = req.params;

    const product = await Product.findById(product_id).select(
      "-_id name SKU slug shared_url price price_before_discount price_discount_percent"
    );

    // Xóa tất cả sku trước khi đăng ký
    // + TH1: khi thêm bớt options -> tính toán lại biến thể
    // + TH2: khi thêm bớt options value -> tính toán lại biến thể
    await Variant.deleteMany({
      product_id,
    });

    await Sku.deleteMany({
      product_id,
    });

    // lấy options
    const options = await Option.find({
      product_id,
    }).select("_id name");

    // hàm lấy option value
    const getOptionValues = async (option, id) => {
      const optionValues = await OptionValue.find({
        option_id: id,
      }).select("_id label value");

      return {
        ...option,
        option_values: optionValues,
      };
    };

    // tất cả options và option_value dựa vào product_id
    const docs = await Promise.all(
      options?.map((option) => getOptionValues(option.toObject(), option?._id))
    );

    // hàm đăng ký các biến thể sản phẩm
    const generateVariant = (input) => {
      if (input.length === 0) return [];

      let result = [[]];

      for (const option of input) {
        const name = option.name;
        const optionId = option._id;
        const optionValues = option.option_values;

        if (optionValues.length === 0) continue;

        const append = [];

        for (const valueObj of optionValues) {
          const optionValueId = valueObj._id;
          const label = valueObj.label;
          const value = valueObj.value;
          for (const data of result) {
            const newVariant = [
              ...data,
              {
                name: name,
                label: label,
                value: value,
                option_id: optionId,
                option_value_id: optionValueId,
              },
            ];
            append.push(newVariant);
          }
        }

        result = append;
      }

      return result;
    };

    const variants = generateVariant(docs);
    // đăng ký tất cả skus dựa vào số lượng biến thể
    const arraySkus = Array(variants?.length).fill({
      ...product.toObject(),
      product_id: product_id,
      stock: 0,
      assets: [],
    });

    // insert tất cả skus đã đăng ký vào db
    const skus = await Promise.all(
      arraySkus?.map((item, index) =>
        Sku.create({
          ...item,
          image: {},
          SKU: `${item?.SKU}-${index + 1}`,
        })
      )
    );

    // hàm đăng ký các variant options
    const variantOptions = (variants, skus) => {
      let result = [];

      for (let index in skus) {
        for (let optionValue of variants[index]) {
          result.push({
            product_id,
            name: optionValue.name,
            label: optionValue.label,
            sku_id: skus[index]._id,
            option_id: optionValue.option_id,
            option_value_id: optionValue.option_value_id,
          });
        }
      }
      return result;
    };

    const data = variantOptions(variants, skus);
    // insert tất cả các biến thế đã đăng ký vào db
    const data1 = await Promise.all(data?.map((item) => Variant.create(item)));

    return res.status(201).json({
      status: 201,
      message: "Thành công",
      data: data1,
    });
  } catch (error) {
    next(error);
  }
}

export async function deteleVariant(req, res, next) {
  try {
    const { product_id, sku_id } = req.params;
    const sku = await Sku.findById(sku_id);

    if (!sku) {
      throw createError.NotFound("Biến thể sản phẩm không tồn tại");
    }

    // lấy ra biến thể nằm trong bảng variants
    const variants = await Variant.find({
      sku_id,
    });

    // xóa mềm các bảng ghi trong variants và skus
    await sku.delete();
    sku.deleted_at = moment(new Date()).toISOString();
    await sku.save();

    await Promise.all(
      variants.map(async (variant) => {
        await variant.delete();
        variant.deleted_at = moment(new Date()).toISOString();
        await variant.save();
      })
    );

    return res.json({
      status: 200,
      message: "Thành công",
      data: variants,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSingleVariant(req, res, next) {
  try {
    const { product_id, sku_id } = req.params;

    const sku = await Sku.findOne({
      _id: sku_id,
    }).select("-deleted -deleted_at -created_at -updated_at");

    const variants = await Variant.find({
      sku_id: sku_id,
    }).select("-deleted -deleted_at -created_at -updated_at");

    const options = await Promise.all(
      variants?.map(async (variant) => {
        const option = await Option.findOne({
          _id: variant?.option_id,
        });

        const optionValue = await OptionValue.findOne({
          _id: variant?.option_value_id,
        });

        return {
          _id: option?._id,
          label: option?.label,
          name: option?.name,
          position: option?.position,
          option_value: {
            _id: optionValue?._id,
            label: optionValue?.label,
            value: optionValue?.value,
          },
        };
      })
    );

    const optionSort = sortOptions(options);

    return res.json({
      status: 200,
      message: "Thành công",
      data: {
        ...sku.toObject(),
        options: optionSort,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateVariant(req, res, next) {
  try {
    const { sku_id } = req?.params;
    const body = req.body;
    const { error } = variantSchema.validate(body, { abortEarly: false });

    if (error) {
      const errors = {};
      error.details.forEach((e) => (errors[e.path] = e.message));
      throw createError.BadRequest(errors);
    }

    const { options, ...payload } = body;

    const doc = await Sku.findOneAndUpdate(
      { _id: sku_id },
      { ...payload, updated_at: moment(new Date()).toISOString() },
      { new: true }
    );

    // cập nhật options và option value
    await Promise.all(
      options?.map(async (option) => {
        const optionID = option?._id;
        const optionValueID = option?.option_value?._id;

        const optionPayload = {
          label: option?.label,
          name: option?.name,
          position: option?.position,
        };

        const optionValuePayload = {
          label: option?.option_value?.label,
          value: option?.option_value?.value,
        };

        // thêm mới option và option value
        await Option.findOneAndUpdate(
          { _id: optionID },
          {
            ...optionPayload,
            updated_at: moment(new Date()).toISOString(),
          },
          { new: true }
        );

        await OptionValue.findOneAndUpdate(
          { _id: optionValueID },
          {
            ...optionValuePayload,
            updated_at: moment(new Date()).toISOString(),
          },
          { new: true }
        );
      })
    );

    return res.status(200).json({
      status: 200,
      message: "Thành công",
      data: doc,
    });
  } catch (error) {
    next(error);
  }
}
