import { Request, Response } from "express"

export async function loginHandler(req: Request, res: Response) {
    try {
        // const collection = await createCollection(req.body)
        return res.send("success")
    } catch (err) {
        return res.sendStatus(400)
    }
}
