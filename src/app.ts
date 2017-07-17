import * as bodyParser from "body-parser"
import { InversifyExpressServer } from "inversify-express-utils"
import * as morgan from "morgan"
import { container } from "./container"
import { firebaseAuthMiddleware } from "./middleware/firebase-auth.middleware"

const server = new InversifyExpressServer(container, undefined, { rootPath: "/v1" })

/**
 * Import Middlewares
 */
server.setConfig((app) => {
  // TODO: setup appropriate logging
  app.use(morgan("dev"))
  app.use(firebaseAuthMiddleware)
  app.use(bodyParser.json())
})

export const app = server.build()