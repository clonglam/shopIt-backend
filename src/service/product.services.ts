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
    console.log("REqBody", input)
    const { collectionIds, ...rest } = input
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
                collectionsOnProducts: {
                    createMany: {
                        data: collectionIds.map(collectionId => {
                            return {
                                collectionId,
                            }
                        }),
                    },
                },
            },
        })
        timer({ ...metricsLabels, success: "true" })

        return result
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        console.log("error", e)
        throw e
    }
}

export async function getProduct({ productId }: GetProductInput["params"]) {
    const metricsLabels = {
        operation: "Get Product",
    }
    console.log("productId", productId)

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const product = await prisma.product.findFirst({
            where: {
                slug: productId,
            },
            include: {
                collectionsOnProducts: {
                    include: { collection: true },
                },
            },
        })

        timer({ ...metricsLabels, success: "true" })

        return product
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}

export async function listProucts({}: ListProductsInput) {
    const metricsLabels = {
        operation: "Get Products",
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const result = await prisma.product.findMany({
            orderBy: {
                id: "asc",
            },
        })
        timer({ ...metricsLabels, success: "true" })
        return result
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}

export async function listProuctsFilterWithCollection({
    query,
}: ListProductsInput) {
    // console.log("query", query)

    const { collections } = query

    console.log("query", query)

    const metricsLabels = {
        operation: "Get Products",
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const collection = await prisma.collection.findUnique({
            where: {
                slug: collections,
            },
            select: {
                id: true,
            },
        })

        if (collection) {
            const collectionId = collection.id
            const result = await prisma.product.findMany({
                where: {
                    collectionsOnProducts: {
                        some: { collectionId: collectionId },
                    },
                },
            })
            timer({ ...metricsLabels, success: "true" })
            return result
        } else throw new Error("No collection found.")
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
        const result = await prisma.product.delete({
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
    const { collectionIds, ...rest } = body

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const result = await prisma.product.update({
            where: { id },
            data: {
                ...rest,
                collectionsOnProducts: {
                    deleteMany: {},

                    createMany: {
                        data:
                            collectionIds?.map(collectionId => {
                                return {
                                    collectionId: collectionId,
                                    // collection: {
                                    //     connect: { id: collectionId },
                                    // },
                                }
                            }) || [],
                    },
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
