import { databaseResponseTimeHistogram } from "../utils/metrics"
import { PrismaClient, User } from "@prisma/client"
import session from "express-session"
import passport from "passport"
import { Strategy } from "passport-local"
import bcrypt from "bcryptjs"
const prisma = new PrismaClient()

export async function authUser(email: string, password: string) {
    const metricsLabels = {
        operation: "Auth User",
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        // passport.use(
        //     new Strategy(function (email, password, done) {
        //         prisma.user
        //             .findUnique({ where: { email: email } })
        //             .then(function (user) {
        //                 if (!user)
        //                     return done(null, false, {
        //                         message: "Incorrect username or password.",
        //                     })

        //                 bcrypt.compare(
        //                     password,
        //                     user.password,
        //                     function (err, res) {
        //                         if (res) {
        //                             return done(null, user)
        //                         } else {
        //                             return done(null, false, {
        //                                 message:
        //                                     "Incorrect username or password.",
        //                             })
        //                         }
        //                     }
        //                 )
        //             })
        //             .catch(function (err) {
        //                 return done(err)
        //             })
        //     })
        // )

        // passport.serializeUser(function (user: any, done) {
        //     done(null, user.id)
        // })

        // passport.deserializeUser(function (id: number, done) {
        //     prisma.user
        //         .findUnique({ where: { id: id } })
        //         .then(function (user) {
        //             done(null, user)
        //         })
        //         .catch(function (err) {
        //             done(err)
        //         })
        // })

        // const user = await prisma.user.findFirst({
        //     where: {
        //         email: input.email,
        //     },
        // })

        // if (!user) throw new Error("Invalid email or password.")

        // const result = await prisma.user.create({
        //     data: input,
        // })

        timer({ ...metricsLabels, success: "true" })
        // return result
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}
