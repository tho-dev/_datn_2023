import express from "express"
import {
	getAllProduct,
	getSingleProduct,
	createProduct,
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
	saveVariant
} from "../controllers/product.controller";

const router = express.Router()

// api product 
router.get('/:slug', getSingleProduct)
router.get('/', getAllProduct)
router.post("/", createProduct)


// api variant
router.get("/:product_id/variants", getAllVariant)
router.post("/:product_id/variants", saveVariant)

// api option
router.get("/:product_id/options", getAllOption)
router.get("/:product_id/options/:option_id", getSingleOption)
router.post("/:product_id/options", createOption)
router.put("/:product_id/options/:option_id", updateOption)
router.delete("/:product_id/options/:option_id", deleteOption)

// api option values 
router.get('/:product_id/options/:option_id/values', getAllOptionValues)
router.get('/:product_id/options/:option_id/values/:value_id', getSingleOptionValue)
router.post('/:product_id/options/:option_id/values', createOptionValues)
router.put('/:product_id/options/:option_id/values/:value_id', updateOptionValue)
router.delete('/:product_id/options/:option_id/values/:value_id', deleteOptionValue)


export default router


// các api cần tạo ra sản phẩm
/**
 * 1. api product (CRUD)
 * 2. api options (CRUD)
 * 3. api option_values (CRUD)
 * 4. api variants (CRUD)
 * 5. 
 */
