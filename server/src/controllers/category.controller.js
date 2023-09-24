import moment from "moment/moment";
import Category from "../models/category.model";
import { categorySchema } from "../validations/category.validations"
import createError from "http-errors"

function nestedCategories(input, parent_id) {
	const output = [];
	let brands = null;

	if (parent_id) {
		brands = input.filter((brand) => String(brand.parent_id) == String(parent_id));
	} else {
		brands = input.filter((brand) => brand.parent_id == parent_id);
	}

	for (let brand of brands) {
		output.push({
			_id: brand?._id,
			parent_id: parent_id,
			name: brand?.name,
			slug: brand?.slug,
			thumbnail: brand?.thumbnail?.url,
			description: brand?.description,
			children: nestedCategories(input, brand?._id).length == 0 ? undefined : nestedCategories(input, brand._id)
		});
	}

	return output;
}

export async function getAllCategory(req, res, next) {
	try {
		// _parent -> true -> danh mục tra và ngược lại
		const {
			_page = 1,
			_sort = "created_at",
			_order = "desc",
			_limit = 10,
			_type = _type || 'category_brand',
			_parent = true
		} = req.query;

		const options = {
			page: _page,
			limit: _limit,
			sort: {
				[_sort]: _order == "desc" ? -1 : 1,
			},
			select: ['-deleted', '-deleted_at']
		};

		const { docs, ...paginate } = await Category.paginate({
			type: _type,
			parent_id: JSON.parse(_parent) ? null : { $ne: null }
		}, options);

		if (!JSON.parse(_parent)) {
			// hàm lấy ra danh mục cha
			const getParent = async (category, parentId) => {
				const doc = await Category.findById(parentId)

				return {
					...category.toObject(),
					parent: {
						_id: doc._id,
						name: doc.name,
						slug: doc.slug,
						type: doc.type,
						description: doc.description
					}
				}
			}

			const repsonse = await Promise.all(docs.map((item) => getParent(item, item.parent_id)))

			return res.json({
				status: 200,
				message: "Thành công",
				data: {
					items: repsonse,
					paginate
				},
			})
		}

		return res.json({
			status: 200,
			message: "Thành công",
			data: {
				items: docs,
				paginate
			},
		});
	} catch (error) {
		next(error);
	}
}

export async function getOneCategory(req, res, next) {
	try {
		const { id } = req.params;
		const categories = await Category.find({})
		const category = await Category.findById(id).select('-deleted -deleted_at');

		if (!category) {
			throw createError.NotFound("không tìm thấy!");
		}

		const children = nestedCategories(categories, category?._id)

		return res.json({
			status: 200,
			message: "Thành công",
			data: {
				...category.toObject(),
				children
			},
		});
	} catch (error) {
		next(error);
	}
}

export async function removeCategory(req, res, next) {
	try {
		const { id } = req.params;
		const category = await Category.findById(id);

		if (!category) {
			throw createError.NotFound("Không tìm thấy");
		}

		// cách xóa mềm
		await category.delete()
		category.deleted_at = moment(new Date).toISOString()
		await category.save()

		return res.json({
			status: 200,
			message: "Thành công",
			data: category,
		});
	} catch (error) {
		next(error);
	}
}

export async function createCategory(req, res, next) {
	try {
		const payload = req.body;
		const { error } = categorySchema.validate(payload, { abortEarly: false });

		if (error) {
			const errors = error.details.map((items) => items.message);
			throw createError.BadRequest(errors)
		}

		const category = await Category.create(payload);

		return res.status(201).json({
			status: 201,
			message: "Thành công",
			data: category,
		});
	} catch (error) {
		next(error);
	}
}

export async function updateCategory(req, res, next) {
	try {
		const { id } = req.params;
		const payload = req.body;
		const { error } = categorySchema.validate(payload, { abortEarly: false });

		if (error) {
			const errors = error.details.map((items) => items.message);
			throw createError.BadRequest(errors)
		}

		const category = await Category.findById(id);

		if (!category) {
			throw createError.NotFound("Không tìm thấy");
		}

		category.set({ ...payload, updated_at: moment(new Date()).toISOString() })
		await category.save()

		return res.json({
			status: 200,
			message: "Thành công",
			data: category,
		});
	} catch (error) {
		next(error);
	}
}
