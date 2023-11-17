import Post from "../models/post.model"
import createError from "http-errors"
import { postSchema } from "../validations/post.validations"
import Category from "../models/category.model"
import moment from "moment/moment"

export async function getAllPost(req, res, next) {
  try {
    const {
      _page = 1,
      _sort = "created_at",
      _order = "desc",
      _limit = 10,
      _type = '',
      _name = ""
    } = req.query;

    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? -1 : 1,
      },
      select: [
        "-deleted",
        "-deleted_at",
      ],
    };


    const category = await Category.findOne({
      slug: _type,
      type: 'category_post'
    })

    const { docs, ...paginate } = await Post.paginate({
      $and: [
        _type ? { category_id: category?._id } : {},
        _name ? { $or: [{ name: new RegExp(_name, 'i') }, { description: new RegExp(_name, 'i') }] } : {}
      ]
    }, options);

    const results = await Promise.all((docs?.map(async (doc) => {
      const category = await Category.findOne({
        _id: doc?.category_id
      }).select('name slug ')

      return {
        ...doc?.toObject(),
        category_id: undefined,
        thumbnail: doc?.thumbnail?.url,
        category: category?.name
      }
    })))

    return res.json({
      status: 200,
      message: "Thành công",
      data: {
        items: results,
        paginate,
      },
    });

  } catch (error) {
    next(error)
  }
}

export async function getSinglePost(req, res, next) {
  try {
    const { slug } = req.params
    const post = await Post.findOne({
      slug: slug
    }).select('-deleted -deleted_at')

    if (!post) {
      throw createError.NotFound('Bài viết không tồn tại')
    }

    const category = await Category.findOne({
      _id: post?.category_id
    }).select('_id name slug shared_url description thumbnail')

    const related_posts = await Post.find({
      $and: [
        { category_id: post?.category_id }, // Lấy các bài viết cùng danh mục
        { _id: { $ne: post._id } } // Không bao gồm bài viết hiện tại
      ]
    })


    return res.json({
      status: 200,
      message: 'Thành công',
      data: {
        ...post.toObject(),
        category_id: undefined,
        category: {
          ...category.toObject()
        },
        related_posts
      }
    })
  } catch (error) {
    next(error)
  }
}

export async function createPost(req, res, next) {
  try {
    const payload = req.body;
    const { error } = postSchema.validate(payload, { abortEarly: false });

    if (error) {
      const errors = error.details.map((items) => items.message);
      throw createError.BadRequest(errors)
    }

    const doc = await Post.create({
      ...payload,
      created_by: req.user._id
    })

    return res.status(201).json({
      status: 201,
      message: 'Thành công',
      data: doc
    })

  } catch (error) {
    next(error)
  }
}

export async function updatePost(req, res, next) {
  try {
    const { id } = req.params
    const payload = req.body;
    const { error } = postSchema.validate(payload, { abortEarly: false });

    if (error) {
      const errors = error.details.map((items) => items.message);
      throw createError.BadRequest(errors)
    }

    const post = await Post.findOne({
      _id: id
    })

    if (!post) {
      throw createError.NotFound('Bài viết không tồn tại')
    }

    // cập nhật
    post.set({
      ...payload,
      updated_by: req.user._id,
      updated_at: moment(new Date()).toISOString()
    })
    await post.save()

    return res.json({
      status: 200,
      message: "Thành công",
      data: post,
    });
  } catch (error) {
    next(error)
  }
}

export async function deletePost(req, res, next) {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      throw createError.NotFound("Không tìm thấy");
    }

    // cách xóa mềm
    await post.delete()
    post.deleted_at = moment(new Date).toISOString()
    await post.save()

    return res.json({
      status: 200,
      message: "Thành công",
      data: post,
    });
  } catch (error) {
    next(error);
  }
}

