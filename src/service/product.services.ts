import {
    CreateProductInput,
    DeleteProductInput,
    GetProductInput,
    ListProductsInput,
    UpdateProductInput,
} from "../schema/product"
import { PrismaClient } from "@prisma/client"
import { databaseResponseTimeHistogram } from "../utils/metrics"

const prisma = new PrismaClient()

export async function createProduct(input: CreateProductInput["body"]) {
    const { collectionIds, quantity, ...rest } = input
    const metricsLabels = {
        operation: "Create Product",
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const collections = await prisma.collection.findMany({
            where: {
                id: { in: collectionIds },
            },
        })

        if (collections.length !== collectionIds?.length) throw new Error()

        const result = await prisma.product.create({
            data: {
                ...rest,
                collections: {
                    connect: collectionIds.map(collectionId => {
                        return { id: collectionId }
                    }),
                },
            },
        })
        timer({ ...metricsLabels, success: "true" })
        return result
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}

export async function getProduct({ productId }: GetProductInput["params"]) {
    const metricsLabels = {
        operation: "Get Product",
    }

    const data = {
        id: parseInt(productId),
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const product = await prisma.product.findUnique({
            where: data,
            include: { collections: true, inventory: true },
        })

        timer({ ...metricsLabels, success: "true" })

        return product
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}

export async function listProucts({ query }: ListProductsInput) {
    console.log("query", query)

    const metricsLabels = {
        operation: "Get Products",
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const result = await prisma.product.findMany({
            include: { collections: true, inventory: true },
        })
        timer({ ...metricsLabels, success: "true" })
        return result
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}

export async function deleteProduct({
    productId,
}: DeleteProductInput["params"]) {
    const metricsLabels = {
        operation: "Delete Product",
    }

    const data = {
        id: parseInt(productId),
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const result = await prisma.product.findFirst({
            where: { ...data },
        })

        timer({ ...metricsLabels, success: "true" })

        return result
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })

        throw e
    }
}

export async function updateProduct(
    { productId }: UpdateProductInput["params"],
    body: UpdateProductInput["body"]
) {
    const metricsLabels = {
        operation: "Update Product",
    }

    const id = parseInt(productId)
    const { collectionIds, quantity, ...rest } = body

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const result = await prisma.product.update({
            where: { id },
            data: {
                ...rest,
                inventory: { update: { quantity } },
                collections: {
                    connect: collectionIds?.map(collectionId => {
                        return { id: collectionId }
                    }),
                },
            },
        })

        timer({ ...metricsLabels, success: "true" })

        return result
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}
