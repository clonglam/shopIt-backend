import express from "express"
import {
    createProductSchema,
    deleteProductSchema,
    updateProductSchema,
    getProductSchema,
    listProductsSchema,
} from "../schema/product"

import {
    createProductHandler,
    deleteProductHandler,
    getProductHandler,
    listProductsHandler,
    updateProductHandler,
} from "../controller/product.controller"
import validateResource from "../middleware/validateResource"

const router = express.Router()

router.get("/:productId", getProductHandler)

router.get("/", validateResource(listProductsSchema), listProductsHandler)

router.post("/", validateResource(createProductSchema), createProductHandler)

router.put(
    "/:productId",
    validateResource(updateProductSchema),
    updateProductHandler
)

router.delete(
    "/:productId",
    validateResource(deleteProductSchema),
    deleteProductHandler
)

export default router
