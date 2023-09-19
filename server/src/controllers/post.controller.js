import Post from '../models/post.model';
import createError from 'http-errors';
import { postSchema } from '../validations/post.validate';
export async function getAllPost(req, res, next) {
  try {
    const posts = await Post.find();
    if (posts.length === 0) {
      throw createError.BadRequest('Bài viêt không tồn tại');
    }

    return res.json({
      status: 200,
      message: 'Thành công',
      data: posts,
    });
  } catch (error) {
    next(error);
  }
}
export async function getPostDetail(req, res, next) {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
    });
    if (!post) {
      throw createError.BadRequest('Bài viết không tồn tại');
    }
    return res.json({
      status: 200,
      message: 'Thành công',
      data: post,
    });
  } catch (error) {
    next(error);
  }
}
export async function createPost(req, res, next) {
  try {
    const { error } = postSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    if (req.body.public_date === true) {
      req.body.public_date = new Date();
    } else if (typeof req.body.public_date === 'string') {
      req.body.public_date = new Date(req.body.public_date);
    }
    const post = await Post.create(req.body);
    if (!post) {
      throw createError.BadRequest('Thêm bài viết thất bại');
    }
    return res.json({
      status: 200,
      message: 'Tạo bài viết thành công',
      data: post,
    });
  } catch (error) {
    next(error);
  }
}
export async function updatePost(req, res, next) {
  try {
    const { error } = postSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const post = await Post.findByIdAndUpdate(req.params.id, req.body);
    if (!post) {
      throw createError.BadRequest('Sửa sản phẩm thất bại');
    }
    return res.json({
      status: 200,
      message: 'Sửa sản phẩm thành công',
      data: post,
    });
  } catch (error) {
    next(error);
  }
}
export async function deletePost(req, res, next) {
  try {
    const postId = req.params.id;
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      throw createError.BadRequest('Không tìm thấy bài viết');
    }
    const deletedPost = await Post.delete({ _id: postId });
    return res.json({
      status: 200,
      message: 'Xóa bài viết thành công',
      data: deletedPost,
    });
  } catch (error) {
    next(error);
  }
}
