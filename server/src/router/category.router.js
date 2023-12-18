import express from "express"
import { verifyAccessToken } from "../middleware/jwt.middleware"
import { checkPermission } from "../middleware/check-permission.middleware"
import { createCategory, getOneCategory, removeCategory, updateCategory, getAllCategory } from "../controllers/category.controller"

const router = express.Router();

router.get('/', getAllCategory);
router.get('/:id', getOneCategory);

router.post('/', createCategory);
router.delete('/:id', [verifyAccessToken, checkPermission], removeCategory);
router.put('/:id', [verifyAccessToken, checkPermission], updateCategory);

export default router