import express from 'express';
import { verifyAccessToken } from "../middleware/jwt.middleware"
import { checkPermission } from "../middleware/check-permission.middleware"
import { getSinglePost, createPost, getAllPost, deletePost, updatePost } from '../controllers/post.controller';

const router = express.Router();

router.get("/", getAllPost)
router.get("/:slug", getSinglePost)

router.use([verifyAccessToken, checkPermission])
router.post("/", createPost)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)

export default router;
