import express from "express"

import supertest from "supertest"
import collections from "../collections"

const app = express()
app.use(express.json())
app.use("/api/collections", collections)

describe("Get User - GET /api/users/:id ", () => {
    it("should returns user data with status code 200 ", async () => {
        await supertest(app)
            .get("/api/users/13")
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty("firstName")
                expect(res.body).toHaveProperty("lastName")
                expect(res.body).toHaveProperty("email")
            })
    })

    it("should return status code 404 when invaild id", async () => {
        await supertest(app).get("/api/users/abc").expect(404)
    })

    it("should returns status code 404 when negative id", async () => {
        await supertest(app).get("/api/users/-1245").expect(404)
    })
})

describe("Create User - POST /api/users", () => {
    const userData = {
        firstName: "Hugo",
        lastName: "Lam",
        email: "email@domain.com",
        // socail: { facebook: "huolam", twitter: "hugoTwitter" },
    }
    it("should returns user data with status code 200 ", async () => {
        await supertest(app)
            .post("/api/users/")
            .send(userData)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty("id")
                expect(res.body).toHaveProperty("firstName", userData.firstName)
                expect(res.body).toHaveProperty("lastName", userData.lastName)
                expect(res.body).toHaveProperty("email", userData.email)
                // expect(res.body).toHaveProperty("social", userData.socail);
            })
    })
})
