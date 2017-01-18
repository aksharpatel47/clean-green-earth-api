import { Router } from 'express';
import * as userControllers from './users.controllers';
import { userImageUpload } from '../middleware/image-upload.middleware';
import firebaseAdmin = require('firebase-admin/lib/default-namespace');
import firebaseAuthMiddleware from '../middleware/firebase-auth.middleware';

const userRoutes = Router();

userRoutes
  .post('/', userImageUpload.single('user-image'), firebaseAuthMiddleware, userControllers.createUser)
  .put('/', userControllers.updateUserDetails)
  .patch('/', userImageUpload.single('user-image'), userControllers.patchUserDetails)
  .get('/', userControllers.getUserDetails)
  .get('/:id', userControllers.getUserDetails)
  .get('/:id/events', userControllers.getUserEvents)
  .get('/:id/attendance', userControllers.getEventsWithUserAttendance);

export default userRoutes;