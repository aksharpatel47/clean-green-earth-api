import { userRegistrationSchema } from './../user/user.model';
import { Request, Response } from 'express';

/**
 * Creates a token for the authenticated users.
 * This token can then be used to access data.  
 */
function createSession(req: Request, res: Response) {

}

/**
 * Removes the token from the whitelist so that the
 * token cannot be used to access any more information.
 */
function deleteSession(req: Request, res: Response) {

}
