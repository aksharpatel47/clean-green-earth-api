import { IAuthenticatedRequest } from "../middleware/firebase-auth.middleware"

export interface ICreateUserRequest extends IAuthenticatedRequest {
  body: {
    name: string
  }
}