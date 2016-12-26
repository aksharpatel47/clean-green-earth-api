import firebaseAdmin from '../firebase-admin';
import { Request, Response } from 'express';

export default function firebaseAuthMiddleware(req: Request, res: Response, next: any): any {
  let authorizationToken = req.get('Authorization');

  if (!authorizationToken) {
    return res.sendStatus(401);
  }

  let tokenComponents = authorizationToken.split(' ');

  if (tokenComponents.length != 2) {
    return res.sendStatus(401);
  }

  let token = tokenComponents[1];

  (<any>firebaseAdmin.auth()).verifyIdToken(token)
    .then((decodedToken: any) => {
      req.body.uid = decodedToken.uid;
      next()
    })
    .catch((err: any) => {
      return res.status(401).send(err);
    });
}