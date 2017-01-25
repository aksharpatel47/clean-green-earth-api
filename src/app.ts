import * as express from "express"
import * as morgan from "morgan"
import * as bodyParser from "body-parser"
import * as path from "path"
import { firebaseAuthMiddleware } from "./middleware/firebase-auth.middleware"

/**
 * Import Routes
 */
import { eventRoutes } from "./events/event.routes"
import { userRoutes } from "./users/user.routes"

/**
 * Initialize Express App
 */
export const app = express()

/**
 * Import Middlewares
 */
app.use(morgan("dev"))
app.use("/static/images", express.static(path.resolve(__dirname, "../images")))
app.use(bodyParser.json())
app.use(firebaseAuthMiddleware)

/**
 * Register Routes
 */
app.use("/users", userRoutes)
app.use("/events", eventRoutes)
