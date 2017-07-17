import { firebaseAdmin } from "../firebase-admin"
import { NextFunction, Request, Response } from "express"
import { auth } from "firebase-admin"

export interface IAuthenticatedRequest extends Request {
  user: auth.UserRecord
}

export function firebaseAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const authorizationToken = req.get("Authorization")

  if (!authorizationToken) {
    return res.sendStatus(401)
  }

  const tokenComponents = authorizationToken.split(" ")

  if (tokenComponents.length !== 2 && tokenComponents[0] !== "Bearer") {
    return res.sendStatus(401)
  }

  const token = tokenComponents[1]

  firebaseAdmin.auth().verifyIdToken(token)
    .then((decodedToken: any) => {
      req["user"] = decodedToken
      next()
    })
    .catch((err: any) => {
      return res.status(401).send(err)
    })
}