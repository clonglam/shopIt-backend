import { createUserSchema } from "./../schema/user"
import express from "express"

import validateResource from "../middleware/validateResource"
import { createUserHandler } from "../controller/user.controller"

const router = express.Router()

router.post("/", validateResource(createUserSchema), createUserHandler)

export default router
