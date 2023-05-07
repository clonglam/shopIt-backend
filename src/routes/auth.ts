import express from "express"
import passport from "passport"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"
import _ from "lodash"

const router = express.Router()
const prisma = new PrismaClient()

router.post(
    "/login",
    passport.authenticate("local"),
    async function (req, res, next) {
        res.send({ user: _.pick(req.user, "name", "email", "role") })
    }
)

router.post("/signup", function (req, res) {
    const data = _.pick(req.body, ["name", "email", "password"])

    console.log("data, ", data)

    bcrypt.hash(data.password, 10, function (err, hashedPassword) {
        prisma.user
            .create({
                data: {
                    ...data,
                    password: hashedPassword,
                },
            })
            .then(function (user) {
                req.login(user, function (err) {
                    if (err) throw err
                    res.send(user)
                })
            })
            .catch(function (err) {
                console.error(err)
                res.status(400).send("Error creating user")
            })
    })
})

router.post("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        res.redirect("/")
    })
    res.send("Logged out successfully")
})

export default router
