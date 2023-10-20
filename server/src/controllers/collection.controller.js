import Category from "../models/category.model"
import Brand from "../models/brand.model"
import { Product, Option, OptionValue, Sku, Variant } from "../models/product.model"
import { Demand } from "../models/demand.model"
import createError from "http-errors"

// Hàm đệ quy để xây dựng danh sách thương hiệu con (sub_brands)
// function nestedBrands(input, parentId) {
// 	const output = [];
// 	let brands = null;

// 	if (parentId) {
// 		brands = input.filter((brand) => String(brand.parent_id) == String(parentId));
// 	} else {
// 		brands = input.filter((brand) => !brand.parent_id);
// 	}

// 	for (let brand of brands) {
// 		output.push({
// 			_id: brand?._id,
// 			parent_id: parentId,
// 			name: brand?.name,
// 			slug: brand?.slug,
// 			shared_url: brand?.shared_url,
// 			thumbnail: brand?.thumbnail.url,
// 			description: brand?.description,
// 			children: nestedBrands(input, brand?._id).length == 0 ? undefined : nestedBrands(input, brand?._id),
// 		});
// 	}

// 	return output;
// }

// function nestedCategories(input, parent_id) {
// 	const output = [];
// 	let brands = null;

// 	if (parent_id) {
// 		brands = input.filter((brand) => String(brand.parent_id) == String(parent_id));
// 	} else {
// 		brands = input.filter((brand) => brand.parent_id == parent_id);
// 	}

// 	for (let brand of brands) {
// 		output.push({
// 			_id: brand?._id,
// 			parent_id: parent_id,
// 			name: brand?.name,
// 			slug: brand?.slug,
// 			thumbnail: brand?.thumbnail?.url,
// 			description: brand?.description,
// 			children: nestedCategories(input, brand?._id).length == 0 ? undefined : nestedCategories(input, brand._id)
// 		});
// 	}

// 	return output;
// }

export async function filterBrandAndCategory(req, res, next) {
	try {
		const { _slug } = req.query
		let data = null

		let category = await Category.findOne({
			slug: _slug
		}).select("-deleted -deleted_at -thumbnail.id -created_at -updated_at")

		let brand = await Brand.findOne({
			shared_url: _slug
		}).select("-deleted -deleted_at -thumbnail.id -created_at -updated_at")

		if (!brand && !category) {
			throw createError.NotFound('Không có dữ liệu')
		}

		// tính bộ lọc khoảng giá
		const generateDynamicPriceOptions = (minPrice, maxPrice) => {
			const calculateStepSize = (maxPrice) => {
				if (maxPrice <= 4000000) {
					return 500000;
				} else if (maxPrice <= 6000000) {
					return 1000000;
				} else if (maxPrice <= 15000000) {
					return 2000000;
				} else if (maxPrice <= 70000000) {
					return 10000000;
				} else {
					return 5000000;
				}
			}

			const priceOptions = [];
			const stepSize = calculateStepSize(maxPrice);
			minPrice = Math.ceil(minPrice / stepSize) * stepSize;

			priceOptions.push({
				label: `Dưới ${minPrice / 1000000} triệu`,
				value: `duoi-${minPrice}`
			});

			const numOptions = Math.min(7, 6 + Math.ceil((maxPrice - minPrice) / stepSize));

			for (let i = 0; i < numOptions - 1; i++) {
				const startPrice = minPrice + i * stepSize;
				const endPrice = startPrice + stepSize;
				priceOptions.push({
					label: `Từ ${startPrice / 1000000} đến ${endPrice / 1000000} triệu`,
					value: `tu-${startPrice}-den-${endPrice}`
				});
			}

			// Tùy chọn cuối cùng là "Trên" giá của lần cộng cuối cùng
			const lastStartPrice = minPrice + (numOptions - 2) * stepSize;
			const lastOptionLabel = `Trên ${lastStartPrice / 1000000} triệu`;
			const lastOptionValue = `tren-${lastStartPrice}`;
			priceOptions.push({
				label: lastOptionLabel,
				value: lastOptionValue
			});

			return priceOptions;
		}


		if (category) {
			const { thumbnail, ...ass } = category?.toObject()
			// lấy ra brand thuộc danh mục nhưng là danh mục cha
			const doc = await Brand.find({
				category_id: category?._id,
				parent_id: {
					$eq: null
				}
			}).select("-deleted -deleted_at -created_at -updated_at -category_id -parent_id")

			const children = await Category.find({
				["parent_id"]: category?.parent_id || category?._id
			}).select("-deleted -deleted_at -created_at -updated_at")

			// lấy sản phẩm theo danh mục 
			const products = await Product?.find({
				$and: [
					{ category_id: category?._id },
					{ price_before_discount: { $exists: true } } // Chỉ lấy các sản phẩm có giá trước khi giảm giá
				]
			}).sort({
				price: 1
			}).select('name price price_before_discount');

			const minPrice = products[0]?.price
			const maxPrice = products[products?.length - 1]?.price
			let optionFilterPrice = generateDynamicPriceOptions(minPrice, maxPrice)
			optionFilterPrice = {
				name: 'gia',
				type: 'checkbox',
				label: 'Khoảng giá',
				options: optionFilterPrice
			}

			// bộ lọc khuyến mãi
			const promotionFilter = {
				name: "khuyen-mai",
				type: "switch",
				label: "Có khuyến mại",
				options: [
					{
						"label": "Có",
						"value": "co"
					}
				]
			}

			// bộ lọc thương hiệu
			const brandFilter = {
				name: "thuong-hieu",
				type: "checkbox",
				label: "Thương hiệu",
				options: doc?.map((item) => ({
					label: item?.name,
					value: item?.slug
				}))
			}

			// bộ lọc nhu cầu chỉ danh cho laptop
			let demandFilter = undefined
			if (category?.slug == 'laptop') {
				const demands = await Demand.find({})

				demandFilter = {
					name: "nhu-cau",
					type: "checkbox",
					label: "Nhu cầu",
					options: demands?.map((item) => ({
						label: item?.name,
						value: item?.slug
					}))
				}
			}




			data = {
				detail: {
					...ass,
					thumbnail: thumbnail?.url,
					brands: doc
				},
				type: "category",
				children,
				filters: [
					brandFilter,
					optionFilterPrice,
					demandFilter,
					promotionFilter,
				],
				seo_data: {}
			}
		}

		if (brand) {
			const { thumbnail, ...ass } = brand?.toObject()
			// lấy ra danh mục thuộc thương hiệu
			const categoryFind = await Category.findOne({
				_id: brand?.category_id
			}).select("-deleted -deleted_at -created_at -updated_at -category_id -parent_id")

			let children = await Brand.find({
				parent_id: brand?._id
			}).select("-deleted -deleted_at -created_at -updated_at")

			// lấy sản phẩm theo thương hiệu
			const products = await Product?.find({
				$and: [
					{ brand_id: brand?._id },
					{ price_before_discount: { $exists: true } } // Chỉ lấy các sản phẩm có giá trước khi giảm giá
				]
			}).sort({
				price: 1
			}).select('name price price_before_discount');

			const minPrice = products[0]?.price
			const maxPrice = products[products?.length - 1]?.price
			let optionFilterPrice = generateDynamicPriceOptions(minPrice, maxPrice)
			optionFilterPrice = {
				name: 'gia',
				type: 'checkbox',
				label: 'Khoảng giá',
				options: optionFilterPrice
			}

			// bộ lọc khuyến mãi
			const promotionFilter = {
				name: "khuyen-mai",
				type: "switch",
				label: "Có khuyến mại",
				options: [
					{
						"label": "Có",
						"value": "co"
					}
				]
			}

			// bộ lọc thương hiệu
			const brandFilter = {
				name: "thuong-hieu",
				type: "checkbox",
				label: "Thương hiệu con",
				options: children?.map((item) => ({
					label: item?.name,
					value: item?.slug
				}))
			}

			data = {
				detail: {
					name: `${categoryFind?.name} ${ass?.name}`,
					slug: ass?.shared_url,
					shared_url: ass?.shared_url,
					description: ass?.description,
					thumbnail: thumbnail?.url,
					brand: {
						...ass,
						thumbnail: thumbnail?.url
					},
					category: {
						...categoryFind.toObject()
					},
					brands: children
				},
				type: "category_brand",
				sub_brands: children?.map((item) => ({
					_id: ass?._id,
					name: `${categoryFind?.name} ${ass?.name} ${item?.name}`,
					shared_url: item?.shared_url
				})),
				filters: [
					brandFilter,
					optionFilterPrice,
					promotionFilter
				],
				seo_data: {}
			}
		}


		return res.json({
			status: 200,
			message: "Thành Công",
			data: data
		})
	} catch (error) {
		next(error)
	}
}

