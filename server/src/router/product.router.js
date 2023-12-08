import express from "express"
import { verifyAccessToken } from "../middleware/jwt.middleware"
import { checkPermission } from "../middleware/check-permission.middleware"
import {
	getAllProduct,
	getAllProductManager,
	getSingleProduct,
	getProductById,
	createProduct,
	updateProduct,
	getAllOptionValues,
	createOptionValues,
	getSingleOptionValue,
	deleteOptionValue,
	updateOptionValue,
	getAllOption,
	getSingleOption,
	createOption,
	updateOption,
	deleteOption,
	getAllVariant,
	saveVariant,
	deteleVariant,
	getSingleVariant,
	updateVariant,
	compareProduct,
	exportExcel,
	deleteProduct
} from "../controllers/product.controller";

const router = express.Router();

// api product

router.get('/export-excel', exportExcel)
router.get('/manager', getAllProductManager)
router.get('/manager/:id', getProductById)
router.get('/', getAllProduct)
router.get('/:slug', getSingleProduct)
router.post("/", [verifyAccessToken, checkPermission], createProduct)
router.post("/compare", compareProduct)
router.put("/:id", [verifyAccessToken, checkPermission], updateProduct)
router.delete("/:id", [verifyAccessToken, checkPermission], deleteProduct)

// api variant
router.get("/:product_id/variants/:sku_id", getSingleVariant)
router.get("/:product_id/variants", getAllVariant)
router.post("/:product_id/variants", [verifyAccessToken, checkPermission], saveVariant)
router.delete("/:product_id/variants/:sku_id", [verifyAccessToken, checkPermission], deteleVariant)
router.put("/:product_id/variants/:sku_id", [verifyAccessToken, checkPermission], updateVariant)

// api option
router.get("/:product_id/options", getAllOption)
router.get("/:product_id/options/:option_id", getSingleOption)
router.post("/:product_id/options", [verifyAccessToken, checkPermission], createOption)
router.put("/:product_id/options/:option_id", [verifyAccessToken, checkPermission], updateOption)
router.delete("/:product_id/options/:option_id", [verifyAccessToken, checkPermission], deleteOption)

// api option values 
router.get('/:product_id/options/:option_id/values', getAllOptionValues)
router.get('/:product_id/options/:option_id/values/:value_id', getSingleOptionValue)
router.post('/:product_id/options/:option_id/values', [verifyAccessToken, checkPermission], createOptionValues)
router.put('/:product_id/options/:option_id/values/:value_id', [verifyAccessToken, checkPermission], updateOptionValue)
router.delete('/:product_id/options/:option_id/values/:value_id', [verifyAccessToken, checkPermission], deleteOptionValue)


export default router;

// các api cần tạo ra sản phẩm
/**
 * 1. api product (CRUD)
 * 2. api options (CRUD)
 * 3. api option_values (CRUD)
 * 4. api variants (CRUD)
 * 5. 
 */
