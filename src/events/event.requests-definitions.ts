import { IAuthenticatedRequest } from "../middleware/firebase-auth.middleware"
import { IAddEventDetails } from "./event"

export interface ICreateEventRequest extends IAuthenticatedRequest {
  body: IAddEventDetails
}