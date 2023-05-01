import express from "express";

import supertest from "supertest";
import healthCheck from "../healthCheck";

const app = express();
app.use(express.json());
app.use("/healthcheck", healthCheck);

describe("Server Start", () => {
    it("should returns 200 and hello world", async () => {
        await supertest(app)
            .get("/healthcheck")
            .expect(200)
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.text).toEqual("hello world!");
            });
    });
});
