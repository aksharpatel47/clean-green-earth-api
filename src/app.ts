import * as bodyParser from "body-parser"
import * as express from "express"
import { InversifyExpressServer } from "inversify-express-utils"
import * as morgan from "morgan"
import * as path from "path"
import { container } from "./container"
import { firebaseAuthMiddleware } from "./middleware/firebase-auth.middleware"
import { NotFoundError } from "./utilities/errors/not-found.error"
import { NotImplementedError } from "./utilities/errors/not-implemented.error"

const server = new InversifyExpressServer(container)

server.setConfig((app) => {
  app.use(morgan("dev"))
  app.use("/static/images", express.static(path.resolve(__dirname, "../images")))
  app.use(bodyParser.json())
  app.use(firebaseAuthMiddleware)
})

server.setErrorConfig((app) => {
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    let statusCode = 500
    let message = "Error while executing the API"
    let path: string | undefined
    let description: string | undefined

    switch (err.name) {
      case "error":
        message = "Error while executing SQL."
        description = err.message
        break
      case NotFoundError.name:
        statusCode = 404
        message = "Error while getting the data."
        path = "identifier"
        description = err.message
        break
      case NotImplementedError.name:
        message = err.message
        break
    }

    const error: { message: string, details?: [{ path: string, description: string }] } = { message }
    if (path && description) {
      error.details = [{ path, description }]
    }

    res.status(statusCode).json({ error })
  })
})

export const app = server.build()