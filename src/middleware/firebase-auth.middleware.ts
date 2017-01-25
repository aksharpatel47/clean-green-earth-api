import { firebaseAdmin } from "../firebase-admin"
import { Request, Response } from "express"
import { Auth } from "firebase-admin/lib/auth/auth"

export interface IFirebaseUser {
  uid: string
  email: string
  emailVerified: boolean
  name?: string
  photoURL?: string
  disabled: boolean
  providerData: IUserInfo[]
}

interface IUserInfo {
  uid: string
  email: string
  displayName?: string
  photoURL?: string
  providerId: string
}

export interface IAuthenticatedRequest extends Request {
  user: IFirebaseUser
}

export function firebaseAuthMiddleware(req: Request, res: Response, next: any) {
  const authorizationToken = req.get("Authorization")

  if (!authorizationToken) {
    return res.sendStatus(401)
  }

  const tokenComponents = authorizationToken.split(" ")

  if (tokenComponents.length !== 2 && tokenComponents[0] !== "Bearer") {
    return res.sendStatus(401)
  }

  const token = tokenComponents[1];

  (firebaseAdmin.auth() as Auth).verifyIdToken(token)
    .then((decodedToken: any) => {
      req["user"] = decodedToken
      next()
    })
    .catch((err: any) => {
      return res.status(401).send(err)
    })
}