import { IAuthenticatedRequest } from "../middleware/firebase-auth.middleware"

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

export interface IPatchUserDetailsRequest extends IAuthenticatedRequest {
  body: {
    name?: string
  }
}

export interface IGetUserEventsRequest extends IAuthenticatedRequest {
  params: {
    id?: string
  }
}