export async function collectionProducts(req, res, next) {
	try {
		const {
			_page = 1,
			_sort = "created_at",
			_order = "desc",
			_limit = 10,
			_category = null
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
				"-category_id",
				"-brand_id",
				"-deleted",
				"-deleted_at",
				"-created_at",
				"-updated_at",
			],
		};

		if (!_category) {
			throw createError.NotFound("Không có dữ liệu")
		}

		let category = await Category.findOne({
			slug: _category
		}).select("-deleted -deleted_at -thumbnail.id -created_at -updated_at")

		let brand = await Brand.findOne({
			shared_url: _category
		}).select("-deleted -deleted_at -thumbnail.id -created_at -updated_at")

		if (!brand && !category) {
			throw createError.NotFound('Không có dữ liệu')
		}

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
				(item) => item?.toObject()?.option_value_id?.label
			);

			// lấy ra các options
			const options = await Option.find({
				product_id: id,
			});

			// lấy ra option màu
			const option = options?.find((option) => option.name == "color");
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

		if (category) {
			const { docs, ...paginate } = await Product.paginate({
				category_id: category?._id
			}, options);

			const data = await Promise.all(
				docs?.map((item) => getSku(item, item?._id))
			);

			return res.json({
				status: 200,
				message: 'Thành công',
				data: {
					items: data,
					paginate,
				}
			})
		}

		if (brand) {
			const brands = await Brand.find({
				category_id: brand?.category_id,
				shared_url: { $regex: brand?.slug, $options: 'i' }
			});

			const ids = brands?.map((brand) => brand?._id)

			// lấy ra tất cả sản thuộc thương hiệu
			const { docs, ...paginate } = await Product.paginate({
				brand_id: { $in: ids }
			}, options);

			const data = await Promise.all(
				docs?.map((item) => getSku(item, item?._id))
			);

			return res.json({
				status: 200,
				message: 'Thành công',
				data: {
					items: data,
					paginate,
				}
			})
		}

	} catch (error) {
		next(error)
	}
}
