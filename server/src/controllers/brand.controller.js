import Brand from "../models/brand.model"
import createError from "http-errors"
import moment from "moment/moment"
import brandSchema from "../validations/brand.validations";



// Hàm đệ quy để xây dựng danh sách thương hiệu con (sub_brands)
function nestedBrands(input, parentId) {
	const output = [];
	let brands = null;

	if (parentId) {
		brands = input.filter((brand) => String(brand.category_id) == String(parentId));
	} else {
		brands = input.filter((brand) => !brand.category_id);
	}

	for (let brand of brands) {
		output.push({
			_id: brand._id,
			name: brand.name,
			slug: brand.slug,
			thumbnail: brand.thumbnail,
			description: brand.description,
			sub_brands: nestedBrands(input, brand._id),
			updated_at: brand.updated_at,
			created_at: brand.created_at,
			deleted_at: brand.deleted_at,
			deleted: brand.deleted,
		});
	}

	return output;
}

// Lấy danh sách thương hiệu
export async function getAllBrand(req, res, next) {
	try {
		const { _page = 1, _sort = "created_at", _order = "asc", _limit = 15, slug = false } = req.query;

		const options = {
			page: _page,
			limit: _limit,
			sort: {
				[_sort]: _order === "desc" ? -1 : 1,
			},
		};

		if (slug) {
			let brand = await Brand.paginateSubDocs({ slug }, options);

			if (!brand) {
				throw createError.BadRequest("Thương hiệu này không tồn tại");
			}

			const brands = await Brand.find({});
			const children = nestedBrands(brands, brand._id);

			return res.json({
				message: "successfully",
				data: {
					...brand.toObject(),
					sub_brands: children,
				},
			});
		} else {
			const { docs, totalPages, totalDocs, limit, hasPrevPage, pagingCounter, hasNextPage, page, nextPage, prevPage } = await Brand.paginate({}, options);
			const brands = await Brand.find({});
			const result = [];

			for (const brand of docs) {
				const children = nestedBrands(brands, brand._id);
				result.push({
					...brand.toObject(),
					sub_brands: children,
				});
			}

			return res.json({
				message: "successfully",
				data: result,
				paginate: {
					limit,
					totalDocs,
					totalPages,
					page,
					pagingCounter,
					hasPrevPage,
					hasNextPage,
					prevPage,
					nextPage,
				},
			});
		}
	} catch (error) {
		next(error);
	}
}


// Lấy danh sách thương hiệu cha (có parentId là null)
// export async function getParent(req, res, next) {
// 	try {
// 		const { _page = 1, _sort = "createdAt", _order = "asc", _limit = 15 } = req.query;
// 		const options = {
// 			page: _page,
// 			limit: _limit,
// 			sort: {
// 				[_sort]: _order == "desc" ? -1 : 1,
// 			},
// 			select: ["-products", "-categoryIds"],
// 		};

// 		let {
// 			docs,
// 			totalPages,
// 			totalDocs,
// 			limit,
// 			hasPrevPage,
// 			pagingCounter,
// 			hasNextPage,
// 			page,
// 			nextPage,
// 			prevPage,
// 		} = await Brand.paginate({}, options);

// 		docs = docs?.filter((item) => !item.parentId);

// 		return res.json({
// 			message: "successfully",
// 			data: docs,
// 			paginate: {
// 				limit,
// 				totalDocs,
// 				totalPages,
// 				page,
// 				pagingCounter,
// 				hasPrevPage,
// 				hasNextPage,
// 				prevPage,
// 				nextPage,
// 			},
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// }


// GetOne
export async function getOneBrand(req, res, next) {
	try {
		const { id } = req.params;

		const brand = await Brand.findById(id);

		if (!brand) {
			throw createError.NotFound("Thương hiệu không tồn tại");
		}

		const brands = await Brand.find({});
		const children = nestedBrands(brands, brand._id);

		return res.json({
			message: "successfully",
			data: {
				...brand.toObject(),
				sub_brands: children,
			},
		});
	} catch (error) {
		next(error);
	}
}

// Tạo thương hiệu mới
export async function create(req, res, next) {
	try {
		const { error } = brandSchema.validate(req.body, { abortEarly: false });

		if (error) {
			const errors = {};
			error.details.forEach((e) => (errors[e.path] = e.message));
			return res.status(400).json({
				errors,
			});
		}

		const { subBrandId } = req.body;
		const { id } = req.params;

		const brand = await Brand.findById(id);

		if (!brand) {
			return res.status(404).json({
				message: "Không tìm thấy brand",
			});
		}

		// Kiểm tra xem sub_brands đã tồn tại và có khả năng lặp không
		const subBrands = brand.sub_brands || [];

		// Thêm subBrandId vào sub_brands
		subBrands.push(subBrandId);

		// Cập nhật thương hiệu với sub_brands mới
		const updatedBrand = await Brand.findByIdAndUpdate(id, { sub_brands: subBrands }, { new: true });

		// Trả về kết quả với thông báo "successfully"
		return res.status(200).json({
			message: "successfully",
			data: updatedBrand,
		});
	} catch (error) {
		next(error);
	}
}

// Cập nhật thương hiệu
export async function updateBrand(req, res, next) {
	try {
		const { error } = brandSchema.validate(req.body, { abortEarly: false });

		if (error) {
			const errors = {};
			error.details.forEach((e) => (errors[e.path] = e.message));
			throw createError.BadRequest(errors);
		}

		const { slug } = req.body;
		const existingBrand = await Brand.findOne({ slug });

		if (existingBrand && existingBrand._id.toString() !== req.params.id) {
			throw createError.BadRequest("Slug already exists");
		}

		const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });

		return res.status(200).json({
			message: "successfully",
			data: updatedBrand,
		});
	} catch (error) {
		next(error);
	}
}


// Xóa thương hiệu
export async function removeBrand(req, res, next) {
	try {
		const brand = await Brand.findOneWithDeleted({
			_id: req.params.id,
		});
		const isForce = JSON.parse(req.query.force || false);

		if (!brand) {
			throw createError.BadRequest("Thương hiệu này không tồn tại");
		}

		if (!brand.category_id) {
			const subBrand = await Brand.findWithDeleted({
				category_id: brand.toObject()._id,
			});
			subBrand.forEach(async (item) => (isForce ? await item.deleteOne() : await item.delete()));
		}

		isForce ? brand.deleteOne() : brand.delete();

		return res.json({
			message: "successfully",
			data: brand,
		});
	} catch (error) {
		next(error);
	}
}



// Khôi phục thương hiệu bị xóa mềm
export async function restore(req, res, next) {
	try {
		const brand = await Brand.findOneWithDeleted({
			_id: req.params.id,
		});

		if (!brand) {
			throw createError.BadRequest("Thương hiệu này không tồn tại");
		}

		if (!brand?.deleted) {
			throw createError.BadRequest("Danh mục chưa bị xóa mềm");
		}

		if (!brand.category_id) {
			const subBrand = await Brand.findWithDeleted({
				category_id: brand.toObject()._id,
			});
			subBrand.forEach(async (item) => await item.restore());
		}

		await brand.restore();

		return res.json({
			message: "successfully",
		});
	} catch (error) {
		next(error);
	}
}



