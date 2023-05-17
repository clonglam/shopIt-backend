import express from "express"
import { Request, Response } from "express"

// This is your test secret API key.
const stripe = require("stripe")(
    "sk_test_51N6284JXn7QZJj3N55MtE0BRjHiIEPA7HEvg6swplYZumbECVXiR1HFXYoucaxaOepyKkcUajcJCMEmwsmTQKk8s003ofsnOWZ"
)
// const express = require("express")
// const app = express()
// app.use(express.static("public"))

const YOUR_DOMAIN = "http://localhost:5173"

const router = express.Router()

router.post("/create-checkout-session", async (req: Request, res: Response) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "cad",
                    product_data: {
                        name: "Bell Light",
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${YOUR_DOMAIN}/checkoutsucess?success=true`,
        cancel_url: `${YOUR_DOMAIN}/cart?canceled=true`,
    })

    res.redirect(303, session.url)
})

const calculateOrderAmount = (items: any) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400
}

// router.post("/create-payment-intent", async (req, res) => {
//     const { items } = req.body
//     console.log("items", items)
//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: calculateOrderAmount(items),
//         currency: "cad",
//         automatic_payment_methods: {
//             enabled: true,
//         },
//     })

//     res.send({
//         clientSecret: paymentIntent.client_secret,
//     })
// })

export default router
