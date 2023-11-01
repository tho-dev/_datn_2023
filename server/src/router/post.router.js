import express from 'express';
import { getSinglePost, createPost, getAllPost, deletePost, updatePost } from '../controllers/post.controller';

const router = express.Router();

// lấy ra tất cả bài viết nếu _type thì lấy ra bài viết thuộc danh mục đó
// lấy danh mục bài viết thì tham truyền thêm _type = category_post vào api get all category 
router.get("/", getAllPost)
// lấy chi tiết 1 bài viết dựa vào slug
// api/post/danh-gia-thinkpad-x1-carbon-gen-7-sau-4-nam-11-trieu-cho-trai-nghiem-hang-hieu
router.get("/:slug", getSinglePost)
router.post("/", createPost)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)

export default router;
