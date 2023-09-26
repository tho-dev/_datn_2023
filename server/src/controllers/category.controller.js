import moment from "moment/moment";
import Category from "../models/category.model";
import { categorySchema } from "../validations";

export async function getAllCategory(req, res, next) {
	try {
		const categories = await Category.find({});

		return res.json({
			status: 200,
			message: "Thành công",
			data: categories,
		});
	} catch (error) {
		next(error);
	}
}
export async function getOneCategory(req, res, next) {
	const id = req.params.id;
	try {
		const category = await Category.findById(id);
		if (!category) {
			throw createError.BadRequest("không tìm thấy!");
		}

		return res.json({
			status: 200,
			message: "Thành công",
			data: category,
		});
	} catch (error) {
		next(error);
	}
}
export async function removeCategory(req, res, next) {
	const id = req.params.id;
	try {
		const categoryDelete = await Category.findById(id);
		if (!categoryDelete) {
			throw createError.BadRequest("Không tìm thấy");
		}
		const doc = await Category.delete({ _id: id });
		return res.json({
			status: 200,
			message: "Thành công",
			data: categoryDelete,
		});
	} catch (error) {
		next(error);
	}
}
export async function createCategory(req, res, next) {
	try {
		const body = req.body;
		console.log(req.body);
		const { error } = categorySchema.validate(body, { abortEarly: false });
		if (error) {
			const errors = error.details.map((items) => items.message);
			return res.status(401).json({
				message: errors,
			});
		}
		const category = await Category.create(body);
		if (!category) {
			throw createError.BadRequest("Thêm thất bại");
		}
		return res.json({
			status: 200,
			message: "Thành công",
			data: category,
		});
	} catch (error) {
		next(error);
	}
}
export async function updateCategory(req, res, next) {
	const id = req.params.id;
	try {
		const body = req.body;
		// const { error } = categorySchema.validate(body, { abortEarly: false });
		// if (error) {
		// 	const errors = error.details.map((items) => items.message);
		// 	return res.status(401).json({
		// 		message: errors,
		// 	});
		// 	}
		const category = await Category.findById(id);
		if (!category) {
			throw createError.BadRequest("Không tìm thấy");
		}
		const doc = await Category.findByIdAndUpdate(
			id,
			{ ...body, updated_at: moment(new Date()).toISOString() },
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
// category child
export async function removeSubCategory(req, res, next) {
	const id = req.params.id;
	try {
		const categorySubDelete = await Category.findById(id);
		if (!categorySubDelete) {
			throw createError.BadRequest("Không tìm thấy");
		}
		const category = await Category.findById(categorySubDelete.cateId);
		await Category.findByIdAndUpdate(
			categorySubDelete.cateId,
			{
				$pull: {
					sub_categories: categorySubDelete._id,
				},
			},
			{ new: true }
		);
		const doc = await Category.delete({ _id: id });
		return res.json({
			status: 200,
			message: "Thành công",
			data: categorySubDelete,
		});
	} catch (error) {
		next(error);
	}
}
export async function createSubCategory(req, res, next) {
	try {
		// const { error } = categorySchema.validate(body, { abortEarly: false });
		// if (error) {
		// 	const errors = error.details.map((items) => items.message);
		// 	return res.status(401).json({
		// 		message: errors,
		// 	});
		// 	}

		const subcategory = await Category.create(req.body);
		if (!subcategory) {
			throw createError.BadRequest("Thêm thất bại");
		}
		console.log("subcateId", subcategory);
		const category = await Category.findById(subcategory.cateId);
		if (category) {
			const sub_categories = await category.sub_categories.push(subcategory._id);
			const categoryupdate = await Category.findByIdAndUpdate(subcategory.cateId, {
				...category,
				sub_categories: sub_categories,
			});
		}
		return res.json({
			status: 200,
			message: "Thành công",
			data: subcategory,
		});
	} catch (error) {
		next(error);
	}
}
export async function updateSubCategory(req, res, next) {
	const id = req.params.id;
	try {
		const body = req.body;
		// const { error } = categorySchema.validate(body, { abortEarly: false });
		// if (error) {
		// 	const errors = error.details.map((items) => items.message);
		// 	return res.status(401).json({
		// 		message: errors,
		// 	});
		// 	}
		const oldCategorySub = await Category.findById(id);
		if (!oldCategorySub) {
			throw createError.BadRequest("Không tìm thấy");
		}
		const category = await Category.findById(oldCategorySub.cateId);
		if (category) {
			if (category._id == body.cateId) {
				const doc = await Category.findByIdAndUpdate(
					id,
					{ ...body, updated_at: moment(new Date()).toISOString() },
					{ new: true }
				);
				return res.json({
					status: 200,
					message: "Thành công",
					data: doc,
				});
			} else {
				const doc = await Category.findByIdAndUpdate(
					id,
					{ ...body, updated_at: moment(new Date()).toISOString() },
					{ new: true }
				);
				await Category.findByIdAndUpdate(
					category._id,
					{
						$pull: {
							sub_categories: id,
						},
					},
					{ new: true }
				);
				const categorynew = await Category.findById(body.cateId);
				const sub_categories = await categorynew.sub_categories.push(doc._id);
				await Category.findOneAndUpdate(
					{ _id: body.cateId },
					{ ...categorynew, sub_categories: sub_categories }
				);
				return res.json({
					status: 200,
					message: "Thành công",
					data: doc,
				});
			}
		}
		const categorynew = await Category.findById(body.cateId);
		if (categorynew) {
			const doc = await Category.findByIdAndUpdate(
				id,
				{ ...body, updated_at: moment(new Date()).toISOString() },
				{ new: true }
			);
			const sub_categories = await categorynew.sub_categories.push(doc._id);
			await Category.findByIdAndUpdate(body.cateId, { ...categorynew, sub_categories: sub_categories });
		}
		return res.json({
			status: 200,
			message: "Thành công",
			data: oldCategorySub,
		});
	} catch (error) {
		next(error);
	}
}
