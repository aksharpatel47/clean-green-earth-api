import * as Joi from "joi"
import { IAuthenticatedRequest } from "../middleware/firebase-auth.middleware"
import { IRequestSchema } from "../middleware/schema-validation.middleware"

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

export interface ISearchEventRequest extends IAuthenticatedRequest {
  query: {
    latitude: string
    longitude: string
  }
}

export const searchEventsSchema: IRequestSchema = {
  query: Joi.object().keys({
    latitude: Joi.string().min(1).required(),
    longitude: Joi.string().min(1).required()
  })
}