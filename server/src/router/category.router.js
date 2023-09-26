import express from "express"
import { createCategory, createSubCategory, getAllCategory, getOneCategory, removeCategory, removeSubCategory, updateCategory, updateSubCategory } from "../controllers/category.controller"

const router = express.Router();

router.get('/', getAllCategory);
router.get('/:id',getOneCategory);
router.post('/',createCategory);
router.delete('/:id',removeCategory);
router.put('/:id', updateCategory);
router.post('/sub/',createSubCategory);
router.delete('/sub/:id',removeSubCategory);
router.put('/sub/:id',updateSubCategory);

export default router