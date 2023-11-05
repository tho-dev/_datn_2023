import { Promotion, PromotionValue } from "../models/promotion.model"
import { promotionSchema, promotionValueSchema } from "../validations/promotion"
import createError from "http-errors"
import { Product, Sku, Variant, Option, OptionValue } from "../models/product.model"
import { sortOptions } from "../utils/fc"

export async function getAllPromotion(req, res, next) {
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
			select: ['-deleted', '-deleted_at']
		};

		const { docs, ...paginate } = await Promotion.paginate({}, options);

		return res.json({
			status: 200,
			message: 'Thành công',
			data: {
				items: docs,
				paginate
			},
		})
	} catch (error) {
		next(error)
	}
}

export async function getPromtionDetail(req, res, next) {
	try {
		const { slug } = req.query

		const promotion = await Promotion.findOne({
			slug: slug
		}).select('-deleted -deleted_at -created_at -updated_at')

		const promotionValues = await PromotionValue.find({
			promotion_id: promotion?._id
		})

		const getSku = async (id) => {
			const sku = await Sku.findOne({
				_id: id,
			}).select("-assets -stock -created_at -updated_at");

			// lấy ra biến thể của sku
			const variants = await Variant.find({
				sku_id: sku?._id,
			});

			// lấy ra option value
			let optionsFilter = await Promise.all(variants?.map(async (item) => {
				const optionFind = await Option.findOne({
					_id: item?.option_id
				})

				return {
					...item.toObject(),
					name: optionFind?.name
				}
			}))
			optionsFilter = sortOptions(optionsFilter)

			const optionValue = await Promise.all(optionsFilter?.map(async (item) => {
				const doc = await OptionValue.findOne({
					_id: item?.option_value_id
				})

				return doc?.label
			}))


			// lấy ra các options
			const options = await Option.find({
				product_id: sku?.product_id,
			});

			// lấy ra option màu
			const option = options?.find((option) => option.name == "color" || option.name == "mau");
			const colors = await OptionValue.find({
				option_id: option?._id,
			}).select("-_id value label");

			return {
				...sku?.toObject(),
				image: sku?.image?.url,
				option_value: optionValue,
				colors,
			};
		};

		const productItems = await Promise.all(promotionValues?.map((item) => getSku(item?.sku_id)))

		return res.json({
			status: 200,
			message: 'Thành công',
			data: {
				...promotion.toObject(),
				product_items: productItems
			}
		})
	} catch (error) {
		next(error)
	}
}

export async function createPromotion(req, res, next) {
	try {
		const payload = req.body;
		const { error } = promotionSchema.validate(payload, { abortEarly: false });

		if (error) {
			const errors = error.details.map((items) => items.message);
			throw createError.BadRequest(errors)
		}

		const { items, ...body } = payload

		const skus = await Sku.find({
			_id: {
				$in: items
			}
		})

		// lấy sku có price nhỏ nhất
		const skuMinPrice = await Sku.find({
			_id: {
				$in: items
			}
		}).sort({
			price: 1
		})

		// lấy sku có price_discount_percent lớn nhất 
		const skuMaxPersent = await Sku.find({
			_id: {
				$in: items
			}
		}).sort({
			price_discount_percent: -1
		})

		// tạo promotion
		const promotion = await Promotion.create({
			...body,
			max_percent: skuMaxPersent?.[0]?.price_discount_percent,
			min_sale_price: skuMinPrice?.[0]?.price
		})

		// // tạo promotion value 
		await Promise.all((skus?.map(async (sku) => {
			await PromotionValue.create({
				sku_id: sku?._id,
				promotion_id: promotion?._id,
				product_id: sku?.product_id,
			})
		})))


		return res.json({
			status: 201,
			messsage: 'Thành công',
			// data: promotion
		})
	} catch (error) {
		next(error)
	}
}

export async function updatePromotion(req, res, next) {
	try {
		const { id } = req.params
		const payload = req.body;
		const { error } = promotionSchema.validate(payload, { abortEarly: false });

		if (error) {
			const errors = error.details.map((items) => items.message);
			throw createError.BadRequest(errors)
		}

		const { items, ...body } = payload

		const skus = await Sku.find({
			_id: {
				$in: items
			}
		})

		// lấy sku có price nhỏ nhất
		const skuMinPrice = await Sku.find({
			_id: {
				$in: items
			}
		}).sort({
			price: 1
		})

		// lấy sku có price_discount_percent lớn nhất 
		const skuMaxPersent = await Sku.find({
			_id: {
				$in: items
			}
		}).sort({
			price_discount_percent: -1
		})

		// tạo promotion
		const promotion = await Promotion.create({
			...body,
			max_percent: skuMaxPersent?.[0]?.price_discount_percent,
			min_sale_price: skuMinPrice?.[0]?.price
		})

		// // tạo promotion value 
		await Promise.all((skus?.map(async (sku) => {
			await PromotionValue.create({
				sku_id: sku?._id,
				promotion_id: promotion?._id,
				product_id: sku?.product_id,
			})
		})))


		return res.json({
			status: 201,
			messsage: 'Thành công',
			// data: promotion
		})
	} catch (error) {
		next(error)
	}
}