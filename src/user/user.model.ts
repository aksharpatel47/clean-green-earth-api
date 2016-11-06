import * as Joi from 'joi';
import { Request } from 'express';

export interface IUserRegistrationRequest extends Request {
  body: {
    email: string;
    password: string;
    retypedPassword: string;
  }
}

export const userRegistrationSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required()
});

export interface IUserDetailRequest extends Request {
  params: {
    id: string
  }
}