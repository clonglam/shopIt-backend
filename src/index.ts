import config from "config"
import helmet from "helmet"
import Debug from "debug"
import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import routers from "./startup/routes"
import session from "express-session"
import passport from "passport"
const debug = Debug("app:startup")
const app = express()

console.log(config.get("name"))
const port = Number(process.env.PORT) || 6000

app.use(helmet())
app.use(express.static("public"))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        cookie: {},
        saveUninitialized: false,
    })
)
import "./passport-config"

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// app.use(passport.authenticate("session"))

app.listen(port, () => {
    debug("Application started")
    console.log(`Server started at http://localhost:${port}`)
    routers(app, port)
})

export default app
