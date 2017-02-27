import { IAuthenticatedRequest } from "../middleware/firebase-auth.middleware"
import { IRequestSchema } from "../middleware/schema-validation.middleware"
import * as Joi from "joi"

export interface ICreateUserRequest extends IAuthenticatedRequest {
  body: {
    name: string
  }
}

export interface IGetUserDetailsRequest extends IAuthenticatedRequest {
  params: {
    id?: string
  }
}

export const patchUserDetailSchema: IRequestSchema = {
  body: Joi.object().keys({
    key: Joi.string().required().valid(["name", "image"]),
    value: Joi.string()
  })
}

export interface IPatchUserDetailsRequest extends IAuthenticatedRequest {
  body: {
    key: "name" | "image"
    value?: string
  }
}

export interface IGetUserEventsRequest extends IAuthenticatedRequest {
  params: {
    id?: string
  }
}