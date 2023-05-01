import { PrismaClient } from "@prisma/client"
import { add } from "date-fns"

// Instantiate Prisma Client
const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
    await prisma.product.deleteMany({})
    await prisma.collection.deleteMany({})

    const air_sideboard_low = await prisma.product.create({
        data: {
            title: "Air Sideboard Low",
            slug: "air-sideboard-low",
            description: `<p> Air is a sideboard for the centre of the room. It combines a graphic pattern of ribs with natural cane inlays which gives a feeling of lightness and transparency. Air can be used as freestanding room dividers or placed against a wall.</p>
                        <p>The woven cane gives it a visible surface, but also provides a sense of depth. You can glimpse what’s inside, adding some careful mystery to the piece. The fact that the design is transparent also fulfils a function. The woven cane ventilates the cupboard which is practical when storing both clothes and electronic devices. A lamp behind the see-through doors makes Air shine like a diamond.</p>`,
            price: 4205,
            SKU: "F14525123",
            gallery: [
                "https://cdn.shopify.com/s/files/1/1087/6904/products/air-sideboard-low-617050_large.jpg?v=1678825239",
                "https://cdn.shopify.com/s/files/1/1087/6904/products/air-sideboard-low-824028_1400x.jpg?v=1678744396",
                "https://cdn.shopify.com/s/files/1/1087/6904/products/air-sideboard-low-421240_1400x.jpg?v=1678744396",
                "https://cdn.shopify.com/s/files/1/1087/6904/products/air-sideboard-low-980473_1400x.jpg?v=1678744396",
            ],
            thumbnail:
                "https://cdn.shopify.com/s/files/1/1087/6904/products/air-sideboard-low-617050_large.jpg?v=1678825239",
            hoverImage:
                "https://cdn.shopify.com/s/files/1/1087/6904/products/air-sideboard-low-824028_1400x.jpg?v=1678744396",
            inventory: {
                create: {
                    quantity: 6,
                },
            },
            collections: {
                create: [
                    {
                        title: "Furniture",
                        slug: "funiture",
                        description: `
                                <p>Discover the meaning of Scandinavian furniture with HORNE’s stunning gallery of modern designs intended to elevate your home, studio, or workspace. These sleek and chic examples of minimalist furniture design create and conserve space by offering calming, flowing linework and construction coupled with a gorgeous palette of earth tones, natural wood, and metalwork.</p> 
                                <p>Find minimalist desk accessories and add a touch of sparing interest to any surface or countertop. From unique items like the Offset Stool to modern updates of traditional pieces like coffee tables, HORNE offers shoppers the chance to rethink entire rooms with signature pieces and thoughtful accents.</p>`,
                        thumbnail:
                            "cdn.shopify.com/s/files/1/1087/6904/collections/furniture-933394_2000x.png?v=1678748359",
                    },
                ],
            },
        },
    })

    const collection_ceiling_lights = await prisma.collection.create({
        data: {
            title: "Ceiling Lights",
            slug: "ceiling-lights",
            description: `Transform the way your ceilings and rooms are illuminated with modern ceiling light options from HORNE. This highly curated gallery of ceiling light fixtures will brighten, embolden, and maximize your space with a touch of modernity and minimalism. As homeowners and designers know, the right ceiling light can usher in a completely new atmosphere into a room, so finding the one that brings the most out of your space is crucial.
HORNE offers designs for contemporary ceiling lighting that span a world of inspiration, from pieces like the daring and unique 2 Arm Mobile Light to updated takes on traditional options. No matter how far you’re wanting to take your modern ceiling lights, this collection is full of answers for every space and home. Elevate your room, studio, or workspace with a minimalist ceiling light from HORNE.`,
            thumbnail:
                "https://cdn.shopify.com/s/files/1/1087/6904/collections/ceiling-lights-279305_2000x.png?v=1678747938",
        },
    })

    console.log(collection_ceiling_lights)
    console.log(air_sideboard_low)
}

main()
    .catch((e: Error) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        // Disconnect Prisma Client
        await prisma.$disconnect()
    })
