import Category from "../models/category.model"
import Brand from "../models/brand.model"
import createError from "http-errors"
import moment from "moment/moment"
import { optionSchema, optionValuesSchema } from "../validations/product.valiations"
import { Product, Option, OptionValue, Sku, Variant } from '../models/product.model'


// controller products
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
			select: ['-assets', '-attributes', '-description', '-specs', '-category_id', '-brand_id', '-deleted', '-deleted_at', '-created_at', '-updated_at']
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

			const optionValue = variant?.map((item) => item?.toObject()?.option_value_id?.label)

			// lấy ra các options
			const options = await Option.find({
				product_id: id,
			});

			// lấy ra option màu
			const option = options?.find((option) => option.name == 'color')
			const colors = await OptionValue.find({
				option_id: option?._id
			}).select('-_id value label')

			return {
				...product?.toObject(),
				...sku?.toObject(),
				image: sku?.image?.url,
				option_value: optionValue,
				colors
			}
		}

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
			_id: sku?.product_id
		})
			.select('-assets._id -attributes._id -attributes.items._id -deleted -deleted_at')

		if (!product || !sku) {
			throw createError.NotFound('Sản phẩm không tồn tại')
		}

		// lấy danh mục sản phẩm
		const category = await Category.findOne({
			_id: product?.category_id
		}).select("_id name slug type")

		// lấy thương hiệu sản phẩm
		const brand = await Brand.findOne({
			_id: product?.brand_id
		}).select("_id name slug")

		// lấy options
		const options = await Option.find({
			product_id: product?._id
		})

		// lấy ra tất skus sản phẩm
		const skus = await Sku.find({
			product_id: product?._id
		}).select('-product_id -assets -created_at -updated_at -deleted -deleted_at')

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
				options: values
			}
		}

		// hàm lấy ra các thuộc tính biến thể của 1 sku
		const getOptionValue = async (id) => {
			const value = await OptionValue.findOne({
				_id: id,
			}).select("-_id value label");

			return value;
		};

		// hàm lấy ra options -> visual = color
		const getProductColor = async (array) => {
			const option = options?.find((option) => option?.name == 'color')
			const variant = array?.find((variant) => variant?.option_id?.toString() == option?._id?.toString())
			const color = await OptionValue.findOne({
				_id: variant?.option_value_id
			}).select('-_id value label')

			return color;
		};

		// hàm lấy tất cả các biến thể của sản phẩm
		const getVariants = async (sku, id) => {
			const variants = await Variant.find({
				sku_id: id,
			});

			const color = await getProductColor(variants);

			// lấy ra giá trị biến thể của 1 sku
			const optionValues = await Promise.all(variants?.map((item) => getOptionValue(item?.option_value_id)))

			return {
				...sku,
				color,
				option_value: optionValues,
			};
		};

		// lấy giá trị của từng thuộc tính
		const data1 = await Promise.all(options?.map((option) => getOptionValues(option, option?._id)))
		// lấy ra biến tất cả các biến thể
		const data2 = await Promise.all(skus?.map((sku) => getVariants(sku.toObject(), sku?._id)))
		// lấy ra giá trị biến thể của 1 sku
		const data3 = await Promise.all(variants?.map((item) => getOptionValue(item?.option_value_id)))
		// lấy màu của sản phẩm
		const color = await getProductColor(variants)

		return res.json({
			status: 200,
			message: 'Thành công',
			data: {
				...product.toObject(),
				...sku.toObject(),
				category_id: undefined,
				brand_id: undefined,
				brand,
				category,
				color,
				variants: data1,
				skus: data2,
				option_value: data3,
			}
		})
	} catch (error) {
		next(error)
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

// controller option_values
export async function getAllOptionValues(req, res, next) {
	try {
		const { product_id, option_id } = req.params
		const product = await Product.findById(product_id)

		if (!product) {
			throw createError.NotFound("Không tìm thấy sản phẩm")
		}

		const optionValues = await OptionValue.find({
			product_id,
			option_id
		}).select("_id label value created_at updated_at")

		return res.json({
			status: 200,
			message: "Thành công",
			data: optionValues
		})

	} catch (error) {
		next(error)
	}
}

export async function getSingleOptionValue(req, res, next) {
	try {
		const { value_id } = req.params
		const optionValue = await OptionValue.findById(value_id).select('_id label value created_at updated_at')

		if (!optionValue) {
			throw createError.NotFound("Option value không tồn tại")
		}

		return res.json({
			status: 200,
			message: "Thành công",
			data: optionValue
		})
	} catch (error) {
		next(error)
	}
}

export async function createOptionValues(req, res, next) {
	try {
		const { product_id, option_id } = req.params
		const payload = {
			...req.body,
			option_id: option_id,
			product_id: product_id
		}
		const { error } = optionValuesSchema.validate(payload, { abortEarly: false });

		if (error) {
			const errors = {};
			error.details.forEach((e) => (errors[e.path] = e.message));
			throw createError.BadRequest(errors);
		}

		const doc = await OptionValue.create(payload)

		return res.status(201).json({
			status: 201,
			message: "Thành công",
			data: doc
		})
	} catch (error) {
		next(error)
	}
}

export async function updateOptionValue(req, res, next) {
	try {
		const payload = req.body
		const { value_id } = req.params
		const { error } = optionValuesSchema.validate(payload, { abortEarly: false });

		if (error) {
			const errors = {};
			error.details.forEach((e) => (errors[e.path] = e.message));
			throw createError.BadRequest(errors);
		}

		const doc = await OptionValue.findOneAndUpdate(
			{ _id: value_id },
			{ ...payload, updated_at: moment(new Date).toISOString() },
			{ new: true }
		)

		return res.json({
			status: 200,
			message: 'Thành công',
			data: doc,
		})
	} catch (error) {
		next(error)
	}
}

export async function deleteOptionValue(req, res, next) {
	try {
		const { value_id } = req.params
		const doc = await OptionValue.findById(value_id)

		if (!doc) {
			throw createError.NotFound('Option value không tồn tại')
		}

		await OptionValue.deleteOne({
			_id: value_id
		})

		return res.json({
			status: 200,
			message: 'Thành công',
			data: doc
		})
	} catch (error) {
		next(error)
	}
}

// controller options
export async function getAllOption(req, res, next) {
	try {
		const { product_id } = req.params
		const options = await Option.find({
			product_id
		}).select("_id name")

		const getOptionValues = async (option, id) => {
			const optionValues = await OptionValue.find({
				option_id: id
			}).select("_id label value")

			return {
				...option,
				option_values: optionValues
			}
		}

		const data = await Promise.all(options?.map((option) => getOptionValues(option.toObject(), option?._id)))

		return res.json({
			status: 200,
			message: 'Thành công',
			data: data
		})

	} catch (error) {
		next(error)
	}
}

export async function getSingleOption(req, res, next) {
	try {
		const { product_id, option_id } = req.params
		const option = await Option.findById(option_id).select("_id name")

		if (!option) {
			throw createError.NotFound('Option không tồn tại')
		}

		const optionValues = await OptionValue.find({
			option_id
		}).select("_id label value")

		return res.json({
			status: 200,
			message: 'Thành công',
			data: {
				...option.toObject(),
				option_values: optionValues
			}
		})

	} catch (error) {
		next(error)
	}
}

export async function createOption(req, res, next) {
	try {
		const { product_id } = req.params

		const payload = {
			...req.body,
			product_id: product_id
		}

		const { error } = optionSchema.validate(payload, { abortEarly: false });

		if (error) {
			const errors = {};
			error.details.forEach((e) => (errors[e.path] = e.message));
			throw createError.BadRequest(errors);
		}

		const doc = await Option.create(payload)

		return res.status(201).json({
			status: 201,
			message: "Thành công",
			data: doc
		})
	} catch (error) {
		next(error)
	}
}

export async function updateOption(req, res, next) {
	try {
		const payload = req.body
		const { option_id } = req.params
		const { error } = optionSchema.validate(payload, { abortEarly: false });

		if (error) {
			const errors = {};
			error.details.forEach((e) => (errors[e.path] = e.message));
			throw createError.BadRequest(errors);
		}

		const option = await Option.findById(option_id)

		if (!option) {
			throw createError.NotFound('Option không tồn tại')
		}

		const doc = await Option.findOneAndUpdate(
			{ _id: option_id },
			{ ...payload, updated_at: moment(new Date).toISOString() },
			{ new: true }
		)

		return res.json({
			status: 200,
			message: "Thành công",
			data: doc
		})
	} catch (error) {
		next(error)
	}
}

export async function deleteOption(req, res, next) {
	try {
		const { option_id } = req.params
		const option = await Option.findById(option_id)

		if (!option) {
			throw createError.NotFound('Option không tồn tại')
		}

		// xóa tất cả option value
		await OptionValue.deleteMany({
			option_id
		})

		await Option.deleteOne({
			_id: option_id
		})

		return res.json({
			status: 200,
			message: "Thành công",
			data: option
		})
	} catch (error) {
		next(error)
	}
}

// controller variants
export async function getAllVariant(req, res, next) {
	try {
		const { product_id } = req.params

		// lấy ra tất cả skus theo product id
		const skus = await Sku.find({
			product_id
		})

		// lấy options
		const options = await Option.find({
			product_id
		})

		// hàm lấy ra các thuộc tính biến thể của 1 sku
		const getOptionValue = async (id) => {
			const value = await OptionValue.findOne({
				_id: id
			}).select('-_id value label')

			return value
		}

		// hàm lấy ra options -> name = color
		const getProductColor = async (array) => {
			const option = options?.find((option) => option?.name == 'color')
			const variant = array?.find((variant) => variant?.option_id?.toString() == option?._id?.toString())
			const color = await OptionValue.findOne({
				_id: variant?.option_value_id
			}).select('-_id value label')

			return color
		}

		// hàm lấy tất cả các biến thể của sản phẩm
		const getVariants = async (sku, id) => {
			const variants = await Variant.find({
				sku_id: id
			})

			const color = await getProductColor(variants)

			// lấy ra giá trị biến thể của 1 sku
			const optionValues = await Promise.all(variants?.map((item) => getOptionValue(item?.option_value_id)))

			return {
				...sku,
				color,
				option_value: optionValues
			}
		}

		const data = await Promise.all(skus?.map((sku) => getVariants(sku.toObject(), sku?._id)))

		return res.json({
			status: 200,
			message: 'Thành công',
			data: data
		})

	} catch (error) {
		next(error)
	}
}

// tự động đăng ký các biến thể dữ vào option và option value
export async function saveVariant(req, res, next) {
	try {
		const { product_id } = req.params

		const product = await Product.findById(product_id)
			.select("name slug shared_url price price_before_discount price_discount_percent")

		// lấy options
		const options = await Option.find({
			product_id
		}).select("_id name")

		// hàm lấy option value
		const getOptionValues = async (option, id) => {
			const optionValues = await OptionValue.find({
				option_id: id
			}).select("_id label value")

			return {
				...option,
				option_values: optionValues
			}
		}

		// tất cả options và option_value dựa vào product_id
		const docs = await Promise.all(options?.map((option) => getOptionValues(option.toObject(), option?._id)))

		// hàm đăng ký các biến thể sản phẩm
		const generateVariant = (input) => {
			if (input.length === 0) return [];

			let result = [[]];

			for (const option of input) {
				const name = option.name;
				const optionId = option._id
				const optionValues = option.option_values;
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
							}
						];
						append.push(newVariant);
					}
				}

				result = append;
			}

			return result;
		}

		const variants = generateVariant(docs)
		// đăng ký tất cả skus dựa vào số lượng biến thể
		const arraySkus = Array(variants?.length).fill({
			...product,
			product_id: product_id,
			stock: 0,
			is_avaiable: true,
			image: {},
			assets: []
		})
		const skus = await Sku.insertMany(arraySkus)

		return res.status(201).json({
			status: 201,
			message: 'Thành công',
			data: skus
		})
	} catch (error) {
		next(error)
	}
}

