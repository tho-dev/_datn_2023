import express from 'express';
import { getAllPost, getPostDetail, createPost, updatePost, deletePost } from '../controllers/post.controller';

const router = express.Router();
router.get('/', getAllPost);
router.get('/:id', getPostDetail);
router.post('/add', createPost);
router.put('/edit/:id', updatePost);
router.delete('/delete/:id', deletePost);
export default router;
