import {
    CreateProductInput,
    DeleteProductInput,
    ListProductsInput,
    GetProductInput,
    UpdateProductInput,
} from "../schema/product"
import { Request, Response } from "express"
import {
    createProduct,
    deleteProduct,
    getProduct,
    listProucts,
    updateProduct,
} from "../service/product.services"
import { Collection, Product } from "@prisma/client"

export async function createProductHandler(
    req: Request<{}, {}, CreateProductInput["body"]>,
    res: Response
) {
    try {
        const product = await createProduct(req.body)
        return res.send(product)
    } catch (err) {
        return res.sendStatus(400)
    }
}

export async function listProductsHandler(
    req: Request<{}, {}, ListProductsInput["query"]>,
    res: Response
) {
    try {
        // if(req)
        console.log("req", req.param)
        const moives = await listProucts(req)
        return res.send(moives)
    } catch (err) {
        return res.sendStatus(400)
    }
}

export async function getProductHandler(
    req: Request<GetProductInput["params"], {}, {}>,
    res: Response<Product | null>
) {
    try {
        const product = await getProduct(req.params)
        return res.send(product)
    } catch (err) {
        return res.sendStatus(400)
    }
}

export async function updateProductHandler(
    req: Request<UpdateProductInput["params"], UpdateProductInput["body"]>,
    res: Response<Product>
) {
    try {
        const product = await updateProduct(req.params, req.body)
        return res.send(product)
    } catch (err) {
        return res.sendStatus(400)
    }
}

export async function deleteProductHandler(
    req: Request<DeleteProductInput["params"]>,
    res: Response
) {
    try {
        const product = await deleteProduct(req.params)
        return res.send(product)
    } catch (err) {
        return res.sendStatus(400)
    }
}
