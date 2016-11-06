import { Request, Response } from 'express';
import {
  IUserRegistrationRequest,
  IUserDetailRequest,
  IUpdateUserDetailsRequest,
  IVerifyUserEmailRequest
} from "./user.model";

/**
 * Registers user in the system.
 * Once the user is registered, it sends the authentication token
 * as response upon successful registration.
 */
export function registerUser(req: IUserRegistrationRequest, res: Response) {

}

/**
 * Verifies the email of the User.
 * Once the user is registered, the system sends a code to the email
 * that was used when registering. When the user enters this code,
 * the email is verified.
 */
export function verifyEmail(req: IVerifyUserEmailRequest, res: Response) {

}

/**
 * Gets of a particular user.
 * The id of the user, whose information is to be sent, is taken
 * from the url.
 */
export function getUserDetail(req: IUserDetailRequest, res: Response) {

}

/**
 * Updates User details.
 * This route can be used to change the name or password
 * of the User.
 */
export function updateUserDetail(req: IUpdateUserDetailsRequest, res: Response) {
  
}