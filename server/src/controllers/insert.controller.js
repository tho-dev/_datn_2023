import Category from "../models/category.model"
import Brand from "../models/brand.model"
import polytech from "../data/polytech.json"
import fetch from "node-fetch"
import { Demand, DemandValue } from "../models/demand.model"
import { Product, Option, OptionValue, Sku, Variant } from "../models/product.model"

export async function insertData(req, res, next) {
	try {
		const api = 'http://localhost:8080/api'
		const data = polytech?.data

		const createBrand = async (payload) => {
			const res = await fetch(api + '/brand', {
				method: "POST",
				body: payload,
				headers: { 'Content-Type': 'application/json' }
			})
			const res1 = await res.json()

			console.log('res1', res1)
			return res1?.data
		}

		const createCategory = async (payload) => {
			const { name, thumbnail, description } = payload?.category
			const brands = payload?.brands

			const res_1 = await fetch(api + "/category", {
				method: "POST",
				body: JSON.stringify({
					name: name,
					type: "category_brand",
					thumbnail: thumbnail,
					description: description
				}),
				headers: { 'Content-Type': 'application/json' }
			})

			const category = await res_1.json()
			const category_id = category?.data?._id

			if (brands?.length > 0) {
				const check = await Promise.all(brands?.map(async (brand1) => {
					const subBrands1 = brand1?.sub_brands
					const payload1 = JSON.stringify({
						category_id,
						name: brand1?.name,
						thumbnail: brand1?.icon,
						description: brand1?.description,
					})

					const doc1 = await createBrand(payload1)

					if (subBrands1 && Array.isArray(subBrands1)) {
						const check1 = await Promise.all(subBrands1?.map(async (brand2) => {
							const subBrands2 = brand2?.sub_brands
							const payload2 = JSON.stringify({
								category_id,
								parent_id: doc1?._id,
								name: brand2?.name,
								thumbnail: brand2?.icon,
								description: brand2?.description,
							})

							const doc2 = await createBrand(payload2)

							if (subBrands2 && Array.isArray(subBrands2)) {
								const check2 = await Promise.all(subBrands2?.map(async (brand3) => {
									const subBrands3 = brand3?.sub_brands
									const payload3 = JSON.stringify({
										category_id,
										parent_id: doc2?._id,
										name: brand3?.name,
										thumbnail: brand3?.icon,
										description: brand3?.description,
									})

									const doc3 = await createBrand(payload3)

									if (subBrands3 && Array.isArray(subBrands3)) {
										const check2 = await Promise.all(subBrands3?.map(async (brand4) => {
											const subBrands4 = brand4?.sub_brands
											const payload3 = JSON.stringify({
												category_id,
												parent_id: doc3?._id,
												name: brand4?.name,
												thumbnail: brand4?.icon,
												description: brand4?.description,
											})
											const doc4 = await createBrand(payload3)
										}))
									}
								}))
							}
						}))
					}

				}))
			}


			return category
		}


		const categories = await Promise.all(data?.map((item) => createCategory(item)))

		return res.json({
			status: 200,
			message: "Thành công",
		})
	} catch (error) {
		next(error)
	}
}

