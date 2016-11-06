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

export interface IVerifyUserEmailRequest extends Request {
  body: {
    code: string;
  }

  params: {
    email: string;
  }
}

export interface IUserDetailRequest extends Request {
  params: {
    id: string
  }
}

export interface IUpdateUserDetailsRequest extends Request {
  body: {
    name?: string;
    password?: {
      currentPassword: string;
      newPassword: string;
      retypedNewPassword: string;
    }
  }
}