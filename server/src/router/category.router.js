import express from "express"
import { createCategory, getOneCategory, removeCategory, updateCategory, getAllCategory } from "../controllers/category.controller"

const router = express.Router();

router.get('/', getAllCategory);
router.get('/:id', getOneCategory);
router.post('/', createCategory);
router.delete('/:id', removeCategory);
router.put('/:id', updateCategory);

export default router