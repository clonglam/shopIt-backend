import express from "express"
// import {
//     createProductSchema,
//     deleteProductSchema,
//     updateProductSchema,
//     getProductSchema,
//     listProductsSchema,
// } from "../schema/product"
import { loginHandler } from "../controller/auth.controller"
// import {
//     createProductHandler,
//     deleteProductHandler,
//     getProductHandler,
//     listProductsHandler,
//     updateProductHandler,
// } from "../controller/product.controller"
// import validateResource from "../middleware/validateResource"

const router = express.Router()

router.post("/login", loginHandler)

export default router
