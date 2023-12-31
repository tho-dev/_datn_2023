import Brand from "../models/brand.model"
import createError from "http-errors"
import moment from "moment/moment"
import brandSchema from "../validations/brand.validations";
import Category from "../models/category.model"



// Hàm đệ quy để xây dựng danh sách thương hiệu con (sub_brands)
function nestedBrands(input, parentId) {
	const output = [];
	let brands = null;

	if (parentId) {
		brands = input.filter((brand) => String(brand.parent_id) == String(parentId));
	} else {
		brands = input.filter((brand) => !brand.parent_id);
	}

	for (let brand of brands) {
		output.push({
			_id: brand?._id,
			parent_id: parentId,
			name: brand?.name,
			slug: brand?.slug,
			shared_url: brand?.shared_url,
			thumbnail: brand?.thumbnail.url,
			description: brand?.description,
			children: nestedBrands(input, brand?._id).length == 0 ? undefined : nestedBrands(input, brand?._id),
		});
	}

	return output;
}

// Lấy danh sách thương hiệu
export async function getAllBrand(req, res, next) {
	try {
		const { _page = 1, _sort = "created_at", _order = "asc", _limit = 10, _name = "", _category = "" } = req.query;

		const options = {
			page: _page,
			limit: _limit,
			sort: {
				[_sort]: _order === "desc" ? -1 : 1,
			},
			select: ['-deleted', '-deleted_at']
		};

		const { docs, ...paginate } = await Brand.paginate({
			$and: [
				_category ? { category_id: _category } : {},
				{
					$or: [
						{ name: new RegExp(_name, 'i') },
						{ description: new RegExp(_name, 'i') },
					]
				}
			],
		}, options);

		const result = [];

		for (const brand of docs) {
			const { category_id, ...ass } = brand.toObject()
			const category = await Category.findById(brand?.category_id)

			result.push({
				...ass,
				category: {
					category_id: category?._id,
					name: category?.name,
					slug: category?.slug,
					type: category?.type,
					description: category.description,
				},
			});
		}



		return res.json({
			status: 200,
			message: "Thành công",
			data: {
				items: result,
				paginate
			}
		});

	} catch (error) {
		next(error);
	}
}

export async function getOneBrand(req, res, next) {
	try {
		const { id } = req.params;
		const brand = await Brand.findById(id).select('-deleted -deleted_at');

		if (!brand) {
			throw createError.NotFound("Thương hiệu không tồn tại");
		}

		const brands = await Brand.find({});
		const children = nestedBrands(brands, brand._id);

		const { ...ass } = brand.toObject()

		return res.json({
			status: 200,
			message: "Thành công",
			data: {
				...ass,
				children,
			},
		});
	} catch (error) {
		next(error);
	}
}

export async function createBrand(req, res, next) {
	try {
		const payload = req.body;
		const { error } = brandSchema.validate(payload, { abortEarly: false });

		if (error) {
			const errors = error.details.map((items) => items.message);
			throw createError.BadRequest(errors)
		}

		const brand = await Brand.create(payload);

		return res.status(201).json({
			status: 201,
			message: "Thành công",
			data: brand,
		});
	} catch (error) {
		next(error);
	}
}

export async function updateBrand(req, res, next) {
	try {
		const { id } = req.params;
		const payload = req.body;
		const { error } = brandSchema.validate(payload, { abortEarly: false });

		if (error) {
			const errors = error.details.map((items) => items.message);
			throw createError.BadRequest(errors)
		}

		const brand = await Brand.findById(id)

		if (!brand) {
			throw createError.NotFound("Không tìm thấy");
		}

		// cập nhật
		brand.set({
			...payload,
			updated_at: moment(new Date()).toISOString()
		})
		await brand.save()



		return res.json({
			status: 200,
			message: "Thành công",
			data: brand,
		});
	} catch (error) {
		next(error);
	}
}

export async function removeBrand(req, res, next) {
	try {
		const { id } = req.params;
		const brand = await Brand.findById(id);

		if (!brand) {
			throw createError.NotFound("Không tìm thấy");
		}

		// cách xóa mềm
		await brand.delete()
		brand.deleted_at = moment(new Date).toISOString()
		await brand.save()

		return res.json({
			status: 200,
			message: "Thành công",
			data: brand,
		});
	} catch (error) {
		next(error);
	}
}

