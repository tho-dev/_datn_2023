import express from 'express';
import { getSinglePost, createPost, getAllPost, deletePost, updatePost } from '../controllers/post.controller';

const router = express.Router();

router.get("/", getAllPost)
router.get("/:slug", getSinglePost)
router.post("/", createPost)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)

export default router;
