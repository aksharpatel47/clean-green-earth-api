import { IAuthenticatedRequest } from "../middleware/firebase-auth.middleware"

export interface ICreateEventRequest extends IAuthenticatedRequest {
  body: {
    title: string
    description: string
    latitude: string
    longitude: string
    address: string
    date: string
    duration: string
  }
}