export async function insertProduct(req, res, next) {
	try {
		const api = 'http://localhost:8080/api'
		const data = polytech?.data

		const createProduct = async (category, products) => {
			const categoryFind = await Category.findOne({
				slug: category?.slug,
			})

			const category_id = categoryFind?._id

			const insertProduct = async (doc) => {
				const { name, SKU, price = 100000, price_before_discount = 10000, seo, specs = "test", has_gift = false, gift_amount = 20000, status = true, attributes = [], video_review, description = "test", skus: skusPolytech, variations, brand, demands: demandsPolytech } = doc

				const brandFind = await Brand.findOne({
					shared_url: brand?.slug
				})

				const brandFull = await Brand.findOne({
					category_id
				})


				const brand_id = brandFind?._id || brandFull?._id
				const productFind = await Product.create({
					name,
					SKU: SKU || 'Polytech@2023',
					seo: {
						meta_title: seo?.title,
						meta_description: seo?.description,
						tags: seo?.tags
					},
					images: skusPolytech?.[0]?.assets?.length > 0 ? skusPolytech?.[0]?.assets : Array(6).fill({
						"id": "thinkpro/products/bnqdc0obrf6vxtldbzrg",
						"url": "https://res.cloudinary.com/dctvtsnuk/image/upload/v1698172337/thinkpro/products/bnqdc0obrf6vxtldbzrg.jpg"
					}),
					price: price || 1000000,
					price_before_discount: price_before_discount || 1000000,
					specs,
					has_gift,
					status: true,
					attributes: attributes.map((attribute) => ({
						group_name: attribute?.group_name,
						items: attribute?.items?.map((i) => ({
							label: i?.label,
							value: i?.value
						}))
					})),
					video_review,
					description,
					brand_id,
					category_id,
				})

				const product_id = productFind?._id

				const demands = await Demand.find({})

				// Check điểm 
				if (Array.isArray(demandsPolytech) && demandsPolytech?.length > 0) {
					await Promise.all(demandsPolytech?.map(async (demand) => {
						const demandFind = demands?.find((i) => i?.slug == demand?.slug)
						await DemandValue.create({
							product_id: product_id,
							demand_id: demandFind?._id,
							point: demand?.point,
						})
					}))
				}

				// random màu
				const colors = ['#212529', '#868e96', '#343a40', '#ffa8a8', '#212529']

				const getRandomColor = (colors) => {
					const randomIndex = Math.floor(Math.random() * colors.length);
					return colors[randomIndex];
				}

				const variationsFilter = variations?.filter((a) => a?.options?.length > 0)
				const optionsP = variationsFilter?.map((variant) => ({
					label: variant?.label,
					option_values: variant?.options?.map((i) => {
						return {
							label: i?.name,
							value: variant?.name == 'color' ? getRandomColor(colors) : (i?.description || i?.name)
						}
					})
				}))

				// insert vào bảng options và option values
				const res = await Promise.all(optionsP?.map(async (option, index) => {
					const optionFind = await Option.create({
						product_id: product_id,
						label: option?.label,
						position: index
					})

					const optionValues = await Promise.all(option?.option_values?.map(async (optionValue) => {
						await OptionValue.create({
							product_id: product_id,
							option_id: optionFind?._id,
							...optionValue
						})
					}))
				}))

				// api tự động đăng ký các biến thế

				const product = await Product.findById(product_id)
					.select("-_id name slug shared_url price price_before_discount price_discount_percent")

				// Xóa tất cả sku trước khi đăng ký
				// + TH1: khi thêm bớt options -> tính toán lại biến thể
				// + TH2: khi thêm bớt options value -> tính toán lại biến thể
				await Variant.deleteMany({
					product_id
				})

				await Sku.deleteMany({
					product_id
				})

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
					...product.toObject(),
					product_id: product_id,
					stock: 0,
					is_avaiable: true,
					assets: [],
					image: {},
				})

				const arraySkusFilter = arraySkus?.map((test, index) => {
					return {
						...test,
						SKU: skusPolytech?.[index]?.SKU || 'Polytech@2023',
						image: skusPolytech?.[index]?.image?.url ? skusPolytech?.[index]?.image : {
							"url": "https://res.cloudinary.com/dctvtsnuk/image/upload/v1698172409/thinkpro/products/nsg9m61d8alhqnmzq83e.jpg",
							"id": "thinkpro/products/nsg9m61d8alhqnmzq83e"
						},
						assets: skusPolytech?.[index]?.assets?.length > 0 ? skusPolytech?.[index]?.assets?.map((as) => ({
							id: as?.filename,
							url: as?.path
						})) : Array(6).fill({
							"id": "thinkpro/products/bnqdc0obrf6vxtldbzrg",
							"url": "https://res.cloudinary.com/dctvtsnuk/image/upload/v1698172337/thinkpro/products/bnqdc0obrf6vxtldbzrg.jpg"
						})
					}
				})

				// insert tất cả skus đã đăng ký vào db
				const skus = await Promise.all(arraySkusFilter?.map((item) => Sku.create(item)))

				// hàm đăng ký các variant options
				const variantOptions = (variants, skus) => {
					let result = []

					for (let index in skus) {
						for (let optionValue of variants[index]) {
							result.push({
								product_id,
								name: optionValue.name,
								label: optionValue.label,
								sku_id: skus[index]._id,
								option_id: optionValue.option_id,
								option_value_id: optionValue.option_value_id
							})
						}
					}
					return result
				}

				const data = variantOptions(variants, skus)
				// insert tất cả các biến thế đã đăng ký vào db
				const data1 = await Promise.all(data?.map((item) => Variant.create(item)))
			}

			const doc1 = await Promise.all(products?.map((product) => insertProduct(product)))

			return doc1
		}

		const products = await Promise.all(data?.map((item) => createProduct(item?.category, item?.products)))

		return res.json({
			status: 201,
			message: "Thành Công",
			data: products
		})
	} catch (error) {
		next(error)
	}
}

export async function insertVariants(req, res, next) {
	try {
		const products = await Product.find({})

		await Promise.all(products?.map(async (i) => {
			const product_id = i?._id

		}))
		return res.json({
			status: 200,
			message: 'Thành công',
			data: []
		})
	} catch (error) {
		next(error)
	}
}